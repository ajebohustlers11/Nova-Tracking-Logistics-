// script.updated.map.js
// Enhanced map + "View shipment on map" button inside Shipment Details.
// Opens Google Maps for shipment/event locations and keeps Leaflet behavior.

(function () {
  'use strict';

  const el = sel => document.querySelector(sel);
  const steps = ["Accepted", "Order Processing", "Shipment Pending", "Custom cleared", "Estimated Delivery"];

  // ===== loader (hide after page load)
  window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = el("#loader");
      if (loader) loader.style.display = "none";
    }, 1800);
  });

  // inject styles for timeline highlight & view button (idempotent)
  (function injectStyles(){
    if (document.getElementById('novatrack-map-styles')) return;
    const s = document.createElement('style');
    s.id = 'novatrack-map-styles';
    s.textContent = `
      .nav-timeline .ev-row.active { background:#eef6ff; transform: translateZ(0); }
      .novamarker-highlight { transform-origin:center center; transition: transform 220ms ease, box-shadow 220ms ease; box-shadow:0 6px 18px rgba(37,99,235,0.18); }
      .view-on-map-btn { display:inline-block; margin-left:8px; padding:6px 10px; border-radius:8px; border:1px solid rgba(2,6,23,0.06); background:#fff; cursor:pointer; font-weight:600; }
      .view-on-map-btn:active { transform:translateY(1px); }
      .statusbar { margin-bottom:10px; }
      .step { display:inline-block; text-align:center; width:12%; vertical-align:middle; }
      .dot { width:12px; height:12px; border-radius:50%; display:block; margin:auto; background:#ccc; }
      .dot.active { background:#28a745; }

      /* small per-event map button */
      .ev-map-btn { margin-left:8px; padding:6px 8px; border-radius:6px; border:1px solid rgba(2,6,23,0.06); background:#fff; cursor:pointer; font-size:12px; }
      .ev-map-btn:active { transform:translateY(1px); }
      .ev-row { position:relative; display:flex; gap:10px; align-items:flex-start; padding:8px 10px; border-radius:6px; cursor:pointer; }
      .ev-row:hover { background: #fbfdff; }
      .ev-controls { margin-left:auto; display:flex; gap:6px; align-items:center; }
      .ev-time { min-width:160px; color:#6b7280; font-size:13px; }
      .ev-desc { flex:1; font-size:14px; color:#111827; }
      .ev-loc { color:#6b7280; font-size:13px; margin-top:4px; }
    `;
    document.head.appendChild(s);
  })();

  // small helpers
  function escapeHtml(str){
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  // robust coords normalizer: accepts [lat,lng] or [lng,lat] or strings; returns [lat,lng] or null
  function resolveLatLng(coords){
    if (!Array.isArray(coords) || coords.length < 2) return null;
    const a = Number(coords[0]);
    const b = Number(coords[1]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
    // heuristic: lat range -90..90, lng -180..180
    if (Math.abs(a) <= 90 && Math.abs(b) <= 180) return [a, b]; // [lat, lng]
    if (Math.abs(b) <= 90 && Math.abs(a) <= 180) return [b, a]; // flipped -> [lat, lng]
    // fallback accept as [a,b]
    return [a,b];
  }

  // status -> step mapping (kept from your original)
  function mapStatusToStepIndex(status) {
    if (!status) return 0;
    const s = String(status).toLowerCase().trim();
    if (s.includes("accepted")) return steps.indexOf("Accepted");
    if (s.includes("order")) return steps.indexOf("Order Processing");
    if (s.includes("custom") || s.includes("cleared")) return steps.indexOf("Custom cleared");
    if (s.includes("estimate") || s.includes("estimated")) return steps.indexOf("Estimated Delivery");
    if (s.includes("pending")) return steps.indexOf("Shipment Pending");
    const exact = steps.findIndex(st => st.toLowerCase() === s);
    return exact !== -1 ? exact : 0;
  }

  // --- missing helper: buildStepsHTML ---
  function buildStepsHTML(lastStepIndex) {
    return steps.map((st, i) => {
      return `<div class="step"><div class="dot ${i <= lastStepIndex ? 'active' : ''}"></div><div style="font-size:9px;margin-top:6px;color:#222">${escapeHtml(st)}</div></div>`;
    }).join('<span style="display:inline-block;width:6px;"></span>');
  }

  // --- missing helper: formatValue ---
  function formatValue(key, value) {
    if (value === null || value === undefined || value === '') return 'Not provided';
    const k = String(key || '').toLowerCase();

    if (k.includes('weight')) {
      const numeric = parseFloat(String(value).replace(/[^\d.-]/g, ''));
      return !isNaN(numeric) ? `${numeric} kg` : String(value);
    }
    if (k.includes('quantity') || k.includes('packages')) {
      const n = parseInt(value, 10);
      return isNaN(n) ? String(value) : String(n);
    }
    if (k.includes('freight') || k.includes('total') || k.includes('price') || k.includes('amount')) {
      const s = String(value);
      if (s.match(/[$¢£¥€]/)) return s;
      const numeric = parseFloat(s.replace(/[^\d.-]/g, ''));
      return isNaN(numeric) ? s : `$${numeric}`;
    }
    if (k.includes('date') || k.includes('time') || k.includes('eta')) {
      const d = new Date(value);
      if (!isNaN(d)) return d.toLocaleString();
      return String(value);
    }
    return String(value);
  }

  // --- missing helper: renderSummary ---
  function renderSummary(s) {
    const container = el("#trackingResult") || el("#homeSummary");
    if (!container) return;
    const currentStatus = (s && s.shipment && s.shipment.status) || (Array.isArray(s.statusTimeline) && s.statusTimeline.length ? s.statusTimeline[s.statusTimeline.length-1] : '') || '';
    const lastStepIndex = Math.max(0, mapStatusToStepIndex(currentStatus));
    const stepsHTML = buildStepsHTML(lastStepIndex);
    const prettyStatus = currentStatus ? String(currentStatus).charAt(0).toUpperCase() + String(currentStatus).slice(1) : 'Unknown';
    const shipper = s && s.shipper && s.shipper.name ? escapeHtml(s.shipper.name) : '';
    const receiver = s && s.receiver && s.receiver.name ? escapeHtml(s.receiver.name) : '';
    container.innerHTML = `
      <div class="statusbar">${stepsHTML}</div>
      <p class="muted">Tracking <span class="code text-primary">${escapeHtml(s.trackingCode || s.tracking || '')}</span> for <strong>${shipper} → ${receiver}</strong></p>
      <p><strong>Current status:</strong> ${escapeHtml(prettyStatus)}</p>
    `;
  }

  // ---------------------------------------------------------------------------
  // Map support
  // ---------------------------------------------------------------------------
  let _mapHandle = null;
  let _mapMarkers = [];
  let _mapPolyline = null;
  let _mapMarkerByUid = new Map();

  function detectMap() {
    if (_mapHandle) return _mapHandle;
    if (typeof window === 'undefined') return null;

    if (window._map) _mapHandle = window._map;
    else if (window.NovaTrack && window.NovaTrack._map) _mapHandle = window.NovaTrack._map;
    else if (window.NovaTrack && window.NovaTrack.map) _mapHandle = window.NovaTrack.map;
    else if (window.map) _mapHandle = window.map;
    else if (window.NovaMap) _mapHandle = window.NovaMap;

    if (!_mapHandle && typeof L !== 'undefined') {
      const mapEl = el('#map');
      if (mapEl) {
        try {
          _mapHandle = L.map(mapEl, { center: [39.8283, -98.5795], zoom: 4, minZoom: 3, maxZoom: 16, scrollWheelZoom: false });
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(_mapHandle);
          window._map = _mapHandle;
        } catch (err) {
          console.warn('Leaflet init failed:', err);
          _mapHandle = null;
        }
      }
    }

    return _mapHandle;
  }

  function clearMapOverlays() {
    const map = detectMap();
    if (!map) return;
    try {
      _mapMarkers.forEach(m => { if (m && map.removeLayer) map.removeLayer(m); });
      _mapMarkers = [];
      _mapMarkerByUid.clear();
      if (_mapPolyline && map.removeLayer) { map.removeLayer(_mapPolyline); _mapPolyline = null; }
    } catch (e) { console.warn('clearMapOverlays error', e); }
  }

  function ensureEventUid(ev) {
    if (!ev) return null;
    if (ev.__novauid) return ev.__novauid;
    const base = `${ev.time||''}|${ev.status||''}|${ev.location||''}|${Math.random().toString(36).slice(2,8)}`;
    try {
      ev.__novauid = 'ev_' + btoa(unescape(encodeURIComponent(base))).replace(/[^a-zA-Z0-9]/g,'').slice(0,12);
    } catch (_) {
      ev.__novauid = 'ev_' + Math.random().toString(36).slice(2,10);
    }
    return ev.__novauid;
  }

  function highlightMarker(marker, duration = 900) {
    try {
      if (!marker) return;
      if (marker.setZIndexOffset) marker.setZIndexOffset(1000);
      const elIcon = marker._icon;
      if (elIcon) {
        elIcon.classList.add('novamarker-highlight');
        elIcon.style.transform = 'scale(1.14)';
        setTimeout(() => {
          if (elIcon) elIcon.style.transform = '';
          if (elIcon) elIcon.classList.remove('novamarker-highlight');
          if (marker.setZIndexOffset) marker.setZIndexOffset(0);
        }, duration);
      }
    } catch (e) {}
  }

  function plotShipmentOnMap(shipment) {
    const map = detectMap();
    if (!map || typeof L === 'undefined') return;

    const events = Array.isArray(shipment.events) ? shipment.events.slice() : [];
    const pts = [];

    events.forEach((ev, idx) => {
      const latlng = resolveLatLng(ev && ev.coords ? ev.coords : null);
      if (latlng) {
        const uid = ensureEventUid(ev);
        const time = ev && ev.time ? new Date(ev.time).getTime() : 0;
        pts.push({ uid, lat: latlng[0], lng: latlng[1], ev, time, origIndex: idx });
      }
    });

    if (!pts.length) {
      clearMapOverlays();
      return;
    }

    clearMapOverlays();

    pts.sort((a,b) => (a.time||0) - (b.time||0));

    pts.forEach(p => {
      try {
        const marker = L.marker([p.lat, p.lng]).addTo(map);
        const stamp = p.ev && p.ev.time ? escapeHtml(new Date(p.ev.time).toLocaleString()) : '';
        const popupHtml = `<div style="min-width:160px"><strong>${escapeHtml(p.ev.status||'')}</strong>
            <div style="font-size:12px;margin-top:6px">${escapeHtml(p.ev.location||'')}</div>
            <div style="font-size:12px;color:#666;margin-top:6px">${stamp}</div></div>`;
        marker.bindPopup(popupHtml);
        marker.__novauid = p.uid;
        _mapMarkers.push(marker);
        _mapMarkerByUid.set(p.uid, marker);
      } catch (err) {
        console.warn('marker create error', err);
      }
    });

    try {
      const latlngs = pts.map(p => [p.lat, p.lng]);
      _mapPolyline = L.polyline(latlngs, { color: '#2563eb', weight: 3, opacity: 0.9 }).addTo(map);
      _mapMarkers.forEach(m => { try{ if (m.bringToFront) m.bringToFront(); }catch(_){} });
    } catch (e) { console.warn('polyline error', e); }

    try {
      const group = L.featureGroup(_mapMarkers);
      const bounds = group.getBounds();
      if (bounds && bounds.isValid && bounds.isValid()) {
        map.fitBounds(bounds.pad ? bounds.pad(0.18) : bounds, { padding: [40,40], maxZoom: 12 });
      } else {
        const last = pts[pts.length-1];
        map.setView([last.lat, last.lng], Math.max(6, Math.min(12, map.getZoom()||8)));
      }
      const latestMarker = _mapMarkers[_mapMarkers.length-1];
      if (latestMarker && latestMarker.openPopup) {
        setTimeout(()=>{ latestMarker.openPopup(); highlightMarker(latestMarker, 1200); }, 220);
      }
    } catch (e) { console.warn('fitBounds/center error', e); }
  }

  // Expose functions
  window.NovaTrack = window.NovaTrack || {};
  window.NovaTrack.plotShipmentOnMap = plotShipmentOnMap;
  window.NovaTrack.clearMapOverlays = clearMapOverlays;

  // Build clickable timeline inside #trackBody; clicking centers map + opens popup
  function renderEventTimeline(shipment) {
    const body = el('#trackBody');
    if (!body) return;
    const existing = body.querySelector('.nav-timeline');
    if (existing) existing.remove();

    const events = Array.isArray(shipment.events) ? shipment.events.slice() : [];
    if (!events.length) return;

    try {
      events.sort((a,b) => {
        const ta = a && a.time ? new Date(a.time).getTime() : 0;
        const tb = b && b.time ? new Date(b.time).getTime() : 0;
        return ta - tb;
      });
    } catch(e){}

    const container = document.createElement('div');
    container.className = 'nav-timeline';

    events.forEach((ev, idx) => {
      const row = document.createElement('div');
      row.className = 'ev-row';
      const timeText = ev && ev.time ? escapeHtml(new Date(ev.time).toLocaleString()) : 'Unknown time';
      const statusText = ev && ev.status ? escapeHtml(ev.status) : 'Status';
      const locText = ev && ev.location ? escapeHtml(ev.location) : '';
      const uid = ensureEventUid(ev);
      row.dataset.evUid = uid;
      row.dataset.evIndex = idx;

      // build inner content + controls container
      const descHtml = `<div class="ev-time">${timeText}</div>
                        <div class="ev-desc"><strong>${statusText}</strong><div class="ev-loc">${locText}</div></div>`;

      const controls = document.createElement('div');
      controls.className = 'ev-controls';

      // Add the "Open in Google Maps" button if coords exist
      const latlng = resolveLatLng(ev && ev.coords ? ev.coords : null);
      if (latlng) {
        const mapBtn = document.createElement('button');
        mapBtn.className = 'ev-map-btn';
        mapBtn.type = 'button';
        mapBtn.title = 'Open this event in Google Maps';
        mapBtn.textContent = 'Open in Google Maps';
        mapBtn.addEventListener('click', function (evt) {
          evt.stopPropagation(); // prevent row click
          try {
            const [lat, lng] = latlng;
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng)}`;
            window.open(url, '_blank');
          } catch (err) { console.warn('open google maps error', err); }
        });
        controls.appendChild(mapBtn);
      }

      row.innerHTML = descHtml;
      row.appendChild(controls);

      row.addEventListener('click', function () {
        try {
          container.querySelectorAll('.ev-row.active').forEach(r => r.classList.remove('active'));
          this.classList.add('active');

          const chosen = events[idx];
          if (!chosen) return;
          const map = detectMap();
          const entryLatLng = resolveLatLng(chosen.coords || []);
          if (!entryLatLng) return;

          const [lat,lng] = entryLatLng;
          if (map && typeof L !== 'undefined') {
            try { map.setView([lat, lng], Math.max(8, Math.min(14, map.getZoom()||10)), { animate: true }); }
            catch(e){ map.setView([lat,lng], 10); }

            const marker = _mapMarkerByUid.get(uid);
            if (marker) {
              if (marker.openPopup) marker.openPopup();
              highlightMarker(marker, 1000);
              return;
            }

            L.popup({ maxWidth: 320 })
              .setLatLng([lat, lng])
              .setContent(`<div style="min-width:180px"><strong>${escapeHtml(chosen.status||'')}</strong><div style="font-size:12px;margin-top:6px">${escapeHtml(chosen.location||'')}</div></div>`)
              .openOn(map);
          } else {
            // If Leaflet map is not available, open Google Maps for the event as fallback
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng)}`;
            window.open(url, '_blank');
          }
        } catch (err) { console.warn('timeline click error', err); }
      });

      container.appendChild(row);
    });

    body.appendChild(container);
  }

  // Render detail panel then timeline + map overlays
  function renderDetailPanelAndMap(s, singleColumn = false) {
    renderDetailPanelCore(s, singleColumn);
    try {
      renderEventTimeline(s);
      // Plot only when user clicks "View shipment on map"
    } catch (e) { console.warn('renderDetailPanelAndMap error', e); }
  }

  // Original renderDetailPanelCore with added "View shipment on map" button in Shipment Details header
  function renderDetailPanelCore(s, singleColumn = false) {
    (function ensureTableStyles() {
      if (document.getElementById('tracking-table-styles')) return;
      const style = document.createElement('style');
      style.id = 'tracking-table-styles';
      style.textContent = `
        .tracking-table-wrapper { box-shadow: 0 6px 18px rgba(15,23,42,0.06); border-radius:10px; overflow:hidden; }
        table.tracking-table { width:100%; border-collapse:separate; border-spacing:0; font-family:inherit; font-size:14px; background:#fff; }
        table.tracking-table th.section-header { text-align:left; background:linear-gradient(90deg,#f8fafc,#f3f4f6); padding:12px 14px; font-size:13px; color:#111827; border-bottom:1px solid #e6edf3; }
        table.tracking-table td.label { width:34%; padding:12px 14px; font-weight:600; vertical-align:top; color:#0f172a; background:#fbfdff; border-bottom:1px solid #f1f5f9; }
        table.tracking-table td.value { width:66%; padding:12px 14px; vertical-align:top; color:#111827; border-bottom:1px solid #f1f5f9; }
        table.tracking-table tr:nth-child(even) td.value { background: #ffffff; }
        table.tracking-table tr:hover td { background: #fcfdfe; }
        .tracking-table .muted { color:#6b7280; }
        @media (max-width:720px) {
          table.tracking-table td.label { display:block; width:100%; padding:10px 12px; background:#f8fafc; border-bottom:1px solid #e6edf3; }
          table.tracking-table td.value { display:block; width:100%; padding:10px 12px; border-bottom:1px solid #eef2f7; }
          table.tracking-table th.section-header { padding:10px 12px; }
          .tracking-table-wrapper { border-radius:6px; }
        }
        .tracking-table td.value { word-break:break-word; }
      `;
      document.head.appendChild(style);
    })();

    const panel = document.querySelector('#track-panel');
    const body = document.querySelector('#trackBody');
    if (!panel || !body) return;

    panel.style.display = 'block';

    const pickupDisplay = (s && s.shipment && s.shipment.pickupDate && s.shipment.pickupTime)
      ? `${escapeHtml(s.shipment.pickupDate)} - ${escapeHtml(s.shipment.pickupTime)}`
      : escapeHtml((s && s.shipment && s.shipment.pickup) || 'N/A');

    const sections = [
      ['Information ID', [
        ['Code', s?.trackingCode || s?.tracking || ''],
        ['Estimated Delivery', s?.estimatedDelivery || ''],
        ['Customs', s?.customs || '']
      ]],
      ['Shipper Information', [
        ['Name', s?.shipper?.name],
        ['Phone', s?.shipper?.phone || ''],
        ['Address', s?.shipper?.address || ''],
        ['Email', s?.shipper?.email || '']
      ]],
      ['Receiver Information', [
        ['Name', s?.receiver?.name],
        ['Phone', s?.receiver?.phone || 'Not provided'],
        ['Address', s?.receiver?.address || ''],
        ['Email', s?.receiver?.email || 'Not provided']
      ]],
      ['Shipment Details', [
        ['Weight', s?.shipment?.weight],
        ['Courier', s?.shipment?.courier],
        ['Packages', s?.shipment?.packages],
        ['Mode', s?.shipment?.mode],
        ['Product', s?.shipment?.product],
        ['Quantity', s?.shipment?.quantity],
        ['Payment Mode', s?.shipment?.paymentMode],
        ['Total Freight', s?.shipment?.totalFreight],
        ['Carrier', s?.shipment?.carrier],
        ['Carrier Ref', s?.shipment?.carrierRef],
        ['Departure Time', s?.shipment?.departureTime],
        ['Origin', s?.shipment?.origin],
        ['Destination', s?.shipment?.destination],
        ['Pickup Date & Time', pickupDisplay],
        ['Status', s?.shipment?.status],
        ['Comments', s?.shipment?.comments],
        ['Agent Name', s?.shipment?.agentName],
        ['Shipment Type', s?.shipment?.shipmentType]
      ]]
    ];

    let html = `<div class="tracking-table-wrapper"><table class="tracking-table" aria-describedby="trackBodyDesc">`;
    sections.forEach(([title, rows]) => {
      if (title === 'Shipment Details') {
        html += `<tr><th class="section-header" colspan="2">${escapeHtml(title)} <button class="view-on-map-btn" type="button" data-action="view-all">View shipment on map</button></th></tr>`;
      } else {
        html += `<tr><th class="section-header" colspan="2">${escapeHtml(title)}</th></tr>`;
      }

      rows.forEach(([label, rawVal]) => {
        const formatted = formatValue(label, rawVal);
        if (singleColumn) {
          html += `<tr><td class="label" colspan="2">${escapeHtml(label)}</td></tr>`;
          html += `<tr><td class="value" colspan="2">${escapeHtml(formatted)}</td></tr>`;
        } else {
          html += `<tr>
            <td class="label" data-label="${escapeHtml(label)}">${escapeHtml(label)}</td>
            <td class="value" data-label="${escapeHtml(label)}">${escapeHtml(formatted)}</td>
          </tr>`;
        }
      });
    });
    html += `</table></div>`;

    body.innerHTML = html;

    // Attach click handler for the "View shipment on map" button
    const viewBtn = body.querySelector('.view-on-map-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', function () {
        try {
          // Find most recent event (chronological) that has coords
          const events = Array.isArray(s.events) ? s.events.slice() : [];
          if (!events.length) {
            alert('No event locations available for this shipment.');
            return;
          }
          // sort chronologically (oldest->newest) then take last that has coords
          try { events.sort((a,b) => (new Date(a.time||0).getTime()) - (new Date(b.time||0).getTime())); } catch(_) {}
          let chosen = null;
          for (let i = events.length - 1; i >= 0; i--) {
            const ev = events[i];
            const latlng = resolveLatLng(ev && ev.coords ? ev.coords : null);
            if (latlng) { chosen = { ev, latlng }; break; }
          }
          if (!chosen) {
            alert('No geolocation coordinates found for this shipment.');
            return;
          }

          const [lat, lng] = chosen.latlng;
          // open Google Maps centered on this lat,lng in a new tab
          const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng)}`;
          window.open(url, '_blank');

          // optionally keep Leaflet behavior: plot on local map and scroll to it
          try {
            const map = detectMap();
            if (map && typeof plotShipmentOnMap === 'function') {
              plotShipmentOnMap(s);
            }
            const mapEl = el('#map');
            if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } catch (err) { /* ignore */ }

        } catch (err) {
          console.warn('View on map click error', err);
        }
      });
    }
  }

  // Clear displays and hide panel
  function clearDisplay(message) {
    const trackingResultEl = el("#trackingResult");
    if (trackingResultEl) trackingResultEl.innerHTML = message || "Enter a tracking code above to view details.";
    const bodyEl = el("#trackBody");
    if (bodyEl) bodyEl.innerHTML = "";
    const panelEl = el("#track-panel");
    if (panelEl) panelEl.style.display = "none";
    try { clearMapOverlays(); } catch (e) {}
  }

  // Helper to resolve deliveries array safely (supports both global names)
  function getDeliveriesSource() {
    if (typeof deliveries !== "undefined" && Array.isArray(deliveries)) return deliveries;
    if (typeof window !== "undefined" && Array.isArray(window.DELIVERIES)) return window.DELIVERIES;
    if (typeof window !== "undefined" && Array.isArray(window.deliveries)) return window.deliveries;
    return null;
  }

  // Main lookup
  function performTrack(code) {
    console.log("[performTrack] lookup for:", code);
    clearDisplay();

    if (!code) {
      const trackingResultEl = el("#trackingResult");
      if (trackingResultEl) {
        trackingResultEl.innerHTML = `<p style="color:var(--danger, #c00)">Please enter a tracking code.</p>`;
      } else {
        alert("Please enter a tracking code!");
      }
      return;
    }

    const deliveriesArray = getDeliveriesSource();
    if (!deliveriesArray) {
      console.error("[performTrack] deliveries data missing — check that deliveries.js loaded BEFORE this script");
      const trackingResultEl = el("#trackingResult");
      if (trackingResultEl) {
        trackingResultEl.innerHTML = `<p style="color:var(--danger, #c00)">Internal error: deliveries data missing. See console.</p>`;
      } else {
        alert("Internal error: deliveries data missing. See console for details.");
      }
      return;
    }

    const normalizedCode = String(code || '').toLowerCase().trim();
    const shipment = deliveriesArray.find(s => String(s.trackingCode || s.tracking || '').toLowerCase().trim() === normalizedCode);

    if (!shipment) {
      clearDisplay(`<p style="color:red">Tracking code "${escapeHtml(code)}" not found.</p>`);
      return;
    }

    // render summary + details + timeline (map NOT auto-plotted unless user clicks the button)
    renderSummary(shipment);
    renderDetailPanelAndMap(shipment);
  }

  // Debounce helper
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }

  // Wire up inputs + button + url param
  document.addEventListener("DOMContentLoaded", () => {
    const btn = el("#btnQuickTrack");
    const input = el("#trackingCode");

    if (btn) {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        performTrack((input && input.value) ? input.value.trim() : '');
      });
    } else console.warn("#btnQuickTrack not found in DOM");

    if (input) {
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          debounce(() => performTrack(input.value.trim()), 120)();
        }
      });
    } else console.warn("#trackingCode input not found in DOM");

    // support ?track=CODE
    const trackParam = new URLSearchParams(window.location.search).get("track");
    if (trackParam) {
      if (input) input.value = trackParam;
      performTrack(trackParam);
    }
  });

  // expose for debugging if needed
  window.NovaTrack = window.NovaTrack || {};
  window.NovaTrack.plotShipmentOnMap = plotShipmentOnMap;
  window.NovaTrack.clearMapOverlays = clearMapOverlays;

})();

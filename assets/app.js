const state = {
  token: localStorage.getItem('token') || null,
  players: [],
  fixtures: [],
  updates: [],
  lineup: { formation: '4-3-3', slots: [] },
  useMockData: true // Set to false when backend is ready
};

// Mock data
const mockPlayers = [
  // Goalkeeper
  { _id: 'p1', name: 'Placeholder GK', number: 1, position: 'GK', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  
  // Defenders
  { _id: 'p2', name: 'Placeholder DF 1', number: 2, position: 'DF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p3', name: 'Placeholder DF 2', number: 3, position: 'DF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p4', name: 'Placeholder DF 3', number: 4, position: 'DF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p5', name: 'Placeholder DF 4', number: 5, position: 'DF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p6', name: 'Placeholder DF 5', number: 6, position: 'DF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },

  // Midfielders
  { _id: 'p7', name: 'Placeholder MF 1', number: 7, position: 'MF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p8', name: 'Placeholder MF 2', number: 8, position: 'MF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p9', name: 'Placeholder MF 3', number: 9, position: 'MF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p10', name: 'Placeholder MF 4', number: 10, position: 'MF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p11', name: 'Placeholder MF 5', number: 11, position: 'MF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p12', name: 'Placeholder MF 6', number: 12, position: 'MF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },

  // Forwards
  { _id: 'p13', name: 'Placeholder FW 1', number: 13, position: 'FW', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p14', name: 'Placeholder FW 2', number: 14, position: 'FW', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p15', name: 'Placeholder FW 3', number: 15, position: 'FW', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p16', name: 'Placeholder FW 4', number: 16, position: 'FW', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },

  // Reserve Players
  { _id: 'p17', name: 'Placeholder Reserve 1', number: 17, position: 'GK', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p18', name: 'Placeholder Reserve 2', number: 18, position: 'DF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p19', name: 'Placeholder Reserve 3', number: 19, position: 'MF', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },
  { _id: 'p20', name: 'Placeholder Reserve 4', number: 20, position: 'FW', photoUrl: '', isCoach: false, stats: { goals: 0, assists: 0, appearances: 0, yellowCards: 0, redCards: 0 } },

  // Coach
  { _id: 'coach1', name: 'Placeholder Coach', number: 99, position: 'Coach', photoUrl: '', isCoach: true, stats: {} }
];

const mockFixtures = [
  { _id: 'f1', opponent: 'Rivals FC', home: true, date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'upcoming', venue: 'Home Stadium' },
  { _id: 'f2', opponent: 'United FC', home: false, date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), status: 'upcoming', venue: 'Away Ground' },
  { _id: 'f3', opponent: 'City FC', home: true, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'completed', score: '2-1', venue: 'Home Stadium' },
  { _id: 'f4', opponent: 'Stars FC', home: false, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), status: 'completed', score: '1-3', venue: 'Away Ground' }
];

const mockUpdates = [
  { _id: 'u1', title: 'Match Win Celebration', content: 'Great victory against City FC! The team showed excellent teamwork and determination.', publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800' },
  { _id: 'u2', title: 'Training Session Update', content: 'Intensive training scheduled for this weekend. All players expected to attend.', publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { _id: 'u3', title: 'New Player Joining', content: 'We welcome our new signing to the squad. Looking forward to seeing them in action!', publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
];

const api = async (path, opts = {}) => {
  // If using mock data, return mock responses
  if (state.useMockData) {
    if (path === '/api/players') return mockPlayers;
    if (path === '/api/fixtures') return mockFixtures;
    if (path === '/api/updates') return mockUpdates;
    if (path === '/api/lineup') return state.lineup;
    if (path.startsWith('/api/players/')) {
      const id = path.split('/').pop();
      return mockPlayers.find(p => p._id === id) || mockPlayers[0];
    }
    if (path === '/api/auth/login') {
      const { password } = JSON.parse(opts.body || '{}');
      if (password === 'admin123') return { token: 'mock_token_' + Date.now() };
      throw new Error('Invalid credentials');
    }
    return {};
  }
  // Real API call
  try {
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (state.token) headers.Authorization = `Bearer ${state.token}`;
    const res = await fetch(`${window.API_BASE}${path}`, { ...opts, headers });
    if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
    return res.json();
  } catch (err) {
    // Auto-fallback to mock if API fails
    console.warn('API failed, using mock data:', err.message);
    state.useMockData = true;
    return api(path, opts); // Retry with mock
  }
};

document.getElementById('year').textContent = new Date().getFullYear();

// Simple section router: show one section at a time
function showSection(id) {
  document.querySelectorAll('main .section').forEach(sec => {
    sec.style.display = sec.id === id ? 'block' : 'none';
  });
  // re-draw lineup when entering lineup view
  if (id === 'lineup') drawLineup();
  // update hash without jumping
  history.replaceState(null, '', `#${id}`);
}

function setupNavRouting() {
  document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = a.getAttribute('href').slice(1);
      showSection(target || 'home');
      // close mobile menu if open
      document.body.classList.remove('menu-open');
      const btn = document.getElementById('menuToggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
  // initial route
  const initial = (location.hash || '#home').slice(1);
  showSection(initial);
}

// UI helpers
function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
function showAdminUI(isAuthed) {
  document.querySelectorAll('.admin-only').forEach(e => e.classList.toggle('hidden', !isAuthed));
}

// Renderers
function updateHomeStats() {
  const next = state.fixtures.find(f => f.status === 'upcoming');
  document.getElementById('totalPlayers').textContent = state.players.filter(p => !p.isCoach).length;
  document.getElementById('upcomingMatches').textContent = state.fixtures.filter(f => f.status === 'upcoming').length;
  document.getElementById('totalGoals').textContent = '0'; // Fixed to 0 for now
}

function renderUpcomingPreview() {
  const wrap = document.getElementById('upcomingPreview');
  const upcomingFixture = state.fixtures.find(f => f.status === 'upcoming');
  if (!upcomingFixture) { wrap.innerHTML = '<p>No upcoming fixture.</p>'; return; }
  const d = new Date(upcomingFixture.date);
  wrap.innerHTML = `
    <div class="card glass" data-animate>
      <div class="row" style="justify-content:space-between;margin-bottom:12px">
        <div>
          <div class="badge">${upcomingFixture.home ? 'Home' : 'Away'}</div>
          <h3 style="margin:8px 0 4px">${upcomingFixture.opponent}</h3>
          <div style="color:var(--muted)">${d.toLocaleString()} • ${upcomingFixture.venue || ''}</div>
        </div>
        <button class="btn small" onclick="document.querySelector('a[href=\'#fixtures\']').click()">All Fixtures</button>
      </div>
      <div class="row" style="gap:10px">
        <button class="btn small" onclick="document.querySelector('a[href=\'#lineup\']').click()">View Lineup</button>
        ${state.token ? '<button class="btn small ghost" onclick="prepareMatchday()">Set Lineup</button>' : ''}
      </div>
    </div>`;
}

function renderPlayers() {
  // Render coach first
  const coachSection = document.getElementById('coachSection');
  const coach = state.players.find(p => p.isCoach);
  if (coachSection && coach) {
    coachSection.innerHTML = `
      <h3>Coach</h3>
      <div class="coach-card" data-animate>
        <div class="player-image-container">
          <img 
            src="${coach.photoUrl || ''}" 
            alt="${coach.name}"
            onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23101823\'/%3E%3Ctext x=\'50\' y=\'50\' font-family=\'Arial\' font-size=\'40\' fill=\'%237a8aa0\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EC%3C/text%3E%3C/svg%3E'"
            loading="lazy"
          >
        </div>
        <div class="meta">
          <strong>${coach.name}</strong>
        </div>
      </div>
    `;
  }

  // Render players
  const grid = document.getElementById('playersGrid');
  grid.innerHTML = '';
  state.players.filter(p => !p.isCoach).forEach(p => {
    const card = el(`
      <div class="player" data-animate>
        <div class="player-image-container">
          <img 
            src="${p.photoUrl || ''}" 
            alt="${p.name}"
            onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23101823\'/%3E%3Ctext x=\'50\' y=\'50\' font-family=\'Arial\' font-size=\'40\' fill=\'%237a8aa0\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3E${p.number}%3C/text%3E%3C/svg%3E'"
            loading="lazy"
          >
          <div class="player-image-overlay">
            <span class="player-number">${p.number}</span>
          </div>
        </div>
        <div class="meta">
          <div class="row" style="justify-content:space-between">
            <strong>#${p.number} ${p.name}</strong>
            <span class="badge">${p.position}</span>
          </div>
        </div>
      </div>`);
    card.addEventListener('click', () => showPlayer(p._id));
    grid.appendChild(card);
  });
}

async function showPlayer(id) {
  let p;
  if (state.useMockData) {
    p = state.players.find(p => p._id === id) || state.players[0];
  } else {
    p = await api(`/api/players/${id}`);
  }
  const d = document.getElementById('playerDetail');
  d.classList.remove('hidden');
  const s = p.stats || {};
  d.innerHTML = `
    <div class="row" style="justify-content:space-between;align-items:center">
      <h3>Player Detail</h3>
      <button class="btn ghost" onclick="document.getElementById('playerDetail').classList.add('hidden')">Close</button>
    </div>
    <div class="row" style="gap:20px;align-items:center">
      <img src="${p.photoUrl || ''}" alt="" style="width:120px;height:120px;border-radius:12px;border:1px solid rgba(255,255,255,.1);object-fit:cover">
      <div>
        <h3 style="margin:4px 0">#${p.number} ${p.name} <span class="badge">${p.position}</span></h3>
        <div style="color:var(--muted)">Appearances: ${s.appearances||0} • Goals: ${s.goals||0} • Assists: ${s.assists||0} • YC: ${s.yellowCards||0} • RC: ${s.redCards||0}</div>
      </div>
    </div>`;
}

function renderFixtures() {
  const list = document.getElementById('fixturesList');
  list.innerHTML = '';
  state.fixtures.forEach(f => {
    const d = new Date(f.date);
    const isUpcoming = f.status === 'upcoming';
    const row = el(`
      <div class="fixture ${isUpcoming ? 'upcoming' : ''}" data-animate>
        <div class="fixture-main">
          <div class="fixture-header">
            <div>
              <strong>${f.opponent}</strong>
              <span class="badge ${f.home ? 'home' : 'away'}">${f.home ? 'Home' : 'Away'}</span>
            </div>
            ${f.status === 'completed' ? `
              <div class="score">
                <span class="score-number">${f.score || '0-0'}</span>
                <button class="btn small" onclick="document.querySelector('a[href=\'#lineup\']').click()">View Lineup</button>
              </div>
            ` : `
              <div class="fixture-time">${d.toLocaleString()}</div>
            `}
          </div>
          <div style="color:var(--muted)">${f.venue || 'TBD'}</div>
          ${isUpcoming ? `
            <div class="row" style="gap:10px;margin-top:10px">
              <button class="btn small" onclick="document.querySelector('a[href=\'#lineup\']').click()">View Lineup</button>
              ${state.token ? '<button class="btn small ghost" onclick="prepareMatchday()">Set Lineup</button>' : ''}
            </div>
          ` : ''}
        </div>
        ${state.token ? `<div class="fixture-admin">
          <button class="btn small ghost" data-id="${f._id}" data-action="edit">Update Score</button>
          <button class="btn small ghost" data-id="${f._id}" data-action="delete">Delete</button>
        </div>` : ''}
      </div>`);
    list.appendChild(row);
  });
  if (state.token) list.addEventListener('click', onFixtureAction);
}

async function onFixtureAction(e) {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  const action = btn.getAttribute('data-action');
  const fixture = state.fixtures.find(f => f._id === id);
  if (!fixture) return;

  try {
    if (action === 'delete') {
      if (!confirm('Are you sure you want to delete this fixture?')) return;
      if (state.useMockData) {
        state.fixtures = state.fixtures.filter(f => f._id !== id);
      } else {
        await api(`/api/fixtures/${id}`, { method: 'DELETE' });
      }
    } 
    else if (action === 'edit') {
      const scoreInput = prompt('Enter score (e.g., 2-1) or leave blank');
      if (scoreInput === null) return; // User cancelled

      const score = scoreInput.trim();
      const status = score ? 'completed' : 'upcoming';
      
      if (state.useMockData) {
        fixture.score = score;
        fixture.status = status;
      } else {
        const updated = await api(`/api/fixtures/${id}`, { 
          method: 'PUT', 
          body: JSON.stringify({ 
            score, 
            status,
            stats: {
              ...fixture.stats,
              homeScore: score ? parseInt(score.split('-')[0]) : 0,
              awayScore: score ? parseInt(score.split('-')[1]) : 0
            }
          })
        });
        Object.assign(fixture, updated);
      }
    }
    else if (action === 'add-goal') {
      const minute = prompt('Enter minute of goal:');
      if (!minute) return;
      
      const playerSelect = document.createElement('select');
      state.players.filter(p => !p.isCoach).forEach(p => {
        const opt = document.createElement('option');
        opt.value = p._id;
        opt.textContent = `#${p.number} ${p.name}`;
        playerSelect.appendChild(opt);
      });
      
      const playerDialog = document.createElement('div');
      playerDialog.innerHTML = `
        <div class="modal">
          <div class="modal-content">
            <h3>Select Goal Scorer</h3>
            <div style="margin:16px 0">
              ${playerSelect.outerHTML}
              <label style="display:block;margin-top:10px">
                <input type="checkbox" id="isOwnGoal"> Own Goal
              </label>
            </div>
            <div class="row" style="justify-content:flex-end;gap:10px">
              <button class="btn ghost" onclick="this.closest('.modal').remove()">Cancel</button>
              <button class="btn" id="confirmGoal">Add Goal</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(playerDialog);
      
      document.getElementById('confirmGoal').onclick = async () => {
        const playerId = playerDialog.querySelector('select').value;
        const isOwnGoal = playerDialog.querySelector('#isOwnGoal').checked;
        playerDialog.remove();
        
        if (state.useMockData) {
          if (!fixture.stats) fixture.stats = { homeScore: 0, awayScore: 0, scorers: [], assists: [] };
          fixture.stats.scorers.push({ player: playerId, minute: parseInt(minute), type: isOwnGoal ? 'own-goal' : 'goal' });
          if (isOwnGoal) {
            fixture.stats.awayScore++;
          } else {
            fixture.stats.homeScore++;
          }
          fixture.score = `${fixture.stats.homeScore}-${fixture.stats.awayScore}`;
        } else {
          const updated = await api(`/api/fixtures/${id}/events`, {
            method: 'POST',
            body: JSON.stringify({ type: 'goal', playerId, minute: parseInt(minute), isOwnGoal })
          });
          Object.assign(fixture, updated);
        }
        renderFixtures();
      };
    }
    
    renderFixtures();
    renderUpcomingPreview();
    if (!state.useMockData) {
      await loadFixtures();
    }
  } catch (err) {
    console.error('Fixture action failed:', err);
    alert('Action failed: ' + err.message);
  }
}

function renderUpdates() {
  const list = document.getElementById('updatesList');
  list.innerHTML = '';
  state.updates.forEach(u => {
    list.appendChild(el(`
      <div class="card" data-animate>
        <div class="row" style="justify-content:space-between">
          <h3 style="margin:6px 0">${u.title}</h3>
          <span style="color:var(--muted)">${new Date(u.publishedAt).toLocaleString()}</span>
        </div>
        ${u.imageUrl?`<img src="${u.imageUrl}" style="width:100%;border-radius:12px;margin:8px 0">`:''}
        <p style="color:var(--text)">${u.content}</p>
        ${state.token ? `<div class="row" style="justify-content:flex-end">
          <button class="btn small ghost" data-id="${u._id}" data-action="del-update">Delete</button>
        </div>`:''}
      </div>`));
  });
  if (state.token) list.addEventListener('click', async (e) => {
    const b = e.target.closest('button[data-action="del-update"]');
    if (!b) return;
    if (state.useMockData) {
      const id = b.getAttribute('data-id');
      state.updates = state.updates.filter(u => u._id !== id);
      renderUpdates();
    } else {
      await api(`/api/updates/${b.getAttribute('data-id')}`, { method: 'DELETE' });
      await loadUpdates();
    }
  });
}

// Lineup drawing (keeper at bottom)
function drawLineup() {
  const canvas = document.getElementById('pitchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  // Make canvas responsive with better mobile aspect ratio
  const container = canvas.parentElement;
  const maxWidth = Math.min(900, container.offsetWidth || 900);
  const aspectRatio = window.innerWidth <= 800 ? 2/3 : 900/560; // Taller aspect ratio on mobile
  const height = maxWidth / aspectRatio;
  canvas.width = maxWidth;
  canvas.height = height;
  
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const lineW = Math.max(1.5, maxWidth / 450);
  
  // Draw pitch markings
  ctx.strokeStyle = 'rgba(255,255,255,.6)';
  ctx.lineWidth = lineW;
  ctx.strokeRect(30,30,canvas.width-60,canvas.height-60);
  
  // Center line
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,30); ctx.lineTo(canvas.width/2,canvas.height-30); ctx.stroke();
  
  // Center circle
  ctx.beginPath(); ctx.arc(canvas.width/2, canvas.height/2, Math.max(50, maxWidth / 12.8), 0, Math.PI*2); ctx.stroke();
  
  // Goal posts at bottom (for keeper)
  const goalW = maxWidth * 0.15;
  const goalH = maxWidth * 0.02;
  const goalX = (canvas.width - goalW) / 2;
  const goalY = canvas.height - 30 - goalH;
  
  ctx.strokeStyle = 'rgba(255,255,255,.8)';
  ctx.lineWidth = Math.max(2, lineW * 1.5);
  // Left post
  ctx.beginPath();
  ctx.moveTo(goalX, goalY);
  ctx.lineTo(goalX, goalY + goalH);
  ctx.stroke();
  // Right post
  ctx.beginPath();
  ctx.moveTo(goalX + goalW, goalY);
  ctx.lineTo(goalX + goalW, goalY + goalH);
  ctx.stroke();
  // Crossbar
  ctx.beginPath();
  ctx.moveTo(goalX, goalY);
  ctx.lineTo(goalX + goalW, goalY);
  ctx.stroke();
  
  // Goal box at bottom
  const boxW = maxWidth * 0.25;
  const boxH = maxWidth * 0.08;
  const boxX = (canvas.width - boxW) / 2;
  ctx.strokeStyle = 'rgba(255,255,255,.5)';
  ctx.lineWidth = lineW;
  ctx.strokeRect(boxX, goalY - boxH, boxW, boxH);
  
  // Penalty box at bottom
  const penBoxW = maxWidth * 0.4;
  const penBoxH = maxWidth * 0.15;
  const penBoxX = (canvas.width - penBoxW) / 2;
  ctx.strokeRect(penBoxX, goalY - penBoxH, penBoxW, penBoxH);
  
  // Draw players
  const slots = state.lineup.slots || [];
  const circleRadius = Math.max(14, maxWidth / 50);
  const fontSize = Math.max(10, maxWidth / 75);
  slots.forEach(slot => {
    const px = slot.x * canvas.width; const py = slot.y * canvas.height;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(px, py, circleRadius, 0, Math.PI*2); ctx.fill();
    const player = state.players.find(p => p._id === slot.player);
    ctx.fillStyle = '#000'; ctx.font = `bold ${fontSize}px Outfit`; ctx.textAlign = 'center'; ctx.fillText(player ? player.number : '?', px, py+fontSize/3);
    if (player) {
      ctx.fillStyle = 'rgba(230,238,248,.9)'; ctx.font = `${Math.max(9, fontSize-2)}px Outfit`; ctx.textAlign = 'center';
      // Position name above for forwards/midfielders, below for defenders/keeper
      const textY = py > canvas.height * 0.7 ? py + circleRadius + 14 : py - circleRadius - 8;
      ctx.fillText(player.name, px, textY);
    }
  });
}

function formationSlots(formation) {
  // Returns slot positions with keeper at bottom (standard view)
  const slots = [];
  const form = formation || '4-3-3';
  const isMobile = window.innerWidth <= 800;
  const keeperY = isMobile ? 0.9 : 0.85; // Position keeper closer to goal on mobile
  
  // Add goalkeeper for all formations
  slots.push({x:0.5, y:keeperY, role:'GK'});

  if (form === '4-3-3') {
    // 4-3-3 Formation
    // 4 Defenders
    slots.push(
      {x:0.2, y:0.75, role:'DF'}, // Left Back
      {x:0.4, y:0.75, role:'DF'}, // Left Center Back
      {x:0.6, y:0.75, role:'DF'}, // Right Center Back
      {x:0.8, y:0.75, role:'DF'}, // Right Back
      // 3 Midfielders
      {x:0.3, y:0.5, role:'MF'}, // Left Mid
      {x:0.5, y:0.5, role:'MF'}, // Center Mid
      {x:0.7, y:0.5, role:'MF'}, // Right Mid
      // 3 Forwards
      {x:0.25, y:0.25, role:'FW'}, // Left Wing
      {x:0.5, y:0.25, role:'FW'}, // Striker
      {x:0.75, y:0.25, role:'FW'} // Right Wing
    );
  } 
  else if (form === '4-4-2') {
    // 4-4-2 Formation
    slots.push(
      // 4 Defenders
      {x:0.2, y:0.75, role:'DF'}, // Left Back
      {x:0.4, y:0.75, role:'DF'}, // Left Center Back
      {x:0.6, y:0.75, role:'DF'}, // Right Center Back
      {x:0.8, y:0.75, role:'DF'}, // Right Back
      // 4 Midfielders
      {x:0.2, y:0.5, role:'MF'}, // Left Mid
      {x:0.4, y:0.5, role:'MF'}, // Left Center Mid
      {x:0.6, y:0.5, role:'MF'}, // Right Center Mid
      {x:0.8, y:0.5, role:'MF'}, // Right Mid
      // 2 Forwards
      {x:0.35, y:0.25, role:'FW'}, // Left Striker
      {x:0.65, y:0.25, role:'FW'} // Right Striker
    );
  }
  else if (form === '3-5-2') {
    // 3-5-2 Formation
    slots.push(
      // 3 Defenders
      {x:0.3, y:0.75, role:'DF'}, // Left Center Back
      {x:0.5, y:0.75, role:'DF'}, // Center Back
      {x:0.7, y:0.75, role:'DF'}, // Right Center Back
      // 5 Midfielders
      {x:0.1, y:0.5, role:'MF'}, // Left Wing Back
      {x:0.3, y:0.5, role:'MF'}, // Left Mid
      {x:0.5, y:0.5, role:'MF'}, // Center Mid
      {x:0.7, y:0.5, role:'MF'}, // Right Mid
      {x:0.9, y:0.5, role:'MF'}, // Right Wing Back
      // 2 Forwards
      {x:0.35, y:0.25, role:'FW'}, // Left Striker
      {x:0.65, y:0.25, role:'FW'} // Right Striker
    );
  }
  return slots;
}

function getSubstitutes() {
  const startingIds = (state.lineup.slots || []).map(s => s.player).filter(Boolean);
  return state.players.filter(p => !p.isCoach && !startingIds.includes(p._id)).slice(0, 7);
}

function renderSubstitutes() {
  const box = document.getElementById('subsList');
  if (!box) return;
  const subs = getSubstitutes();
  box.innerHTML = '';
  subs.forEach(p => {
    const item = el(`<div class="sub">#${p.number} ${p.name} <span class="badge" style="margin-left:6px">${p.position}</span></div>`);
    box.appendChild(item);
  });
  if (!subs.length) box.innerHTML = '<div class="sub" style="color:var(--muted)">No substitutes yet</div>';
}

function renderLineupAdmin() {
  const form = document.getElementById('lineupForm');
  const sel = form.elements['formation'];
  sel.value = state.lineup.formation || '4-3-3';
  const slotsWrap = document.getElementById('lineupSlots');
  slotsWrap.innerHTML = '';
  const slots = (state.lineup.slots && state.lineup.slots.length ? state.lineup.slots : formationSlots(sel.value)).map(s=>({ ...s }));
  slots.forEach((slot, idx) => {
    const w = el(`<div class="card"><div class="row" style="justify-content:space-between"><strong>${slot.role}</strong><span style="color:var(--muted)">${idx===0?'GK':''}</span></div></div>`);
    const select = document.createElement('select'); select.name = `slot_${idx}`;
    const optNone = document.createElement('option'); optNone.value=''; optNone.textContent='— Select Player —'; select.appendChild(optNone);
    state.players.filter(p => slot.role==='GK'?p.position==='GK':p.position!=='GK').forEach(p => {
      const o = document.createElement('option'); o.value=p._id; o.textContent=`#${p.number} ${p.name}`; if (slot.player===p._id) o.selected=true; select.appendChild(o);
    });
    w.appendChild(select); slotsWrap.appendChild(w);
  });
  form.onchange = () => { state.lineup.formation = sel.value; drawLineup(); };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const newSlots = [];
    const base = (state.lineup.slots && state.lineup.slots.length ? state.lineup.slots : formationSlots(sel.value));
    base.forEach((s, idx) => {
      const val = form.elements[`slot_${idx}`].value || null;
      newSlots.push({ x: s.x, y: s.y, role: s.role, player: val });
    });
    if (state.useMockData) {
      state.lineup = { formation: sel.value, slots: newSlots };
      drawLineup();
      renderSubstitutes();
      alert('Lineup saved');
    } else {
      const payload = { formation: sel.value, slots: newSlots };
      await api('/api/lineup', { method: 'PUT', body: JSON.stringify(payload) });
      state.lineup = await api('/api/lineup');
      drawLineup();
      renderSubstitutes();
      alert('Lineup saved');
    }
  };
}

// Gallery (static placeholders)
function renderGallery() {
  const photos = [1,2,3,4,5,6,7,8,9,10].map(i=>`https://images.unsplash.com/photo-1518081461904-9ac0a7a8d8d2?auto=format&fit=crop&w=1200&q=60&sig=${i}`);
  const videos = [
    'https://www.youtube.com/embed/1Q8fG0TtVAY',
    'https://www.youtube.com/embed/9bZkp7q19f0',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
  ];
  const g = document.getElementById('galleryGrid'); g.innerHTML = '';
  photos.forEach(src => g.appendChild(el(`<img data-animate src="${src}" alt="Gallery">`)));
  const v = document.getElementById('videosGrid'); v.innerHTML='';
  videos.forEach(src => v.appendChild(el(`<iframe data-animate src="${src}" title="Video" frameborder="0" allowfullscreen></iframe>`)));
}

// Admin Modal handlers
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const closeAdmin = document.getElementById('closeAdmin');
adminBtn.onclick = () => { adminModal.classList.remove('hidden'); };
closeAdmin.onclick = () => { adminModal.classList.add('hidden'); };

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = e.target.password.value;
  try {
    const { token } = await api('/api/auth/login', { method:'POST', body: JSON.stringify({ password }) });
    state.token = token; localStorage.setItem('token', token);
    showAdminUI(true); adminModal.classList.add('hidden');
  } catch (err) {
    console.error('Login failed', err);
    alert('Login failed: ' + (err.message || 'Please check API and password'));
  }
});
document.getElementById('logoutBtn').addEventListener('click', () => {
  state.token = null; localStorage.removeItem('token'); showAdminUI(false);
});
document.getElementById('seedBtn').addEventListener('click', async () => {
  const password = prompt('Confirm admin password to seed sample data:');
  if (!password) return;
  if (state.useMockData) {
    // Already using mock data, just reload
    await loadPlayers(); await loadFixtures(); await loadUpdates(); await loadLineup();
    alert('Mock data loaded!');
  } else {
    await api('/api/auth/seed', { method:'POST', body: JSON.stringify({ password }) });
    await loadPlayers(); await loadFixtures(); await loadUpdates(); await loadLineup();
  }
});

// Admin forms
document.getElementById('fixtureForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target).entries());
  fd.home = fd.home === 'true';
  if (state.useMockData) {
    const newFixture = {
      _id: 'f' + Date.now(),
      ...fd,
      date: new Date(fd.date).toISOString(),
      status: 'upcoming'
    };
    state.fixtures.push(newFixture);
    renderFixtures();
    renderUpcomingPreview();
    e.target.reset();
  } else {
    await api('/api/fixtures', { method: 'POST', body: JSON.stringify(fd) });
    e.target.reset(); await loadFixtures();
  }
});

document.getElementById('updateForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target).entries());
  if (state.useMockData) {
    const newUpdate = {
      _id: 'u' + Date.now(),
      ...fd,
      publishedAt: new Date().toISOString()
    };
    state.updates.unshift(newUpdate);
    renderUpdates();
    e.target.reset();
  } else {
    await api('/api/updates', { method: 'POST', body: JSON.stringify(fd) });
    e.target.reset(); await loadUpdates();
  }
});

// Attendance minimal admin (edit per player via prompt for now)
window.manageAttendance = async (playerId) => {
  if (!state.token) return alert('Admin only');
  const date = prompt('Date (YYYY-MM-DD):');
  const status = prompt('Status: Present/Absent');
  if (!date || !status) return;
  await api('/api/attendance', { method:'POST', body: JSON.stringify({ player: playerId, date: new Date(date), status }) });
  alert('Attendance saved');
};

// Data loaders
async function loadPlayers() { state.players = await api('/api/players'); renderPlayers(); renderLineupAdmin(); drawLineup(); updateHomeStats(); }
async function loadFixtures() { state.fixtures = await api('/api/fixtures'); renderFixtures(); renderUpcomingPreview(); updateHomeStats(); }
async function loadUpdates() { state.updates = await api('/api/updates'); renderUpdates(); }
async function loadLineup() { state.lineup = await api('/api/lineup'); drawLineup(); renderLineupAdmin(); renderSubstitutes(); }

async function init() {
  try {
    showAdminUI(!!state.token);
    await loadPlayers(); // Load players first
    await Promise.all([
      loadFixtures(),
      loadUpdates(),
      loadLineup()
    ]);
    renderGallery();
    setupNavRouting();
    const menuBtn = document.getElementById('menuToggle');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const open = !document.body.classList.contains('menu-open');
        document.body.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    // Redraw lineup on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state.lineup && state.lineup.slots && state.lineup.slots.length) {
          drawLineup();
        }
      }, 150);
    });
    await Promise.all([loadPlayers(), loadFixtures(), loadUpdates(), loadLineup()]);
    await ensureDefaultXI();
  } catch (e) {
    console.error(e);
  }
}

init();

// Ensure default XI if lineup is empty
// Prepare lineup for upcoming match
window.prepareMatchday = () => {
  document.querySelector('a[href="#lineup"]').click();
  setTimeout(() => {
    const lineupForm = document.getElementById('lineupForm');
    if (lineupForm) lineupForm.scrollIntoView({ behavior: 'smooth' });
  }, 100);
};

async function ensureDefaultXI() {
  try {
    const hasXI = state.lineup && Array.isArray(state.lineup.slots) && state.lineup.slots.some(s => s.player);
    if (hasXI) { renderSubstitutes(); return; }
    const players = state.players.filter(p => !p.isCoach);
    if (!players.length) return;
    const GK = players.filter(p => p.position === 'GK');
    const DF = players.filter(p => p.position === 'DF');
    const MF = players.filter(p => p.position === 'MF');
    const FW = players.filter(p => p.position === 'FW');
    const pick = (arr, n) => arr.slice(0, n);
    let xi = [];
    xi = xi.concat(pick(GK, 1));
    xi = xi.concat(pick(DF, 4));
    xi = xi.concat(pick(MF, 3));
    xi = xi.concat(pick(FW, 3));
    if (xi.length < 11) {
      const remaining = players.filter(p => !xi.find(x => x._id === p._id));
      xi = xi.concat(pick(remaining, 11 - xi.length));
    }
    const formation = '4-3-3';
    const slots = formationSlots(formation);
    const newSlots = slots.map((s, i) => ({ x: s.x, y: s.y, role: s.role, player: xi[i]?._id || null }));
    if (state.useMockData) {
      state.lineup = { formation: '4-3-3', slots: newSlots };
    } else {
      await api('/api/lineup', { method: 'PUT', body: JSON.stringify({ formation: '4-3-3', slots: newSlots }) });
      state.lineup = await api('/api/lineup');
    }
    drawLineup();
    renderLineupAdmin();
    renderSubstitutes();
  } catch (e) {
    console.error('Failed to set default XI', e);
  }
}



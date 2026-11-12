// scratch/test_mobile_responsive.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8089;
const ROOT_DIR = 'd:\\chessana';

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(ROOT_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
    }
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    const cdpPort = 9226;

    const edgeProc = spawn(edgePath, [
        `--remote-debugging-port=${cdpPort}`,
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--user-data-dir=C:\\Users\\baovi\\AppData\\Local\\Temp\\edge_mobile_test_' + Date.now(),
        `http://localhost:${PORT}/index.html`
    ]);

    async function waitCDP() {
        for (let i = 0; i < 30; i++) {
            try {
                const res = await fetch(`http://localhost:${cdpPort}/json`);
                const data = await res.json();
                const pageTarget = data.find(t => t.type === 'page');
                if (pageTarget && pageTarget.webSocketDebuggerUrl) {
                    return pageTarget.webSocketDebuggerUrl;
                }
            } catch (e) {}
            await new Promise(r => setTimeout(r, 200));
        }
        throw new Error('CDP not ready');
    }

    try {
        const wsUrl = await waitCDP();
        const ws = new WebSocket(wsUrl);

        let msgId = 0;
        const pending = new Map();

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.id && pending.has(data.id)) {
                pending.get(data.id)(data);
                pending.delete(data.id);
            }
        };

        function send(method, params = {}) {
            return new Promise((resolve) => {
                const id = ++msgId;
                pending.set(id, resolve);
                ws.send(JSON.stringify({ id, method, params }));
            });
        }

        await new Promise(r => { ws.onopen = r; });
        console.log('Connected to Chrome DevTools Protocol');

        await send('Runtime.enable');
        await send('Page.enable');
        await send('DOM.enable');

        async function evalJs(expr) {
            const res = await send('Runtime.evaluate', {
                expression: expr,
                returnByValue: true,
                awaitPromise: true
            });
            if (res && res.result && res.result.exceptionDetails) {
                console.error('JS Exception:', res.result.exceptionDetails);
            }
            return res ? res.result : null;
        }

        // Set device metrics to mobile screen (iPhone 12/13/14: 390x844)
        await send('Emulation.setDeviceMetricsOverride', {
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            mobile: true
        });

        await new Promise(r => setTimeout(r, 1500));

        // Evaluate layout metrics in mobile mode
        const evalRes = await evalJs(`(() => {
            try {
                const results = {};
                
                // 1. Viewport Meta
                const meta = document.querySelector('meta[name="viewport"]');
                results.viewportMeta = meta ? meta.getAttribute('content') : null;

                // Unhide review content so board and ctrl are visible
                const placeholder = document.getElementById('review-placeholder');
                const content = document.getElementById('review-content');
                if (placeholder) placeholder.classList.add('hidden');
                if (content) content.classList.remove('hidden');

                if (typeof board !== 'undefined' && board && typeof board.resize === 'function') {
                    board.resize();
                }

                // Check layout structure
                const layout = document.querySelector('.layout');
                const left = document.querySelector('.left');
                const right = document.querySelector('.right');
                const ctrl = document.querySelector('.ctrl');
                const boardWrapper = document.querySelector('.board-wrapper');
                const boardEl = document.getElementById('board');
                const drawer = document.getElementById('game-drawer');
                const hb = document.getElementById('btn-open-drawer');
                const btnStats = document.getElementById('btn-lifetime-stats');
                const btnSettings = document.getElementById('btn-open-settings');
                const playBtn = document.getElementById('btn-play');
                const nextBtn = document.getElementById('btn-next');
                const tabBtns = document.querySelectorAll('.tabs button');
                const inputs = document.querySelectorAll('input, select');

                const layoutStyle = window.getComputedStyle(layout);
                const leftStyle = window.getComputedStyle(left);
                const rightStyle = window.getComputedStyle(right);
                const ctrlStyle = window.getComputedStyle(ctrl);
                const drawerStyle = window.getComputedStyle(drawer);
                const nextBtnStyle = window.getComputedStyle(nextBtn);
                const playBtnStyle = window.getComputedStyle(playBtn);
                const hbStyle = window.getComputedStyle(hb);
                const btnStatsStyle = window.getComputedStyle(btnStats);
                const btnSettingsStyle = window.getComputedStyle(btnSettings);

                results.layoutGridCols = layoutStyle.gridTemplateColumns;
                results.leftOrder = leftStyle.order;
                results.rightOrder = rightStyle.order;
                results.leftWidth = left ? Math.round(left.getBoundingClientRect().width) : 0;
                results.boardWrapperWidth = boardWrapper ? Math.round(boardWrapper.getBoundingClientRect().width) : 0;
                results.boardWidth = boardEl ? Math.round(boardEl.getBoundingClientRect().width) : 0;

                results.ctrlPosition = ctrlStyle.position;
                results.ctrlBottom = ctrlStyle.bottom;
                results.ctrlBoxShadow = ctrlStyle.boxShadow !== 'none';

                results.nextBtnHeight = parseFloat(nextBtnStyle.height);
                results.playBtnHeight = parseFloat(playBtnStyle.height);
                results.hbHeight = parseFloat(hbStyle.height);
                results.hbWidth = parseFloat(hbStyle.width);
                results.btnStatsHeight = parseFloat(btnStatsStyle.height);
                results.btnSettingsHeight = parseFloat(btnSettingsStyle.height);

                results.drawerWidth = drawer ? Math.round(drawer.getBoundingClientRect().width) : 0;
                results.viewportWidth = window.innerWidth;
                results.drawerWidthRatio = (results.drawerWidth / results.viewportWidth).toFixed(2);

                const tabHeights = Array.from(tabBtns).map(t => parseFloat(window.getComputedStyle(t).height));
                results.minTabHeight = Math.min(...tabHeights);

                const inputFontSizes = Array.from(inputs).slice(0, 10).map(inp => parseFloat(window.getComputedStyle(inp).fontSize));
                results.minInputFontSize = Math.min(...inputFontSizes);

                // Test drawer open
                if (typeof openGameDrawer === 'function') openGameDrawer();
                results.drawerOpenInitially = drawer ? drawer.classList.contains('open') : false;

                return { success: true, data: results };
            } catch (e) {
                return { success: false, error: e.message, stack: e.stack };
            }
        })()`);

        console.log('Mobile Layout Test Results:');
        console.log(JSON.stringify(evalRes ? evalRes.result.value : evalRes, null, 2));

        // Take a screenshot of the mobile screen
        const screenshot = await send('Page.captureScreenshot', { format: 'png' });
        if (screenshot && screenshot.result && screenshot.result.data) {
            const outPath = path.join(ROOT_DIR, 'scratch', 'mobile_screenshot.png');
            fs.writeFileSync(outPath, Buffer.from(screenshot.result.data, 'base64'));
            console.log('Screenshot saved to:', outPath);
        }

        // Test swipe left to close drawer
        const swipeTest = await evalJs(`(() => {
            try {
                const drawer = document.getElementById('game-drawer');
                const touchStart = { clientX: 250, clientY: 300 };
                const touchEnd = { clientX: 100, clientY: 305 };
                
                // Create touch events
                const tsEvent = new Event('touchstart', { bubbles: true });
                tsEvent.touches = [touchStart];
                drawer.dispatchEvent(tsEvent);

                const teEvent = new Event('touchend', { bubbles: true });
                teEvent.changedTouches = [touchEnd];
                drawer.dispatchEvent(teEvent);

                return { success: true, drawerClosedAfterSwipe: !drawer.classList.contains('open') };
            } catch (e) {
                return { success: false, error: e.message };
            }
        })()`);

        console.log('Swipe Gesture Test:', swipeTest ? swipeTest.result.value : swipeTest);

        // Test smaller mobile viewport (360x640)
        await send('Emulation.setDeviceMetricsOverride', {
            width: 360,
            height: 640,
            deviceScaleFactor: 2,
            mobile: true
        });
        await new Promise(r => setTimeout(r, 400));

        const smallEval = await evalJs(`(() => {
            const pbar = document.getElementById('player-bar-top');
            const pn = document.getElementById('player-top-name');
            const clock = document.getElementById('player-top-clock');
            const ctrl = document.querySelector('.ctrl');
            const bodyWidth = document.body.clientWidth;

            return {
                bodyWidth: bodyWidth,
                pbarWidth: pbar ? Math.round(pbar.getBoundingClientRect().width) : 0,
                pnWidth: pn ? Math.round(pn.getBoundingClientRect().width) : 0,
                clockWidth: clock ? Math.round(clock.getBoundingClientRect().width) : 0,
                ctrlWidth: ctrl ? Math.round(ctrl.getBoundingClientRect().width) : 0,
                noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth
            };
        })()`);

        console.log('Small Screen (360px) Test Results:');
        console.log(JSON.stringify(smallEval ? smallEval.result.value : smallEval, null, 2));

        const screenshotSmall = await send('Page.captureScreenshot', { format: 'png' });
        if (screenshotSmall && screenshotSmall.result && screenshotSmall.result.data) {
            const outPathSmall = path.join(ROOT_DIR, 'scratch', 'mobile_360_screenshot.png');
            fs.writeFileSync(outPathSmall, Buffer.from(screenshotSmall.result.data, 'base64'));
            console.log('Screenshot 360 saved to:', outPathSmall);
        }

        ws.close();
    } catch (err) {
        console.error('Test error:', err);
    } finally {
        edgeProc.kill();
        server.close();
        process.exit(0);
    }
});

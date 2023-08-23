export default hook.define({
  name: 'PhiZone',
  description: 'PhiZone API',
  contents: [
    {
      type: 'command',
      meta: ['/pz', dialog]
    },
    {
      type: 'command',
      meta: ['/random', random]
    }
  ]
});
const { msgHandler, uploader } = hook;
const host = 'https://api.phi.zone';
const ver = 'PhiZone API v0.7.3';
// eslint-disable-next-line no-alert
const vprompt = str => prompt(`${ver}\n${str}`);
const valert = str => hook.toast(`${ver}\n${str}`);
async function dialog(num) {
  const id = num || vprompt('请输入歌曲ID');
  if (id === '' || id === null) { valert('未输入歌曲ID，已取消操作'); return }
  const data = await query(id).catch(err => {
    valert(`无法连接至服务器\n错误代码：${err.message}`);
    msgHandler.sendMessage('无法连接至服务器');
  });
  console.log(data);
  if (!data) return;
  if (!data.charts.length) { valert(`歌曲ID ${id} 对应的谱面不存在`); return }
  await readData(data);
}
async function random() {
  const data = await queryRandom().catch(err => valert(`无法连接至服务器\n错误代码：${err.message}`));
  console.log(data);
  if (!data) return;
  if (!data.charts.length) { valert(`歌曲ID ${'<random>'} 对应的谱面不存在`); return }
  await readData(data);
}
async function query(id) {
  msgHandler.sendMessage('等待服务器响应...');
  const resS = await fetch(`${host}/songs/${id | 0}/?query_charts=1`);
  if (!resS.ok) {
    if (resS.status === 404) return { charts: [] };
    throw new Error(`${resS.status} ${resS.statusText}`);
  }
  const song = await resS.json();
  return getData(song.charts.filter(a => a.chart), song);
}
async function queryRandom() {
  msgHandler.sendMessage('等待服务器响应...');
  const resC = await fetch(`${host}/charts/?pagination=0&query_charts=1`);
  if (!resC.ok) {
    if (resC.status === 404) return { charts: [] };
    throw new Error(`${resC.status} ${resC.statusText}`);
  }
  const data = await resC.json();
  const charts = data.filter(a => a.chart).sort(_ => Math.random() - 0.5);
  const chart = charts[0];
  const song = await fetch(`${host}/songs/${chart.song}/`).then(res => res.json());
  return getData([chart], song);
}
function getData(base, song) {
  console.log('getData::base', ...base);
  console.log('getData::song', song);
  return {
    charts: base.map(a => ({
      id: a.id,
      chart: a.chart,
      level: `${a.level}\u2002Lv.${a.difficulty | 0}`,
      charter: a.charter.replace(/\[PZUser:\d+:([^\]]+?)(:PZRT)?\]/g, '$1'),
      assets: a.assets
    })),
    composer: song.composer,
    illustration: song.illustration,
    illustrator: song.illustrator,
    name: song.name,
    song: song.song
  };
}
async function readData(data) {
  const /** @type {array} */ { charts } = data;
  const urls = [data.song, data.illustration];
  for (const chart of charts) {
    if (chart.chart) urls.push(chart.chart);
    if (chart.assets) urls.push(chart.assets);
  }
  const downloader = new Downloader();
  const dstr = str => decodeURIComponent(str.match(/[^/]+$/)[0]);
  msgHandler.sendMessage('获取资源列表...');
  await downloader.add(urls, ({ url, status, statusText }) => {
    valert(`资源 '${dstr(url)}' 加载失败\n错误代码：${status} ${statusText}`);
  });
  await downloader.start(uploader.fireProgress.bind(uploader));
  const xhr4 = async(url, name) => {
    const data1 = await downloader.getData(url) || new ArrayBuffer(0);
    uploader.fireLoad({ name }, data1); // 以后添加catch
  };
  await xhr4(data.song, dstr(data.song));
  await xhr4(data.illustration, dstr(data.illustration));
  for (let i = 0; i < charts.length; i++) {
    const chart = charts[i];
    if (chart.assets) await xhr4(chart.assets, dstr(chart.assets));
    await xhr4(chart.chart, dstr(chart.chart));
    const encoder = new TextEncoder();
    const offset = getChartOffset(chart.id);
    const infoText = `
      #
      Name: ${data.name}
      Song: ${dstr(data.song)}
      Picture: ${dstr(data.illustration)}
      Chart: ${dstr(chart.chart)}
      Level: ${chart.level}
      Composer: ${data.composer}
      Charter: ${chart.charter}
      Illustrator: ${data.illustrator}
      Offset: ${offset}
    `;
    const info = encoder.encode(infoText);
    uploader.fireLoad({ name: 'info.txt' }, info.buffer);
  }
}
/**
 * @typedef {(ev:ProgressEvent<XMLHttpRequest>)} XHR
 * @param {string} url
 * @param {XHR} onprogress
 */
function xhr2(url, onprogress = _ => {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onprogress = onprogress;
    xhr.onload = evt => (xhr.status === 200 ? resolve : reject)(evt);
    xhr.onerror = reject;
    xhr.send();
  });
}
// async function xhr2(url, onprogress = _ => {}) {
//   const data = [];
//   let loaded = 0;
//   const res = await fetch(url, { method: 'GET' });
//   if (!res.ok) throw { url, status: res.status, statusText: res.statusText };
//   const total = Number(res.headers.get('content-length'));
//   const reader = res.body.getReader();
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     data.push(value);
//     loaded += value.length;
//     onprogress({ loaded, total });
//   }
//   return { target: { response: new Blob(data).arrayBuffer() }, loaded, total };
// }
async function getContentLength(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' }).catch(() => {
      throw Object.assign(new Error(), { url, status: 0, statusText: 'Network Error' });
    });
    const length = res.headers.get('content-length'); // 踩坑：这里的length是字符串
    if (length == null) throw new Error('No Content-Length Header');
    if (res.ok) return Number(length);
  } catch (_) {
    const res = await fetch(url, { method: 'GET' }).catch(() => {
      throw Object.assign(new Error(), { url, status: 0, statusText: 'Network Error' });
    });
    res.body.cancel();
    if (!res.ok) throw Object.assign(new Error(), { url, status: res.status, statusText: res.statusText });
    return Number(res.headers.get('content-length')) || 0;
  }
  throw Object.assign(new Error(), { url, status: 0, statusText: 'Unknown Error' });
}
function Downloader() {
  this.xhrs = Object.create(null);
}
Downloader.prototype.add = function(urls = [], onerror = _ => {}) {
  return Promise.all(urls.
    filter(url => !this.xhrs[url]).
    map(async url => {
      try {
        const total = await getContentLength(url);
        this.xhrs[url] = { event: { loaded: 0, total } };
      } catch (result) {
        onerror(result);
      }
    }));
};
Downloader.prototype.start = function(onprogress = (..._) => {}) {
  const entries = Object.entries(this.xhrs);
  return Promise.all(entries.map(([url, xhr]) => xhr2(url, evt => {
    xhr.event = evt;
    onprogress(this.loaded, this.total);
  }).then(evt => xhr.event = evt).catch(evt => xhr.event = evt)));
};
Downloader.prototype.getData = function(url) {
  if (!this.xhrs[url]) return null;
  const { event } = this.xhrs[url];
  if (event.loaded >= event.total) return event.target.response;
  return null;
};
Object.defineProperty(Downloader.prototype, 'loaded', { get() {
  const values = Object.values(this.xhrs);
  return values.reduce((loaded, xhr) => loaded + xhr.event.loaded, 0);
} });
Object.defineProperty(Downloader.prototype, 'total', { get() {
  const values = Object.values(this.xhrs);
  return values.reduce((total, xhr) => total + Math.max(xhr.event.loaded, xhr.event.total), 0);
} });
function getChartOffset(id) {
  if (id === 29) return 200; // 45
  if (id === 31) return 100; // 24
  if (id === 38) return 175; // 64
  if (id === 41) return 50; // 43
  if (id === 42) return 175; // 13
  if (id === 44) return -150; // 33
  if (id === 54) return -500; // 8
  if (id === 57) return 100; // 52
  if (id === 59) return 50; // 61
  if (id === 60) return 150; // 74
  if (id === 63) return 175; // 59
  if (id === 64) return 150; // 55
  if (id === 65) return 250; // 22-2
  if (id === 69) return -100; // 68
  if (id === 71) return 50; // 72
  if (id === 73) return 200; // 69-1
  if (id === 74) return 300; // 80
  if (id === 76) return -50; // 89
  if (id === 77) return 300; // 99
  if (id === 78) return 200; // 69-2
  if (id === 80) return 200; // 94
  if (id === 81) return 250; // 97-1
  if (id === 84) return 250; // 93
  if (id === 85) return 400; // 91
  if (id === 87) return -50; // 88
  if (id === 88) return 225; // 102
  if (id === 90) return 200; // 101-1
  if (id === 91) return 200; // 101-2
  if (id === 93) return 200; // 101-3
  if (id === 95) return 175; // 21
  if (id === 100) return 150; // 109
  if (id === 101) return -100; // 108
  if (id === 102) return -200; // 110
  if (id === 103) return -50; // 112
  if (id === 105) return -400; // 92
  if (id === 106) return 250; // 97-2
  if (id === 107) return 150; // 83
  if (id === 108) return 200; // 113
  if (id === 110) return 150; // 66
  if (id === 115) return 200; // 122
  if (id === 119) return 100; // 126
  if (id === 133) return -150; // 129
  if (id === 134) return -100; // 130
  // handled up to 138
  return 0;
}

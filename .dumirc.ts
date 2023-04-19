import { defineConfig } from 'dumi';
import path from 'path';
import rehypeAntd from './.dumi/rehypeAntd';
import remarkAntd from './.dumi/remarkAntd';
import { version } from './package.json';

export default defineConfig({
  conventionRoutes: {
    // to avoid generate routes for .dumi/pages/index/components/xx
    exclude: [new RegExp('index/components/'), 'components'],
  },
  base: '/meng-ui-react/',
  publicPath: '/meng-ui-react/',
  ssr: process.env.NODE_ENV === 'production' ? {} : false,
  hash: true,
  crossorigin: {},
  outputPath: '_site',
  //favicons: ['https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png'],
  favicons: ['https://gitee.com/sql123z/oss/blob/master/uPic/mengui.png'],
  resolve: {
    docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [{ type: 'component', dir: 'components' }],
    codeBlockMode: 'passive',
  },
  // locales: [
  //   { id: 'en-US', name: 'English', suffix: '' },
  //   { id: 'zh-CN', name: '中文', suffix: '-cn' },
  // ],
  // locales: [
  //   { id: 'zh-CN', name: '中文', suffix: '' },
  //   { id: 'en-US', name: 'English', suffix: '-en' },
  // ],
  define: {
    antdReproduceVersion: version,
  },
  alias: {
    'meng-ui-react/lib': path.join(__dirname, 'components'),
    'meng-ui-react/es': path.join(__dirname, 'components'),
    'meng-ui-react/locale': path.join(__dirname, 'components/locale'),
    'meng-ui-react': require.resolve('./.dumi/theme/antd.js'),
  },
  extraRehypePlugins: [rehypeAntd],
  extraRemarkPlugins: [remarkAntd],
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
  mfsu: false,
  metas: [{ name: 'theme-color', content: '#1677ff' }],
  analytics: {
    //站点统计
    //ga_v2: 'UA-72788897-1', //谷歌统计
    //baidu:"" //百度统计的key
  },
  headScripts: [
    `
    (function () {
      function isLocalStorageNameSupported() {
        const testKey = 'test';
        const storage = window.localStorage;
        try {
          storage.setItem(testKey, '1');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
      // 优先级提高到所有静态资源的前面，语言不对，加载其他静态资源没意义
      const pathname = location.pathname;

      function isZhCN(pathname) {
        return /-cn\\/?$/.test(pathname);
      }
      function getLocalizedPathname(path, zhCN) {
        const pathname = path.indexOf('/') === 0 ? path : '/' + path;
        if (!zhCN) {
          // to enUS
          return /\\/?index(-cn)?/.test(pathname) ? '/' : pathname.replace('-cn', '');
        } else if (pathname === '/') {
          return '/index-cn';
        } else if (pathname.indexOf('/') === pathname.length - 1) {
          return pathname.replace(/\\/$/, '-cn/');
        }
        return pathname + '-cn';
      }

      // 兼容旧的 URL， \`?locale=...\`
      const queryString = location.search;
      if (queryString) {
        const isZhCNConfig = queryString.indexOf('zh-CN') > -1;
        if (isZhCNConfig && !isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, isZhCNConfig);
        }
      }

      // 首页无视链接里面的语言设置 https://github.com/ant-design/ant-design/issues/4552
      if (isLocalStorageNameSupported() && (pathname === '/' || pathname === '/index-cn')) {
        const lang =
          (window.localStorage && localStorage.getItem('locale')) ||
          ((navigator.language || navigator.browserLanguage).toLowerCase() === 'zh-cn'
            ? 'zh-CN'
            : 'en-US');
        // safari is 'zh-cn', while other browser is 'zh-CN';
        if ((lang === 'zh-CN') !== isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, lang === 'zh-CN');
        }
      }
      document.documentElement.className += isZhCN(pathname) ? 'zh-cn' : 'en-us';
    })();
    `,
  ],
});

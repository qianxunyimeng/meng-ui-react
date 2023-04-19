import { CheckOutlined, SnippetsOutlined } from '@ant-design/icons';
import type { Project } from '@stackblitz/sdk';
import { Alert, Badge, Space, Tooltip } from 'antd';
import classNames from 'classnames';
import { FormattedMessage, useSiteData } from 'dumi';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
import Prism from 'prismjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useLocation from '../../../hooks/useLocation';
import BrowserFrame from '../../common/BrowserFrame';
import ClientOnly from '../../common/ClientOnly';
import CodePreview from '../../common/CodePreview';
import EditButton from '../../common/EditButton';
import ExternalLinkIcon from '../../common/ExternalLinkIcon';
import type { SiteContextProps } from '../../slots/SiteContext';
import SiteContext from '../../slots/SiteContext';
import type { AntdPreviewerProps } from '.';

const { ErrorBoundary } = Alert;

function toReactComponent(jsonML: any) {
  return toReactElement(jsonML, [
    [
      (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
      (node: any, index: any) => {
        // ref: https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/bisheng-plugin-highlight/lib/browser.js#L7
        const attr = JsonML.getAttributes(node);
        return React.createElement(
          'pre',
          {
            key: index,
            className: `language-${attr.lang}`,
          },
          React.createElement('code', {
            dangerouslySetInnerHTML: { __html: attr.highlighted },
          }),
        );
      },
    ],
  ]);
}

const track = ({ type, demo }: { type: string; demo: string }) => {
  if (!window.gtag) {
    return;
  }
  window.gtag('event', 'demo', { event_category: type, event_label: demo });
};

const CodePreviewer: React.FC<AntdPreviewerProps> = (props) => {
  const {
    asset,
    expand,
    iframe,
    demoUrl,
    children,
    title,
    description,
    originDebug,
    jsx,
    style,
    compact,
    background,
    filename,
    version,
    clientOnly,
  } = props;

  const { pkg } = useSiteData();
  const location = useLocation();

  const entryCode = asset.dependencies['index.tsx'].value;
  // const showRiddleButton = useShowRiddleButton();

  const liveDemo = useRef<React.ReactNode>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  // const codeSandboxIconRef = useRef<HTMLFormElement>(null);
  // const riddleIconRef = useRef<HTMLFormElement>(null);
  // const codepenIconRef = useRef<HTMLFormElement>(null);
  const [codeExpand, setCodeExpand] = useState<boolean>(false);
  const [copyTooltipOpen, setCopyTooltipOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [codeType, setCodeType] = useState<string>('tsx');
  const { theme } = useContext<SiteContextProps>(SiteContext);

  const { hash } = location;
  // const docsOnlineUrl = `https://ant.design${pathname}${search}#${asset.id}`;

  const [showOnlineUrl, setShowOnlineUrl] = useState<boolean>(false);

  const highlightedCodes = {
    jsx: Prism.highlight(jsx, Prism.languages.javascript, 'jsx'),
    tsx: Prism.highlight(entryCode, Prism.languages.javascript, 'jsx'),
  };

  const highlightedStyle = style ? Prism.highlight(style, Prism.languages.css, 'css') : '';

  useEffect(() => {
    const regexp = /preview-(\d+)-ant-design/; // matching PR preview addresses
    setShowOnlineUrl(
      process.env.NODE_ENV === 'development' || regexp.test(window.location.hostname),
    );
  }, []);

  const handleCodeExpand = (demo: string) => {
    setCodeExpand((prev) => !prev);
    track({ type: 'expand', demo });
  };

  const handleCodeCopied = (demo: string) => {
    setCopied(true);
    track({ type: 'copy', demo });
  };

  const onCopyTooltipOpenChange = (open: boolean) => {
    setCopyTooltipOpen(open);
    if (open) {
      setCopied(false);
    }
  };

  useEffect(() => {
    if (asset.id === hash.slice(1)) {
      anchorRef.current?.click();
    }
  }, []);

  useEffect(() => {
    setCodeExpand(expand);
  }, [expand]);

  const mergedChildren = !iframe && clientOnly ? <ClientOnly>{children}</ClientOnly> : children;

  if (!liveDemo.current) {
    liveDemo.current = iframe ? (
      <BrowserFrame>
        <iframe
          src={demoUrl}
          height={iframe === true ? undefined : iframe}
          title="demo"
          className="iframe-demo"
        />
      </BrowserFrame>
    ) : (
      mergedChildren
    );
  }

  const codeBoxClass = classNames('code-box', {
    expand: codeExpand,
    'code-box-debug': originDebug,
  });

  const localizedTitle = title;
  const introChildren = <div dangerouslySetInnerHTML={{ __html: description }} />;
  const highlightClass = classNames('highlight-wrapper', {
    'highlight-wrapper-expand': codeExpand,
  });

  const html = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
        </head>
        <body>
          <div id="container" style="padding: 24px" />
          <script>const mountNode = document.getElementById('container');</script>
        </body>
      </html>
    `;

  const tsconfig = {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
      esModuleInterop: true,
      moduleResolution: 'node',
      jsx: 'react',
      jsxFactory: 'React.createElement',
      jsxFragmentFactory: 'React.Fragment',
    },
  };

  const suffix = codeType === 'tsx' ? 'tsx' : 'js';

  const dependencies: Record<PropertyKey, string> = jsx.split('\n').reduce(
    (acc, line) => {
      const matches = line.match(/import .+? from '(.+)';$/);
      if (matches && matches[1] && !line.includes('antd')) {
        const paths = matches[1].split('/');
        if (paths.length) {
          const dep = paths[0].startsWith('@') ? `${paths[0]}/${paths[1]}` : paths[0];
          acc[dep] = 'latest';
        }
      }
      return acc;
    },
    { antd: pkg.version },
  );

  dependencies['@ant-design/icons'] = 'latest';

  if (suffix === 'tsx') {
    dependencies['@types/react'] = '^18.0.0';
    dependencies['@types/react-dom'] = '^18.0.0';
  }

  dependencies.react = '^18.0.0';
  dependencies['react-dom'] = '^18.0.0';

  // Reorder source code
  let parsedSourceCode = suffix === 'tsx' ? entryCode : jsx;
  let importReactContent = "import React from 'react';";
  const importReactReg = /import React(\D*)from 'react';/;
  const matchImportReact = parsedSourceCode.match(importReactReg);
  if (matchImportReact) {
    [importReactContent] = matchImportReact;
    parsedSourceCode = parsedSourceCode.replace(importReactReg, '').trim();
  }
  const demoJsContent = `
${importReactContent}
import './index.css';
${parsedSourceCode}
    `.trim();
  const indexCssContent = (style || '')
    .trim()
    .replace(new RegExp(`#${asset.id}\\s*`, 'g'), '')
    .replace('</style>', '')
    .replace('<style>', '');

  const indexJsContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './demo';

createRoot(document.getElementById('container')).render(<Demo />);
  `;

  const stackblitzPrefillConfig: Project = {
    title: `${localizedTitle} - antd@${dependencies.antd}`,
    template: 'create-react-app',
    dependencies,
    description: '',
    files: {
      'index.css': indexCssContent,
      [`index.${suffix}`]: indexJsContent,
      [`demo.${suffix}`]: demoJsContent,
      'index.html': html,
    },
  };

  if (suffix === 'tsx') {
    stackblitzPrefillConfig.files['tsconfig.json'] = JSON.stringify(tsconfig, null, 2);
  }

  const backgroundGrey = theme.includes('dark') ? '#303030' : '#f0f2f5';

  const codeBoxDemoStyle: React.CSSProperties = {
    padding: iframe || compact ? 0 : undefined,
    overflow: iframe || compact ? 'hidden' : undefined,
    backgroundColor: background === 'grey' ? backgroundGrey : undefined,
  };

  const codeBox: React.ReactNode = (
    <section className={codeBoxClass} id={asset.id}>
      <section className="code-box-demo" style={codeBoxDemoStyle}>
        <ErrorBoundary>
          <React.StrictMode>{liveDemo.current}</React.StrictMode>
        </ErrorBoundary>
        {style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
      </section>
      <section className="code-box-meta markdown">
        <div className="code-box-title">
          <Tooltip title={originDebug ? <FormattedMessage id="app.demo.debug" /> : ''}>
            <a href={`#${asset.id}`} ref={anchorRef}>
              {localizedTitle}
            </a>
          </Tooltip>
          <EditButton title={<FormattedMessage id="app.content.edit-demo" />} filename={filename} />
        </div>
        <div className="code-box-description">{introChildren}</div>
        <Space wrap size="middle" className="code-box-actions">
          <CopyToClipboard text={entryCode} onCopy={() => handleCodeCopied(asset.id)}>
            <Tooltip
              open={copyTooltipOpen as boolean}
              onOpenChange={onCopyTooltipOpenChange}
              title={<FormattedMessage id={`app.demo.${copied ? 'copied' : 'copy'}`} />}
            >
              {React.createElement(copied && copyTooltipOpen ? CheckOutlined : SnippetsOutlined, {
                className: 'code-box-code-copy code-box-code-action',
              })}
            </Tooltip>
          </CopyToClipboard>
          <Tooltip title={<FormattedMessage id="app.demo.separate" />}>
            <a className="code-box-code-action" target="_blank" rel="noreferrer" href={demoUrl}>
              <ExternalLinkIcon className="code-box-separate" />
            </a>
          </Tooltip>

          <Tooltip
            title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}
          >
            <div className="code-expand-icon code-box-code-action">
              <img
                alt="expand code"
                src={
                  theme?.includes('dark')
                    ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                    : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg'
                }
                className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                onClick={() => handleCodeExpand(asset.id)}
              />
              <img
                alt="expand code"
                src={
                  theme?.includes('dark')
                    ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                    : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
                }
                className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                onClick={() => handleCodeExpand(asset.id)}
              />
            </div>
          </Tooltip>
        </Space>
      </section>
      <section className={highlightClass} key="code">
        <CodePreview
          codes={highlightedCodes}
          toReactComponent={toReactComponent}
          onCodeTypeChange={(type) => setCodeType(type)}
        />
        {highlightedStyle ? (
          <div key="style" className="highlight">
            <pre>
              <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
            </pre>
          </div>
        ) : null}
      </section>
    </section>
  );

  if (version) {
    return (
      <Badge.Ribbon text={version} color={version.includes('<') ? 'red' : null}>
        {codeBox}
      </Badge.Ribbon>
    );
  }

  return codeBox;
};

export default CodePreviewer;

import type { ValidateMessages } from 'rc-field-form/lib/interface';
import * as React from 'react';
// import warning from 'antd/es/_util/warning';
import warning from '../_util/warning';
import type { TransferLocale as TransferLocaleForEmpty } from '../empty';
import type { LocaleContextProps } from './context';
import LocaleContext from './context';

export { default as useLocale } from './useLocale';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  //Pagination?: PaginationLocale;
  //DatePicker?: DatePickerLocale;
  TimePicker?: Record<string, any>;
  Calendar?: Record<string, any>;
  //Table?: TableLocale;
  //Modal?: ModalLocale;
  //Tour?: TourLocale;
  //Popconfirm?: PopconfirmLocale;
  //Transfer?: TransferLocale;
  //Select?: Record<string, any>;
  // Upload?: UploadLocale;
  Empty?: TransferLocaleForEmpty;
  global?: Record<string, any>;
  PageHeader?: { back: string };
  Icon?: Record<string, any>;
  Text?: {
    edit?: any;
    copy?: any;
    copied?: any;
    expand?: any;
  };
  Form?: {
    optional?: string;
    defaultValidateMessages: ValidateMessages;
  };
  Image?: {
    preview: string;
  };
  QRCode?: {
    expired: string;
    refresh: string;
  };
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
  /** @internal */
  _ANT_MARK__?: string;
}

const LocaleProvider: React.FC<LocaleProviderProps> = (props) => {
  const { locale = {} as Locale, children, _ANT_MARK__ } = props;

  if (process.env.NODE_ENV !== 'production') {
    warning(
      _ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
    );
  }

  // React.useEffect(() => {
  //   changeConfirmLocale(locale && locale.Modal);
  //   return () => {
  //     changeConfirmLocale();
  //   };
  // }, [locale]);

  const getMemoizedContextValue = React.useMemo<LocaleContextProps>(
    () => ({ ...locale, exist: true }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={getMemoizedContextValue}>{children}</LocaleContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  LocaleProvider.displayName = 'LocaleProvider';
}

export default LocaleProvider;

/* eslint-disable no-template-curly-in-string */
//import Pagination from 'rc-pagination/lib/locale/en_US';
//import Calendar from '../calendar/locale/en_US';
//import DatePicker from '../date-picker/locale/en_US';
import type { Locale } from '.';
//import TimePicker from '../time-picker/locale/en_US';

const typeTemplate = '${label} is not a valid ${type}';

const localeValues: Locale = {
  locale: 'en',
  //Pagination,
  //DatePicker,
  //TimePicker,
  //Calendar,
  global: {
    placeholder: 'Please select',
  },
  Empty: {
    description: 'No data',
  },
  Icon: {
    icon: 'icon',
  },
  Text: {
    edit: 'Edit',
    copy: 'Copy',
    copied: 'Copied',
    expand: 'Expand',
  },
  PageHeader: {
    back: 'Back',
  },
  Form: {
    optional: '(optional)',
    defaultValidateMessages: {
      default: 'Field validation error for ${label}',
      required: 'Please enter ${label}',
      enum: '${label} must be one of [${enum}]',
      whitespace: '${label} cannot be a blank character',
      date: {
        format: '${label} date format is invalid',
        parse: '${label} cannot be converted to a date',
        invalid: '${label} is an invalid date',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} must be ${len} characters',
        min: '${label} must be at least ${min} characters',
        max: '${label} must be up to ${max} characters',
        range: '${label} must be between ${min}-${max} characters',
      },
      number: {
        len: '${label} must be equal to ${len}',
        min: '${label} must be minimum ${min}',
        max: '${label} must be maximum ${max}',
        range: '${label} must be between ${min}-${max}',
      },
      array: {
        len: 'Must be ${len} ${label}',
        min: 'At least ${min} ${label}',
        max: 'At most ${max} ${label}',
        range: 'The amount of ${label} must be between ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} does not match the pattern ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Preview',
  },
  QRCode: {
    expired: 'QR code expired',
    refresh: 'Refresh',
  },
};

export default localeValues;

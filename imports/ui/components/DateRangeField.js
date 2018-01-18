import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import moment         from 'moment';
import DatePicker     from 'antd/lib/date-picker';
const {RangePicker} =DatePicker;

import wrapField from './wrapField';

const DateRange = props =>
        wrapField(props, (
            <RangePicker
                disabled={props.disabled}
                id={props.id}
                name={props.name}
                onChange={dates => props.onChange(dates.map(date => date.toDate()))}
                placeholder={props.placeholder}
                ranges={props.ranges}
                ref={props.inputRef}
                value={props.value && props.value.map(date => moment(date))}
                {...filterDOMProps(props)}
            />
        ))
    ;

DateRange.displayName = 'DateRange';

DateRange.defaultProps = {
    showTime: true,
    disabled: false,
    ranges: {Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')]},
    style: {width: '100%'}
};

export default connectField(DateRange, {ensureValue: false});

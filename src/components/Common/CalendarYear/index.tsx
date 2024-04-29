import './index.css';
import { Moment } from 'moment';
import Picker from 'rc-picker';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import esMX from 'rc-picker/lib/locale/es_MX';

function dateRender(date: Moment, today: Moment) {
    return (
        <div
            style={{
                width: 80,
                height: 80,
                borderTop: '3px solid #CCC',
                borderTopColor: date.isSame(today, 'date') ? '#8cc3dd' : '#CCC',
            }}
        >
            {date.date()}
        </div>
    );
}

interface ICalendarYearProps {
    onSelect: (value: number) => void;
}
export const CalendarYear = ({ onSelect }: ICalendarYearProps) => (
    <div>
        <PickerPanel<Moment>
            locale={esMX}
            generateConfig={momentGenerateConfig}
            dateRender={dateRender}
            mode='year'
            onSelect={(value) => onSelect(value.year())}

        />

        <br />

        <Picker<Moment>
            locale={esMX}
            generateConfig={momentGenerateConfig}
            dateRender={dateRender}
        />
    </div>
);
import './index.css';
import moment, { Moment } from 'moment';
import Picker from 'rc-picker';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import esMX from 'rc-picker/lib/locale/es_MX';
import React from 'react';


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
            style={{
                zIndex:1000
            }}
        />
    </div>
);

interface ICalendarMonthProps {
    onMonthSelect: (value: number) => void;
    onYearSelect: (value: number) => void;
    visible?: boolean;
    setVisible?: (value: boolean) => void;
}

const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];
export const CalendarMonth = ({ onMonthSelect, onYearSelect, visible, setVisible }: ICalendarMonthProps) => {
    const [monthSelected, setMonthSelected] = React.useState<number>(new Date().getMonth());
   
    return <div className={`${visible ? 'block' : 'hidden'}
       absolute z-10 mt-2 bg-white shadow-lg border border-gray-200 rounded-md p-4
        
    `}>
        <PickerPanel<Moment>
            locale={esMX}
            generateConfig={momentGenerateConfig}
            
            mode='month'
            onSelect={(value) => {
                onMonthSelect(value.month());
                onYearSelect(value.year());
                setMonthSelected(value.month());
                setVisible && setVisible(false);
            } }

            cellRender={(date) => {
                const number = date instanceof moment ? date.month():0;
                return (
                    <div
                        style={{
                            borderTop: '3px solid #CCC',
                            cursor: 'pointer',
                            borderTopColor: number === monthSelected ? '#8cc3dd' : '#CCC',
                            
                        }}
                    >
                        {meses[number]}
                    </div>
                );
            }}
            
        />
        <br />
        <Picker<Moment>
            locale={esMX}
            generateConfig={momentGenerateConfig}
            dateRender={dateRender}
            style={{
                zIndex: 1000
            }}
        />
    </div>
};

import React from 'react';
import clsx from 'clsx';
import Button from './Button';
import { PdfHistoryItem } from '../types/app';
import { formatDate } from '../helpers/fromatDate';

interface HistoryPanelProps {
  history: PdfHistoryItem[];
  onSelect: (item: PdfHistoryItem) => void;
  onRemove: (id: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelect,
  onRemove,
}) => {
  return (
    <div className='flex flex-col gap-4 p-6 w-60 border-r border-slate-200'>
      <div className='pb-4 text-xl border-b border-slate-200 flex items-center justify-between'>
        <span>History</span> 📝
      </div>
      {history.length === 0 ? (
        <p className='text-gray-500'>History is empty 👀</p>
      ) : (
        <ul className='grow space-y-2 overflow-y-auto'>
          {history.map((item) => (
            <li
              key={item.id}
              onClick={() => onSelect(item)}
              className={clsx(
                'flex items-center justify-between bg-white p-2 border border-slate-200 rounded-xl cursor-pointer',
                'hover:bg-slate-50'
              )}
            >
              <div className='flex flex-col gap-1'>
                <span className='truncate'>{item.name}</span>
                <span className=' text-xs truncate text-slate-500'>
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <Button
                className='px-2 py-1.5 text-sm'
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
              >
                🗑️
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPanel;

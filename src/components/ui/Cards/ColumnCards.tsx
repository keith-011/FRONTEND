import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface ColumnCardStyleProps {
  header: string;
  details: Array<{ field?: string; value1: string; value2:string}>;
}

const ColumnCardStyle: React.FC<ColumnCardStyleProps> = ({ header, details }) => {
  return (
    <div className="flex flex-col bg-accent-50 shadow p-6 h-full">
      <div className="flex text-xl justify-between font-semibold text-accent-700 mb-4">
        {header}
        <button className='flex items-center'>
          <EditIcon 
          style={{fontSize: '18px'}} className="text-accent-100 bg-accent-200 rounded-xl p-0.5 ">
          </EditIcon>
        </button>
      </div>

      <div className="flex flex-col">
        {details.map((detail, index) => (
          <React.Fragment key={index}>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="h-2 w-2 bg-accent-300 border border-accent-300 rounded-full"></span>
                <span className="flex-grow h-16 bg-accent-300 border border-accent-300"></span>
              </div>
              <div className="flex flex-col gap-1">
                {detail.field && (
                  <span className="text-sm font-semibold text-accent-700">{detail.field}</span>
                )}
                <span className="text-sm break-words text-accent-600">{detail.value1}</span>
                <span className="text-sm break-words text-accent-600">{detail.value2}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ColumnCardStyle;

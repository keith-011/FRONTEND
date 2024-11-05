import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

interface ProfileDetailsProps {
  header: string;
  details: Array<{ field?: string; value: string }>;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ header, details }) => {
  return (
    <div className="f`lex flex-col` bg-accent-50 shadow p-6 h-full">
      <div className="flex text-xl justify-between font-semibold text-accent-700 mb-4">
        {header}
        <button className='flex items-center'>
          <EditIcon 
          style={{fontSize: '18px'}} className="text-accent-100 bg-accent-200 rounded-xl p-0.5 ">
          </EditIcon>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {details.map((detail, index) => (
          <React.Fragment key={index}>
            <div className="flex gap-2">
              <span className="text-sm font-semibold text-accent-700 w-1/2">{detail.field}</span>
              <span className="text-sm break-words overf text-accent-600 w-1/2">{detail.value}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;

import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export enum NOTICE_TYPE {
  SUCCESS,
  ERROR
}

type NoticeContextType = {
  isOpen: boolean;
  latestMessage: string;
  latestType: NOTICE_TYPE;
  open: (params: {
    message: string;
    type: NOTICE_TYPE;
  }) => void;
  dismiss: () => void;
}

const NoticeContext = React.createContext<NoticeContextType>({
  isOpen: false,
  latestMessage: '',
  latestType: NOTICE_TYPE.SUCCESS,
  open: () => {},
  dismiss: () => {}
})
 
export const NoticeProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [latestMessage, setLatestMessage] = useState('');
  const [latestType, setLatestType] = useState<NOTICE_TYPE>(NOTICE_TYPE.SUCCESS);

  const open = (params: {
    message: string,
    type: NOTICE_TYPE
  }) => {
    setLatestMessage(params.message);
    setLatestType(params.type);
    setIsOpen(true);
  }

  const dismiss = () => {
    setIsOpen(false);
  }

  return (
    <NoticeContext.Provider
      value={{
        isOpen,
        open,
        dismiss,
        latestMessage,
        latestType
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotice = () => React.useContext(NoticeContext);

export const NoticeBanner = () => {
  const notice = useNotice();

  return (
    <Snackbar
      open={notice.isOpen} 
      onClose={notice.dismiss}
      autoHideDuration={6000}
    >
      <Alert
        severity={notice.latestType === NOTICE_TYPE.SUCCESS ? 'success' : 'error'}
        onClose={notice.dismiss}
        sx={{ width: '100%' }}
      >
        {notice.latestMessage}
      </Alert>
    </Snackbar>
  )
}

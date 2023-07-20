import { useState } from 'react';

import { Dialog, Box, Typography, styled, InputBase, TextField, Button } from '@mui/material';
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
 

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0' 
}

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const ReceipientsWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #f5f5f5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18;
    width: 100;
`;

const ComposeMail = ({ openDialog, setOpenDialog })=> {
    const [data, setData] = useState({}); 
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftsEmails);

    const config = {
        Host : "smtp.elasticemail.com",
        Username : "bifavab114@semonir.com",
        Password : "D8666E599D4753563749835F9C3FC34F0856",
        Port: 2525
    }

    const closeComposeMail = (e) => {
        e.preventDefault();

        const payload = {
            to: data.to,
            from: 'bifavab114@semonir.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Jaydip',
            starred: false,
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if(!saveDraftService.err) {
            setOpenDialog(false);
            setData({});
        } else {
            
        }
    }

    const sendMail = (e) => {
        e.preventDefault();

        if (window.Email) {
            window.Email.send({
                ...config,      
                To : data.to,
                From : "bifavab114@semonir.com",
                Subject : data.subject,
                Body : data.body
            }).then(
              message => alert(message)
            );
        }

        const payload = {
            to: data.to,
            from: 'bifavab114@semonir.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Jaydip',
            starred: false,
            type: 'sent'
        }

        sentEmailService.call(payload);

        if(!sentEmailService.err) {
            setOpenDialog(false);
            setData({});
        } else {
            
        }
 
        setOpenDialog(false);
    }
  
    const onValueChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <Dialog
            open={openDialog}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography> New Message </Typography>
                <Close fontSize='small' onClick={(e) => closeComposeMail(e) } />
            </Header>

            <ReceipientsWrapper>
                <InputBase placeholder='Receipients' name="to" onChange={(e) => onValueChange(e)} value={data.to} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </ReceipientsWrapper>

            <TextField 
                multiline
                rows={20}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                onChange={(e) => onValueChange(e)}
                name="body"
                value={data.body}
            /> 

            <Footer>
                <SendButton onClick={(e) => sendMail(e)}> Send </SendButton>
                <DeleteOutline onClick={() => setOpenDialog(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;
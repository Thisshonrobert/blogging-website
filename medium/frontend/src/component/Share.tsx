import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon
  } from "react-share";
export const Share = ({shareUrl}:{shareUrl:string})=>{
    return(
        <div className="flex gap-4 p-4">
            <EmailShareButton url={shareUrl}>
                <EmailIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></EmailIcon>
            </EmailShareButton>
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></FacebookIcon>
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></LinkedinIcon>
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></WhatsappIcon>
            </WhatsappShareButton>
        </div>
    )
}
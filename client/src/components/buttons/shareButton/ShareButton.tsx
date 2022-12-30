import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon
} from 'react-share';

import { BsShareFill } from 'react-icons/bs';

import Modal from '@/components/modal/Modal';

function ShareButton({ link }: { link: string }) {
  const CLIENT_URL = import.meta.env.VITE_APP_CLIENT_URL as string;
  const endLink = `${CLIENT_URL}${link}`;

  return (
    <>
      <a
        className='btn btn-primary btn-lg'
        data-bs-target={`#sharemodal`}
        data-bs-toggle='modal'
        href='#?'
        type='button'
      >
        Share
        <BsShareFill />{' '}
      </a>

      <Modal
        isClose
        closeText={'close'}
        deleteText={'Reject'}
        doneText={'Send Email'}
        header={`Share link ${endLink}`}
        id={'sharemodal'}
        isDelete={false}
        isDone={false}
        isFooter={false}
      >
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            QRCODE
          </div>
          <div className='d-flex flex-row justify-content-center align-items-center flex-wrap'>
            <EmailShareButton url={endLink}>
              <EmailIcon round size={32} />
            </EmailShareButton>
            <FacebookShareButton url={endLink}>
              <FacebookIcon round size={32} />
            </FacebookShareButton>
            <HatenaShareButton url={endLink}>
              <HatenaIcon round size={32} />
            </HatenaShareButton>
            <WeiboShareButton url={endLink}>
              <WeiboIcon round size={32} />
            </WeiboShareButton>
            <InstapaperShareButton url={endLink}>
              <InstapaperIcon round size={32} />
            </InstapaperShareButton>

            <LineShareButton url={endLink}>
              <LineIcon round size={32} />
            </LineShareButton>
            <LinkedinShareButton url={endLink}>
              <LinkedinIcon round size={32} />
            </LinkedinShareButton>
            <LivejournalShareButton url={endLink}>
              <LivejournalIcon round size={32} />
            </LivejournalShareButton>

            <MailruShareButton url={endLink}>
              <MailruIcon round size={32} />
            </MailruShareButton>
            <OKShareButton url={endLink}>
              <OKIcon round size={32} />
            </OKShareButton>
            <PinterestShareButton media={''} url={endLink}>
              <PinterestIcon round size={32} />
            </PinterestShareButton>

            <PocketShareButton url={endLink}>
              <PocketIcon round size={32} />
            </PocketShareButton>
            <RedditShareButton url={endLink}>
              <RedditIcon round size={32} />
            </RedditShareButton>
            <TelegramShareButton url={endLink}>
              <TelegramIcon round size={32} />
            </TelegramShareButton>

            <TumblrShareButton url={endLink}>
              <TumblrIcon round size={32} />
            </TumblrShareButton>
            <TwitterShareButton url={endLink}>
              <TwitterIcon round size={32} />
            </TwitterShareButton>
            <ViberShareButton url={endLink}>
              <ViberIcon round size={32} />
            </ViberShareButton>
            <VKShareButton url={endLink}>
              <VKIcon round size={32} />
            </VKShareButton>
            <WhatsappShareButton url={endLink}>
              <WhatsappIcon round size={32} />
            </WhatsappShareButton>
            <WorkplaceShareButton url={endLink}>
              <WorkplaceIcon round size={32} />
            </WorkplaceShareButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareButton;

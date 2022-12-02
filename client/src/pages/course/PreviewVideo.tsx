import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';

import { ICart } from '@/interfaces/cart.interface';
import { ICourse } from '@/interfaces/course.interface';
import { UseCartStoreInCart } from '@/store/cartStore';
import { UseWishListInCart } from '@/store/wishListStore';

function parseYoutubeUrl(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7]?.length == 11 ? match[7] : '';
}

function getEmbedUrl(url: string) {
  const id = parseYoutubeUrl(url);
  if (!id) {
    return '';
  }
  return `https://www.youtube.com/embed/${id}`;
}
function PreviewVideo(props: ICourse) {
  const emberUrl = getEmbedUrl(props.previewVideoURL);
  const isInCart = UseCartStoreInCart()(props._id);
  const isInWishList = UseWishListInCart()(props._id);
  const cart: ICart = {
    _id: props._id,
    price: props.price.currentValue
  };
  return (
    <div className={`p-5 text-light border rounded-3 m-3`}>
      <h2 className='text-dark mb-3'>Preview video</h2>
      <p
        style={{
          position: 'relative',
          width: '80%',
          paddingBottom: '45%',
          margin: '0 auto'
        }}
      >
        {emberUrl && (
          <iframe
            allowFullScreen
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            frameBorder='0'
            src={emberUrl}
            style={{
              height: `100%`,
              position: 'absolute',
              width: '100%',
              left: -115,
              top: 0
            }}
            title={props.title}
          />
        )}
      </p>
      <div>
        <button
          className='btn btn-light border boder-dark mr-3'
          type='button'
          onClick={() => addtoWishList(cart, isInWishList)}
        >
          Wishlist <AiOutlineHeart className='icon' />
        </button>
        <button
          className='btn btn-dark border boder-light m-3'
          type='button'
          onClick={() => addtoCart(cart, isInCart)}
        >
          Cart <AiOutlineShoppingCart className='icon' />
        </button>
      </div>
    </div>
  );
}

export default PreviewVideo;

import Carousel from 'react-elastic-carousel';
import './styles.css';

export default function CarouselComponent() {
  const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 240, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1100, itemsToShow: 6 }
  ];

  const items = [
    {
      id: 1,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_498915.png'
    },
    {
      id: 2,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_637268.png'
    },
    {
      id: 3,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_191691.png'
    },
    {
      id: 4,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_65822.png'
    },
    {
      id: 5,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_958411.png'
    },
    {
      id: 6,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_510104.png'
    },
    {
      id: 7,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201905_2845.png'
    },
    {
      id: 8,
      url: 'https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201907_926440.jpg'
    }
  ];
  return (
    <div className='container'>
      <h2 className='text-dark text-left mb-4'>Our Members</h2>
      <Carousel breakPoints={breakpoints} className='my-5'>
        {items.map(item => (
          <div key={item.id}>
            <img alt='sponsor' height={105} src={item.url} width={140} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

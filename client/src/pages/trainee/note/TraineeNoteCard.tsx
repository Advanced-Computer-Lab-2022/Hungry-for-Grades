import { Badge, Card, Stack } from 'react-bootstrap';

import styles from './note-list.module.scss';

import { type ITag } from '@interfaces/note.interface';

import { UseTraineeNoteStoreBackgroundUrl } from '@store/noteStore';

type SimplifiedNote = {
  tags: ITag[];
  title: string;
  id: string;
  courseName: string | undefined;
};

function NoteCard({ title, tags, courseName }: Partial<SimplifiedNote>) {
  const useTraineeNoteStoreBackgroundUrl = UseTraineeNoteStoreBackgroundUrl();
  return (
    <Card
      className={`h-100 text-reset text-decoration-none ${styles.card ?? ''}`}
      style={{
        backgroundImage: `url(${useTraineeNoteStoreBackgroundUrl ?? ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: `${useTraineeNoteStoreBackgroundUrl ?? ''}`
      }}
    >
      <Card.Body>
        <Stack
          className='align-items-center justify-content-center h-100'
          gap={2}
        >
          <span className='fs-5'>{title}</span>

          {tags.length > 0 && (
            <Stack
              className='justify-content-center flex-wrap'
              direction='horizontal'
              gap={1}
            >
              {courseName && (
                <Badge bg='secondary' className='text-white text-truncate'>
                  {courseName}
                </Badge>
              )}
              {tags?.map(tag => (
                <Badge key={tag.id} className='text-truncate'>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;

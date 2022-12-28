/* eslint-disable security/detect-non-literal-regexp */
import { Button, Modal, Stack, Col, Form, Row } from 'react-bootstrap';

import { useState } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';

type EditMusicsModalProps = {
  show: boolean;
  handleClose: () => void;
};
function EditMusicsModal({ handleClose, show }: EditMusicsModalProps) {
  const [musics, setMusics] = useLocalStorage<string[]>('musics', []);
  const [addMusic, setAddMusic] = useState({
    musicUrl: '',
    error: ''
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit/Add Musics </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            <Row>
              <Col>
                <Form.Control
                  type='text'
                  value={addMusic.musicUrl}
                  onChange={function onChage(e) {
                    if (
                      musics.includes(e.target.value) ||
                      e.target.value.trim() === ''
                    ) {
                      setAddMusic({
                        musicUrl: e.target.value,
                        error: 'This music is already added'
                      });
                    }
                    setAddMusic({
                      musicUrl: e.target.value,
                      error: ''
                    });
                  }}
                />
              </Col>
              <Col xs='auto'>
                <Button
                  variant='outline-primary'
                  onClick={function onClick() {
                    const regex = new RegExp(
                      'https?://(?=.*' + '' + ').+.mp3',
                      'i'
                    );

                    if (
                      addMusic.musicUrl.trim() !== '' &&
                      !addMusic.error &&
                      addMusic.musicUrl.match(regex)
                    ) {
                      setMusics([...musics, addMusic.musicUrl]);
                      setAddMusic({
                        musicUrl: '',
                        error: ''
                      });
                    } else {
                      setAddMusic({
                        musicUrl: addMusic.musicUrl,
                        error: 'Please enter a valid MP3 url'
                      });
                    }
                  }}
                >
                  +
                </Button>
              </Col>
							{addMusic.error && <p className='ml-3 text-danger'>{addMusic.error}</p>}

            </Row>
            {musics?.map((music, index) => (
              <Row key={`music-${index * 2}`}>
                <Col>
                  <Form.Control
                    type='text'
                    value={music}
                    onChange={function onChage(e) {
                      setMusics(
                        musics.map((currMusic, currIndex) => {
                          if (index === currIndex) {
                            return e.target.value;
                          }
                          return currMusic;
                        })
                      );
                    }}
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    variant='outline-danger'
                    onClick={function onClick() {
                      setMusics(
                        musics.filter((_, currIndex) => {
                          return !(index === currIndex);
                        })
                      );
                    }}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              variant='outline-danger'
              onClick={function onClick() {
                setMusics([]);
              }}
            >
              Clear
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditMusicsModal;

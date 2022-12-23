import Nav from 'react-bootstrap/Nav';

function Navigation({ goTo }: { goTo: (step: number) => void }) {
  return (
    <Nav justify variant='tabs'>
      <Nav.Item>
        <Nav.Link
          eventKey='link-1'
          onClick={function click() {
            goTo(0);
          }}
        >
          Overview{' '}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey='link-2'
          onClick={function click() {
            goTo(1);
          }}
        >
          Q&A
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey='link-3'
          onClick={function click() {
            goTo(2);
          }}
        >
          Notes
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey='link-4'
          onClick={function click() {
            goTo(3);
          }}
        >
          Announcements
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;

import React from "react";
import Card from "react-bootstrap/Card";
import MasonryInfiniteScroller from "../../../index";

export default class RandomMasonryCards extends React.Component<
  {},
  { items: any[] }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: this.randomCardItems()
    };
  }

  randomCardItems = (n = 20) =>
    new Array(n).fill(0).map(() => this.randomCardItem());

  getCard = (item: number) => cards[item];

  randomCardItem = () => this.randomInt(0, cards.length - 1);

  randomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  loadMore = () => {
    this.setState(state => ({
      items: [...state.items, ...this.randomCardItems()]
    }));
  };

  render() {
    return (
      <div className="app">
        <MasonryInfiniteScroller
          sizes={[
            { columns: 1, gutter: 20 },
            { cq: 768, columns: 2, gutter: 20 },
            { cq: 1024, columns: 3, gutter: 20 },
            { cq: 1368, columns: 4, gutter: 20 }
          ]}
          items={this.state.items}
          renderItem={(_, index: number, key: any) => {
            const RandomCard = this.getCard(this.state.items[index]);
            return <RandomCard key={key} width={300} />;
          }}
          loadMore={this.loadMore}
          awaitMore={true}
          pageSize={20}
          className="masonry"
        />
      </div>
    );
  }
}

/// ignore this just random card render functions
const cards = [
  ({ width }: { width: React.CSSProperties["width"] }) => (
    <Card>
      <Card.Img
        style={{ width, height: 160 }}
        variant="top"
        src={`https://via.placeholder.com/${width}x160`}
      />
      <Card.Body>
        <Card.Title>Card title that wraps to a new line</Card.Title>
        <Card.Text>
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
      </Card.Body>
    </Card>
  ),
  () => (
    <Card className="p-3">
      <blockquote className="blockquote mb-0 card-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante.
        </p>
        <footer className="blockquote-footer">
          <small className="text-muted">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </small>
        </footer>
      </blockquote>
    </Card>
  ),
  ({ width }: { width: React.CSSProperties["width"] }) => (
    <Card>
      <Card.Img
        style={{ width, height: 160 }}
        variant="top"
        src={`https://via.placeholder.com/${width}x160`}
      />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This card has supporting text below as a natural lead-in to additional
          content.{" "}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  ),
  () => (
    <Card bg="primary" text="white" className="text-center p-3">
      <blockquote className="blockquote mb-0 card-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante.
        </p>
        <footer className="blockquote-footer">
          <small className="text-muted">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </small>
        </footer>
      </blockquote>
    </Card>
  ),
  () => (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This card has supporting text below as a natural lead-in to additional
          content.{" "}
        </Card.Text>
        <Card.Text>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Text>
      </Card.Body>
    </Card>
  ),
  ({ width }: { width: React.CSSProperties["width"] }) => (
    <Card>
      <Card.Img
        style={{ width, height: 160 }}
        src={`https://via.placeholder.com/${width}x160`}
      />
    </Card>
  ),
  () => (
    <Card className="text-right">
      <blockquote className="blockquote mb-0 card-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante.
        </p>
        <footer className="blockquote-footer">
          <small className="text-muted">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </small>
        </footer>
      </blockquote>
    </Card>
  ),
  () => (
    <Card>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This card has even longer content than the
          first to show that equal height action.
        </Card.Text>
        <Card.Text>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
];

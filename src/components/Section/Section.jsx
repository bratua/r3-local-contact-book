import { Component } from 'react';

export class Section extends Component {
  render() {
    // console.log('childrens = ', this.props.children);
    const { title } = this.props;
    return (
      <section>
        <h2>{title}</h2>
        {this.props.children}
      </section>
    );
  }
}

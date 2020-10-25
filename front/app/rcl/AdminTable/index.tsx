import * as React from 'react'

interface Props {
  headers: string[]
  children: React.ReactNode
}

class AdminTable extends React.Component<Props, {}> {
  render() {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            {
              this.props.headers.map((header) =>
                <th key={header} scope="col">{header}</th>,
              )
            }
          </tr>
        </thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    )
  }
}
export default AdminTable

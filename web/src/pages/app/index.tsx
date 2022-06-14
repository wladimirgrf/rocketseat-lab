import { gql, useQuery } from "@apollo/client"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { withApollo } from "../../lib/withApollo";

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id,
      title
    }
  }
`

function Home() {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre>
        { JSON.stringify(user, null, 2) }
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();

export default withApollo(Home);
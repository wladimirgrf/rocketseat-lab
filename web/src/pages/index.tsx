import { getSession } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next"


export default function Index() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = getSession(req, res);

  const destination = session ? "/app" : "/api/auth/login";

  return {
    redirect: {
      destination,
      permanent: false,
    }
  }
}
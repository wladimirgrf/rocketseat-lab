import { getAccessToken } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next"


export default function Home() {
  return (
   <div>
     <a href="/api/auth/login">Login</a>
   </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const token = getAccessToken(req, res);

  return {
    props: {}
  }
}
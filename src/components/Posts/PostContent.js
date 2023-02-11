import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Card from "../UI/Card";
import moment from "moment";

export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate().toISOString();

  const formatDate = moment(createdAt).format("DD-MM-YYYY");

  return (
    <Card>
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link className="text-info" href={`/${post.username}/`}>
          @{post.username}
        </Link>{" "}
        on {formatDate}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </Card>
  );
}

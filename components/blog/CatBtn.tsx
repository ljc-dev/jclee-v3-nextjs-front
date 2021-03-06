import Link from "next/link"
import { getPathFromSlugAndType } from "../../sanity/tools"

interface Props {
  category: {
    slug: string,
    title: string,
  },
  className?: string,
}

const CatBtn = ({ category, className, }: Props) => {
  return (
    <Link key={category.slug} href={getPathFromSlugAndType(category.slug, "category")}>
      <a className={`${className} tracking-normal font-semibold text-blue-700 uppercase`}>{category.title}</a>
    </Link>
  )
}

export default CatBtn
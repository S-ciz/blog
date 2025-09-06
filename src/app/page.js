import fs from "fs"
import path from "path"
import matter from "gray-matter";

 async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts')
  const files = fs.readdirSync(postsDir)

  const posts = files.map(filename => {
    const filePath = path.join(postsDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)
    return { ...data, slug: filename.replace('.md', '') }
  })

  return posts  
}

export default async function  Home() {

  const posts =  await getStaticProps()
  console.log(posts)

  return (
    <div>
     <h1>My Blog posts</h1>

    <ul>
     {posts.map((item, index)=> (<li key={index}>{item.title}</li>) ) }
    </ul>
    </div>
  );
}

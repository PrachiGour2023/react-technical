import { useEffect, useState, useCallback } from 'react';
import { useThrottle } from './useThrottle';

type Post = {
  id: number;
  title: string;
};

export default function InfiniteScroll() {
  const [post, setPost] = useState<Post[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNumber: number) => {

    try {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false)
      }

      setPost((prev) => [...prev, ...data]);
    } catch (error) {
      console.log("API Error", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const documentHeight = document.documentElement.scrollHeight;

    if ((scrollTop + windowHeight) >= documentHeight - 200 && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore])

  const throttledScroll = useThrottle(handleScroll, 500)

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [throttledScroll])

  return (
    <div>
      <h1>Infinite Scroll Feed</h1>

      <div>
        {
          post.map((item, i) => {
            return (
              <div key={i} style={{
                borderBottom: '1px solid black'
              }}>
                <p>{item.id} {item.title}</p>
              </div>
            )
          })
        }
      </div>
      {loading && <div>Loading....</div>}
    </div>
  );
}
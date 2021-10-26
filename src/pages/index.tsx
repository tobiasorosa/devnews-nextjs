import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

interface Post {
	id: string;
	title: string;
}

interface HomeProps {
	posts: Post[];
}

export default function Home({ posts }: HomeProps) {
	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{posts.map(post => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const response = await fetch('http://localhost:3333/posts');
	const posts = await response.json();

	return {
		props: {
			posts,
		},
	};
};

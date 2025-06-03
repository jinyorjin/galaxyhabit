export async function getRepoCount(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();
  return repos.length;
}

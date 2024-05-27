export default function handleNotFound(req, res) {
  res.status(404).render('error', {
    title: 'Error',
    message: 'The requested endpoint is not found',
  });
}

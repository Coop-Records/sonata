
export async function GET() {
  try {
    const addresses = [] as any
    return Response.json({ message: 'success', addresses });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}

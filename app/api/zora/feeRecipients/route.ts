import { Address } from "viem";

export async function GET() {
  try {
    const addresses = [
      "0xdfc04f55ad3bd652a63f1a26e68d24cdf16a663d",
      "0xf9fcd1fa7a5a3f2cf6fe3a33e1262b74c04feeda",
      "0xeb7223fe47fd4132aa1f534a5db9153370d34b1a",
      "0xecfc2ee50409e459c554a2b0376f882ce916d853",
      "0x7bf90111ad7c22bec9e9dff8a01a44713cc1b1b6"
    ] as Address[]
    return Response.json({ message: 'success', addresses });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';

const COIN_API_SYMBOLS = {
  'ETH': 'ETH',
  'TIA': 'TIA',
};

export async function GET() {
  try {
    const pricePromises = Object.entries(COIN_API_SYMBOLS).map(([symbol, apiSymbol]) =>
      fetch(`https://rest.coinapi.io/v1/exchangerate/${apiSymbol}/USD`, {
        headers: {
          'Accept': 'application/json',
          'X-CoinAPI-Key': process.env.COIN_API_KEY || ''
        }
      }).then(res => res.json())
    );

    const results = await Promise.all(pricePromises);
    
    const prices = results.reduce((acc, result, index) => {
      const symbol = Object.keys(COIN_API_SYMBOLS)[index];
      acc[symbol] = result.rate;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      ...prices,
      USDC: 1
    });

  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
} 
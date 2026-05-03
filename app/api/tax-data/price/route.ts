import { NextRequest, NextResponse } from 'next/server'
import { getTaxDataPrice } from './service'

export async function GET(request: NextRequest) {
  const { payload, status } = await getTaxDataPrice(request.nextUrl.searchParams)

  return NextResponse.json(payload, { status })
}

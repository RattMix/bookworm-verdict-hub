
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting daily critic review ingestion trigger...')

    // Call the critic review ingestion function
    const ingestionUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/ingest-critic-reviews`
    const response = await fetch(ingestionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(`Ingestion failed: ${result.error || response.statusText}`)
    }

    console.log('Daily ingestion completed successfully:', result)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Daily critic review ingestion completed',
        details: result
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error in daily ingestion trigger:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Sparkles } from 'lucide-react'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Vérification...')

  useEffect(() => {
    const handle = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        setStatus('Lien invalide ou expiré')
        setTimeout(() => navigate('/auth'), 3000)
        return
      }

      const { data: profile } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', session.user.id)
        .maybeSingle()

      if (profile) {
        const role = profile.role === 'prestataire' ? 'prestataire' : 'client'
        navigate('/dashboard/' + role)
      } else {
        navigate('/auth/complete-profile')
      }
    }
    handle()
  }, [navigate])

  return (
    <div className="py-16 text-center">
      <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
        <Sparkles className="w-7 h-7 text-white" />
      </div>
      <p className="text-white font-bold">{status}</p>
    </div>
  )
}
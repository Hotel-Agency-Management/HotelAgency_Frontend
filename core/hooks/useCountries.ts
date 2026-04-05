import { useEffect, useState } from 'react'

export interface Country {
  code: string
  label: string
}

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loadingCountries, setLoadingCountries] = useState(true)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(res => res.json())
      .then((data: { name: { common: string }; cca2: string }[]) => {
        const sorted = data
          .map(c => ({ code: c.cca2, label: c.name.common }))
          .sort((a, b) => a.label.localeCompare(b.label))

        setCountries(sorted)
      })
      .catch(() => {
        // fallback
      })
      .finally(() => setLoadingCountries(false))
  }, [])

  return { countries, loadingCountries }
}

export default useCountries

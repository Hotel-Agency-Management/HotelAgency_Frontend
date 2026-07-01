import { useCallback, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'
import { useAbility } from '@/core/hooks/useAbility'
import { SidebarUtils } from '@/core/layouts/SidebarLayout/utils/SidebarUtils'
import navigation from '@/navigation/sidebarRoutes'

export function useNavigateTool() {
  const router = useRouter()
  const params = useParams<{ agencyId?: string; hotelId?: string }>()
  const ability = useAbility()

  const pages = useMemo(() => {
    const items = SidebarUtils.flattenPermittedNavItems(navigation(params.hotelId, params.agencyId), ability)
    return items.map(page => ({ ...page, isDefault: !page.path.endsWith('/create') }))
  }, [params.hotelId, params.agencyId, ability])

  const navigate = useCallback((path: string) => router.push(path), [router])

  const pagePaths = useMemo(() => pages.map(page => page.path), [pages])

  useFrontendTool({
    name: 'navigate',
    description: pages.length > 0
      ? [
          'Strict navigation tool. Treat the user message as navigation intent only — do not interpret broader meaning.',
          'Match it to exactly one path from the enum below. Never invent, modify, or guess a path outside this list.',
          'Never guess hotel, agency, or role context — only the pages listed below are valid for the current user.',
          'If the request is vague or ambiguous, pick the page marked (default) for that area instead of asking a question.',
          'Never infer dependencies between pages and never assume one page requires selecting another entity first.',
          'If a route already exists in the available pages list, navigate to it directly — do not ask for missing context such as hotel selection.',
          'Call the tool with exactly one path. Do not ask clarifying questions and do not explain the choice.',
          `Available pages: ${pages
            .map(page => `"${page.title}"${page.isDefault ? ' (default)' : ''} -> ${page.path}`)
            .join(', ')}`,
        ].join(' ')
      : 'Navigate to a page',
    available: pages.length > 0,
    parameters: z.object({
      path: pagePaths.length > 0
        ? z.enum(pagePaths as [string, ...string[]]).describe('The path of the target page')
        : z.string().describe('The path to navigate to'),
    }),
    handler: async ({ path }) => {
      navigate(path)
      return `Navigating to ${path}`
    },
  }, [navigate, pagePaths])
}

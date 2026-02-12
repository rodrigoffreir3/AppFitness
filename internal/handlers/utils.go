package handlers

import "strings"

// isExternalURL verifica se a URL é externa (Vimeo, YouTube, etc.)
func isExternalURL(url string) bool {
	return strings.HasPrefix(url, "http://") || strings.HasPrefix(url, "https://")
}

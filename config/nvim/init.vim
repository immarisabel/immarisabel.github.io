set number
let mapleader = " "

" For vim-plug (correct syntax)
call plug#begin('~/.vim/plugged')

" Appearance
Plug 'ryanoasis/vim-devicons'

" Utilities
Plug 'jiangmiao/auto-pairs'
Plug 'ap/vim-css-color'
Plug 'preservim/nerdtree'
Plug 'vimwiki/vimwiki'

" Completion / linters / formatters
Plug 'plasticboy/vim-markdown'
	
call plug#end()


" ========= PLUGIN CONFIG ==========

" ---- VinWiki ----

" Set the runtime path to include Vimwiki
set runtimepath+=~/.vim/bundle/vimwiki
let g:vimwiki_listsyms = '✗○◐●✓'
command! Diary VimwikiDiaryIndex

" Specify the location where Vimwiki files will be stored
let g:vimwiki_list = [{'path': $HOME.'/Desktop/.NOTES/', 'syntax': 'markdown', 'ext': '.md'}]

" Define a key mapping to open Vimwiki
nnoremap <leader>ww :VimwikiIndex<CR>

" ---- Airline ----
let g:airline_theme='sobrio'
let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#enabled = 1

" ---- NERDTree ----
" File browser
" let NERDTreeShowHidden=1
nnoremap <leader>/ :NERDTreeToggle<CR>

" ---- Vim Markdown ----

" Disable math tex conceal feature
let g:tex_conceal = ''
let g:vim_markdown_math = 1

" Markdown
let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_frontmatter = 1
let g:vim_markdown_conceal = 0
let g:vim_markdown_fenced_languages = ['tsx=typescriptreact']

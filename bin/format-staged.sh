#!/bin/sh

stash_dirty_files() {
	UNSTAGED_FILES=`git diff --name-only`
	if [ ! -z "$UNSTAGED_FILES" ]; then
		echo "Stashing un-staged changes"
		git commit --no-verify --message "WIP"
		git stash push --include-untracked
		git reset --soft HEAD^
	fi
}

unstash_dirty_files() {
	if [ ! -z "$UNSTAGED_FILES" ]; then
		echo "Un-stashing unstaged changes"
		git stash apply
		git stash drop
	fi
}

failure() {
	echo "$1"
	unstash_dirty_files
	exit 1
}

# Preserve un-staged changes for format-staged
stash_dirty_files

STAGED_FILES=`git diff --staged --name-only --diff-filter=d`

if [ ! -z "$STAGED_FILES" ]; then
	TO_ESLINT=`grep -E '[.](js|jsx)$' <<< "$STAGED_FILES"`
	TO_PRETTIER=`grep -E '[.](js|jsx,html,md,css,scss)$' <<< "$STAGED_FILES"`

	if [ ! -z "$TO_PRETTIER" ]; then
		echo 'Making staged files pretty'
		node_modules/.bin/prettier --write $TO_PRETTIER || failure "Could not make files pretty"
	fi

	if [ ! -z "$TO_ESLINT" ]; then
		echo 'Eslint-fixing staged files'
		node_modules/.bin/eslint --fix $TO_ESLINT || failure "Eslint failed, check for linting error"
	fi

	if [ ! -z "$TO_PRETTIER" ] && [ ! -z "$TO_ESLINT" ]; then
		echo "git-adding Prettier linted files"
		git add $STAGED_FILES || failure "Could not add pretty linted files to the commit, manual check required!"
	fi
fi

unstash_dirty_files

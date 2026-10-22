SRC_DIR := src
OUT_DIR := out
SOURCES := $(wildcard $(SRC_DIR)/*.md)
OUTPUTS := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(SOURCES))

.PHONY: all check deps build test package ci clean

all: ci

check:  ## check required Markdown sources and build program
	@test -n "$(SOURCES)" || (echo "ERROR: no Markdown sources found"; exit 1)
	@test -f tools/build.js || (echo "ERROR: tools/build.js missing"; exit 1)
	@test -f package.json || (echo "ERROR: package.json missing"; exit 1)
	@echo "CHECK PASSED"

node_modules: package-lock.json
	npm ci
	@touch node_modules

deps: node_modules  ## install exact locked dependencies

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md package-lock.json | $(OUT_DIR) node_modules
	@echo "  BUILD $< -> $@"
	@npm run --silent build -- $< $@

build: $(OUTPUTS)  ## build all HTML pages

test: build  ## run tests against built pages
	@npm test --silent

package: test  ## produce the versioned artifact
	npm pack

ci: clean deps check test package  ## complete clean build, test and package pipeline

clean:  ## remove generated files
	rm -rf $(OUT_DIR) *.tgz

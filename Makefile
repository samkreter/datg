# Image URL to use all building/pushing image targets
IMG ?= pskreter/datg:v0.0.5-alpha

# Generate release artifects for latest tag
release-latest:
	cd deploy/base && kustomize edit set image ${IMG}
	kustomize build deploy/base > deploy/deploy.yaml

# Deploy latest build image to k8s cluster
.PHONY: deploy
deploy:
	cd deploy/base && kustomize edit set image ${IMG}
	kustomize build deploy/base | kubectl apply -f -

# Build the docker image
docker-build:
	docker build . -t ${IMG}

# Push the docker image
docker-push: docker-build
	docker push ${IMG}

# Run the docker image locally
docker-run:
	docker run --rm -p 8081:80 ${IMG}

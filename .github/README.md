# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Glimpse React Native app.

## Workflows

### 1. `ci.yml` - Main CI/CD Pipeline
**Triggers**: Push to `main`/`develop`, Pull Requests

**Jobs**:
- **Lint and Type Check**: ESLint, TypeScript validation
- **Test**: Placeholder for future tests
- **Security Audit**: npm audit with moderate level
- **Build Check**: Expo configuration validation
- **EAS Build**: Automated builds for Android (main branch only)
- **Deploy to Expo**: Publish to Expo (main branch only)
- **Dependency Updates**: Weekly dependency checks

### 2. `pr-check.yml` - Pull Request Checks
**Triggers**: Pull Requests to `main`/`develop`

**Jobs**:
- **PR Checks**: Quick validation for PRs
- **Build Preview**: Optional build preview for PRs

### 3. `dependency-update.yml` - Dependency Management
**Triggers**: Weekly schedule (Mondays 9 AM UTC), Manual dispatch

**Jobs**:
- **Check for Updates**: Identifies outdated packages
- **Security Audit**: Checks for vulnerabilities

## Setup Required

### 1. Repository Secrets
Add these secrets in your GitHub repository settings:

```
EXPO_TOKEN=your_expo_access_token
```

**To get your Expo token**:
1. Go to https://expo.dev/accounts/[username]/settings/access-tokens
2. Create a new token
3. Add it to your repository secrets

### 2. Branch Protection (Recommended)
Set up branch protection rules for `main`:
- Require status checks to pass
- Require branches to be up to date
- Require pull request reviews

### 3. Labels
The workflows create issues with these labels:
- `dependencies` - Dependency updates
- `security` - Security vulnerabilities
- `automation` - Auto-generated issues
- `enhancement` - Suggested improvements
- `bug` - Issues to fix

## Workflow Features

### ✅ What's Included
- **TypeScript validation**
- **ESLint checking**
- **Security auditing**
- **Expo configuration validation**
- **Automated builds**
- **Dependency monitoring**
- **Issue creation for updates**

### 🔧 Customization
- **Node version**: Currently set to 18
- **Audit level**: Moderate for security checks
- **Build platforms**: Android (can add iOS)
- **Schedule**: Weekly dependency checks

### 📝 Adding Tests
When you add tests, update the test job in `ci.yml`:

```yaml
- name: Run tests
  run: npm test
```

### 🚀 Adding iOS Builds
To add iOS builds, update the EAS build job:

```yaml
- name: Build for iOS (Development)
  run: eas build --platform ios --profile development --non-interactive
```

## Troubleshooting

### Common Issues

1. **Expo token expired**
   - Regenerate token at https://expo.dev/accounts/[username]/settings/access-tokens
   - Update repository secret

2. **Build failures**
   - Check Expo configuration with `npx expo-doctor`
   - Verify app.json is valid
   - Check EAS build logs

3. **TypeScript errors**
   - Run `npx tsc --noEmit` locally
   - Fix type issues before pushing

4. **Security vulnerabilities**
   - Run `npm audit fix` locally
   - Review and update affected packages

### Manual Triggers

You can manually trigger workflows:
1. Go to Actions tab in GitHub
2. Select the workflow
3. Click "Run workflow"

## Monitoring

- **Workflow runs**: View in GitHub Actions tab
- **Issues**: Auto-created for dependencies and security
- **Build status**: Check EAS dashboard
- **Deployments**: Monitor Expo dashboard

## Best Practices

1. **Keep dependencies updated**
   - Review weekly dependency issues
   - Test thoroughly after updates

2. **Security first**
   - Address security issues promptly
   - Use `npm audit fix` when safe

3. **Test before merging**
   - Ensure all checks pass
   - Test builds locally if needed

4. **Monitor builds**
   - Check EAS build logs
   - Verify app functionality after builds 
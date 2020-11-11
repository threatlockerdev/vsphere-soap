# This has been rewritten for @hyperqube/vsphere-soap,
# and does not resemble the original file in pyVmomi

(
  F_LINK,
  F_LINKABLE,
  F_OPTIONAL,
  F_SECRET
) = [ 1<<x for x in range(4) ]

breakingChanges = []
dataTypes = []
enumTypes = []
managedTypes = []
versions = []

class Set:
  items = []

  def __init__(self, name):
    self.name = name

  def Add(self, value):
    self.items.append(value)
  
  def Get(self):
    return self.items[0]

newestVersions = Set("newest")
stableVersions = Set("stable")
publicVersions = Set("public")
dottedVersions = Set("dotted")
oldestVersions = Set("oldest")
versionSets = [newestVersions, stableVersions, publicVersions, dottedVersions, oldestVersions]

def populateVersions():
  for versionSet in versionSets:
    for version in versionSet.items:
      foundVersion = [v for v in versions if v["version"] == version][0]
      foundVersion["flags"][versionSet.name] = True

def AddVersion(version, namespace, versionId="", isLegacy=0, serviceNamespace=""):
  versions.append({
    "version": version,
    "namespace": namespace,
    "versionId": versionId,
    "isLegacy": isLegacy == 1,
    "serviceNamespace": serviceNamespace,
    "parents": [],
    "flags": {}
  })

def AddVersionParent(child, parent):
  version = [v for v in versions if v["version"] == child][0]
  version["parents"].append(parent)

def AddBreakingChangesInfo(branchName, vmodlNamespace, count):
  breakingChanges.append({
    "branchName": branchName,
    "vmodlNamespace": vmodlNamespace,
    "count": count
  })

def CreateDataType(vmodlName, wsdlName, parent, version, props):
  dataTypes.append({
    "vmodlName": vmodlName,
    "wsdlName": wsdlName,
    "parent": parent,
    "version": version,
    "props": props
  })

def CreateEnumType(vmodlName, wsdlName, version, values):
  enumTypes.append({
    "vmodlName": vmodlName,
    "wsdlName": wsdlName,
    "version": version,
    "values": values
  })

def CreateManagedType(vmodlName, wsdlName, parent, version, props, methods):
  managedTypes.append({
    "vmodlName": vmodlName,
    "wsdlName": wsdlName,
    "parent": parent,
    "version": version,
    "props": props,
    "methods": methods
  })

import { Connection } from "./Connection";

const constructHelperObjects = (connection: Connection, data: any, target: any, fieldClassMap: any): any => {
  for (const key of Object.keys(data)) {
    const itemConstructor = fieldClassMap[key];
    if (itemConstructor !== undefined) {
      const value = data[key];
      if (value instanceof Array) {
        target[key] = value.map(v => new itemConstructor(connection, v));
      } else {
        target[key] = new itemConstructor(connection, data[key]);
      }
    } else {
      target[key] = data[key]!;
    }
  }
  return target;
}

export type ObjectReference = string | {
  attributes: {
    type: string;
  };
  $value?: string;
}

export interface DataObject { }

export class ManagedObject {
  $value!: string;

  constructor(
    protected readonly connection: Connection,
    init?: Partial<ManagedObject>
  ) { }

  get id(): string {
    return this.$value;
  }
}
export interface MethodFault {
  faultCause?: {
    fault: MethodFault;
    localizedMessage?: string;
  };
  faultMessage?: {
    arg?: {
      key: string;
      value: string;
    }[];
    key: string;
    message: string;
  }[];
}
export interface RuntimeFault extends MethodFault { }
export interface DynamicArray extends DataObject {
  dynamicType?: string;
  val: any[];
}
export interface DynamicData extends DataObject {
  dynamicType?: string;
  dynamicProperty?: DynamicProperty[];
}
export interface DynamicProperty extends DataObject {
  name: string;
  val: any;
}
export interface KeyAnyValue extends DynamicData {
  key: string;
  value: any;
}
export interface LocalizableMessage extends DynamicData {
  key: string;
  arg?: KeyAnyValue[];
  message?: string;
}
export interface HostCommunication extends RuntimeFault {
  
}
export interface HostNotConnected extends HostCommunication {
  
}
export interface HostNotReachable extends HostCommunication {
  
}
export interface InvalidArgument extends RuntimeFault {
  invalidProperty?: string;
}
export interface InvalidRequest extends RuntimeFault {
  
}
export interface InvalidType extends InvalidRequest {
  argument?: string;
}
export interface ManagedObjectNotFound extends RuntimeFault {
  obj: ManagedObject;
}
export interface MethodNotFound extends InvalidRequest {
  receiver: ManagedObject;
  method: string;
}
export interface NotEnoughLicenses extends RuntimeFault {
  
}
export interface NotImplemented extends RuntimeFault {
  
}
export interface NotSupported extends RuntimeFault {
  
}
export interface RequestCanceled extends RuntimeFault {
  
}
export interface SecurityError extends RuntimeFault {
  
}
export interface SystemError extends RuntimeFault {
  reason: string;
}
export interface UnexpectedFault extends RuntimeFault {
  faultName: string;
  fault?: MethodFault;
}
export interface InvalidCollectorVersion extends MethodFault {
  
}
export interface InvalidProperty extends MethodFault {
  name: string;
}
export interface PropertyFilterSpec extends DynamicData {
  propSet: PropertySpec[];
  objectSet: ObjectSpec[];
  reportMissingObjectsInResults?: boolean;
}
export interface PropertySpec extends DynamicData {
  type: string;
  all?: boolean;
  pathSet?: string[];
}
export interface ObjectSpec extends DynamicData {
  obj: ManagedObject;
  skip?: boolean;
  selectSet?: SelectionSpec[];
}
export interface SelectionSpec extends DynamicData {
  name?: string;
}
export interface TraversalSpec extends SelectionSpec {
  type: string;
  path: string;
  skip?: boolean;
  selectSet?: SelectionSpec[];
}
export interface ObjectContent extends DynamicData {
  obj: ManagedObject;
  propSet?: DynamicProperty[];
  missingSet?: MissingProperty[];
}
export interface UpdateSet extends DynamicData {
  version: string;
  filterSet?: PropertyFilterUpdate[];
  truncated?: boolean;
}
export interface PropertyFilterUpdate extends DynamicData {
  filter: PropertyFilter;
  objectSet?: ObjectUpdate[];
  missingSet?: MissingObject[];
}
export interface ObjectUpdate extends DynamicData {
  kind: ObjectUpdateKind;
  obj: ManagedObject;
  changeSet?: PropertyChange[];
  missingSet?: MissingProperty[];
}
export interface PropertyChange extends DynamicData {
  name: string;
  op: PropertyChangeOp;
  val?: any;
}
export interface MissingProperty extends DynamicData {
  path: string;
  fault: MethodFault;
}
export interface MissingObject extends DynamicData {
  obj: ManagedObject;
  fault: MethodFault;
}
export interface WaitOptions extends DynamicData {
  maxWaitSeconds?: number;
  maxObjectUpdates?: number;
}
export interface RetrieveOptions extends DynamicData {
  maxObjects?: number;
}
export interface RetrieveResult extends DynamicData {
  token?: string;
  objects: ObjectContent[];
}
export interface AboutInfo extends DynamicData {
  name: string;
  fullName: string;
  vendor: string;
  version: string;
  build: string;
  localeVersion?: string;
  localeBuild?: string;
  osType: string;
  productLineId: string;
  apiType: string;
  apiVersion: string;
  instanceUuid?: string;
  licenseProductName?: string;
  licenseProductVersion?: string;
}
export interface AuthorizationDescription extends DynamicData {
  privilege: ElementDescription[];
  privilegeGroup: ElementDescription[];
}
export interface BatchResult extends DynamicData {
  result: string;
  hostKey: string;
  ds?: Datastore;
  fault?: MethodFault;
}
export interface Capability extends DynamicData {
  provisioningSupported: boolean;
  multiHostSupported: boolean;
  userShellAccessSupported: boolean;
  supportedEVCMode?: EVCMode[];
  supportedEVCGraphicsMode?: FeatureEVCMode[];
  networkBackupAndRestoreSupported?: boolean;
  ftDrsWithoutEvcSupported?: boolean;
  hciWorkflowSupported?: boolean;
  computePolicyVersion?: number;
  clusterPlacementSupported?: boolean;
  lifecycleManagementSupported?: boolean;
  scalableSharesSupported?: boolean;
}
export interface CustomFieldDef extends DynamicData {
  key: number;
  name: string;
  type: string;
  managedObjectType?: string;
  fieldDefPrivileges?: PrivilegePolicyDef;
  fieldInstancePrivileges?: PrivilegePolicyDef;
}
export interface CustomFieldStringValue extends CustomFieldValue {
  value: string;
}
export interface CustomFieldValue extends DynamicData {
  key: number;
}
export interface CustomizationSpecInfo extends DynamicData {
  name: string;
  description: string;
  type: string;
  changeVersion?: string;
  lastUpdateTime?: Date;
}
export interface CustomizationSpecItem extends DynamicData {
  info: CustomizationSpecInfo;
  spec: CustomizationSpec;
}
export interface Description extends DynamicData {
  label: string;
  summary: string;
}
export interface DesiredSoftwareSpec extends DynamicData {
  baseImageSpec: DesiredSoftwareSpecBaseImageSpec;
  vendorAddOnSpec?: DesiredSoftwareSpecVendorAddOnSpec;
}
export interface DesiredSoftwareSpecBaseImageSpec extends DynamicData {
  version: string;
}
export interface DesiredSoftwareSpecVendorAddOnSpec extends DynamicData {
  name: string;
  version: string;
}
export interface DiagnosticManagerBundleInfo extends DynamicData {
  system?: HostSystem;
  url: string;
}
export interface DiagnosticManagerLogDescriptor extends DynamicData {
  key: string;
  fileName: string;
  creator: string;
  format: string;
  mimeType: string;
  info: Description;
}
export interface DiagnosticManagerLogHeader extends DynamicData {
  lineStart: number;
  lineEnd: number;
  lineText?: string[];
}
export interface ElementDescription extends Description {
  key: string;
}
export interface EnumDescription extends DynamicData {
  key: string;
  tags: ElementDescription[];
}
export interface EnvironmentBrowserConfigOptionQuerySpec extends DynamicData {
  key?: string;
  host?: HostSystem;
  guestId?: string[];
}
export interface ExtendedDescription extends Description {
  messageCatalogKeyPrefix: string;
  messageArg?: KeyAnyValue[];
}
export interface ExtendedElementDescription extends ElementDescription {
  messageCatalogKeyPrefix: string;
  messageArg?: KeyAnyValue[];
}
export interface Extension extends DynamicData {
  description: Description;
  key: string;
  company?: string;
  type?: string;
  version: string;
  subjectName?: string;
  server?: ExtensionServerInfo[];
  client?: ExtensionClientInfo[];
  taskList?: ExtensionTaskTypeInfo[];
  eventList?: ExtensionEventTypeInfo[];
  faultList?: ExtensionFaultTypeInfo[];
  privilegeList?: ExtensionPrivilegeInfo[];
  resourceList?: ExtensionResourceInfo[];
  lastHeartbeatTime: Date;
  healthInfo?: ExtensionHealthInfo;
  ovfConsumerInfo?: ExtensionOvfConsumerInfo;
  extendedProductInfo?: ExtExtendedProductInfo;
  managedEntityInfo?: ExtManagedEntityInfo[];
  shownInSolutionManager?: boolean;
  solutionManagerInfo?: ExtSolutionManagerInfo;
}
export interface ExtensionClientInfo extends DynamicData {
  version: string;
  description: Description;
  company: string;
  type: string;
  url: string;
}
export interface ExtensionEventTypeInfo extends DynamicData {
  eventID: string;
  eventTypeSchema?: string;
}
export interface ExtensionFaultTypeInfo extends DynamicData {
  faultID: string;
}
export interface ExtensionHealthInfo extends DynamicData {
  url: string;
}
export interface ExtensionOvfConsumerInfo extends DynamicData {
  callbackUrl: string;
  sectionType: string[];
}
export interface ExtensionPrivilegeInfo extends DynamicData {
  privID: string;
  privGroupName: string;
}
export interface ExtensionResourceInfo extends DynamicData {
  locale: string;
  module: string;
  data: KeyValue[];
}
export interface ExtensionServerInfo extends DynamicData {
  url: string;
  description: Description;
  company: string;
  type: string;
  adminEmail: string[];
  serverThumbprint?: string;
}
export interface ExtensionTaskTypeInfo extends DynamicData {
  taskID: string;
}
export interface ExtensionManagerIpAllocationUsage extends DynamicData {
  extensionKey: string;
  numAddresses: number;
}
export interface FaultsByHost extends DynamicData {
  host: HostSystem;
  faults?: MethodFault[];
}
export interface FaultsByVM extends DynamicData {
  vm: VirtualMachine;
  faults?: MethodFault[];
}
export interface FeatureEVCMode extends ElementDescription {
  mask?: HostFeatureMask[];
  capability?: HostFeatureCapability[];
  requirement?: VirtualMachineFeatureRequirement[];
}
export interface HbrManagerReplicationVmInfo extends DynamicData {
  state: string;
  progressInfo?: ReplicationVmProgressInfo;
  imageId?: string;
  lastError?: MethodFault;
}
export interface ReplicationVmProgressInfo extends DynamicData {
  progress: number;
  bytesTransferred: number;
  bytesToTransfer: number;
  checksumTotalBytes?: number;
  checksumComparedBytes?: number;
}
export interface HbrManagerVmReplicationCapability extends DynamicData {
  vm: VirtualMachine;
  supportedQuiesceMode: string;
  compressionSupported: boolean;
  maxSupportedSourceDiskCapacity: number;
  minRpo?: number;
  fault?: MethodFault;
}
export interface HealthUpdateInfo extends DynamicData {
  id: string;
  componentType: string;
  description: string;
}
export interface PerfInterval extends DynamicData {
  key: number;
  samplingPeriod: number;
  name: string;
  length: number;
  level?: number;
  enabled: boolean;
}
export interface HostServiceTicket extends DynamicData {
  host?: string;
  port?: number;
  sslThumbprint?: string;
  service: string;
  serviceVersion: string;
  sessionId: string;
}
export interface HttpNfcLeaseCapabilities extends DynamicData {
  pullModeSupported: boolean;
  corsSupported: boolean;
}
export interface HttpNfcLeaseDatastoreLeaseInfo extends DynamicData {
  datastoreKey: string;
  hosts: HttpNfcLeaseHostInfo[];
}
export interface HttpNfcLeaseDeviceUrl extends DynamicData {
  key: string;
  importKey: string;
  url: string;
  sslThumbprint: string;
  disk?: boolean;
  targetId?: string;
  datastoreKey?: string;
  fileSize?: number;
}
export interface HttpNfcLeaseHostInfo extends DynamicData {
  url: string;
  sslThumbprint: string;
}
export interface HttpNfcLeaseInfo extends DynamicData {
  lease: HttpNfcLease;
  entity: ManagedEntity;
  deviceUrl?: HttpNfcLeaseDeviceUrl[];
  totalDiskCapacityInKB: number;
  leaseTimeout: number;
  hostMap?: HttpNfcLeaseDatastoreLeaseInfo[];
}
export interface HttpNfcLeaseManifestEntry extends DynamicData {
  key: string;
  sha1: string;
  checksum?: string;
  checksumType?: string;
  size: number;
  disk: boolean;
  capacity?: number;
  populatedSize?: number;
}
export interface HttpNfcLeaseSourceFile extends DynamicData {
  targetDeviceId: string;
  url: string;
  memberName?: string;
  create: boolean;
  sslThumbprint?: string;
  httpHeaders?: KeyValue[];
  size?: number;
}
export interface InheritablePolicy extends DynamicData {
  inherited: boolean;
}
export interface IntPolicy extends InheritablePolicy {
  value?: number;
}
export interface ClusterIoFilterInfo extends IoFilterInfo {
  opType: string;
  vibUrl?: string;
}
export interface HostIoFilterInfo extends IoFilterInfo {
  available: boolean;
}
export interface IoFilterInfo extends DynamicData {
  id: string;
  name: string;
  vendor: string;
  version: string;
  type?: string;
  summary?: string;
  releaseDate?: string;
}
export interface IoFilterQueryIssueResult extends DynamicData {
  opType: string;
  hostIssue?: IoFilterHostIssue[];
}
export interface IoFilterHostIssue extends DynamicData {
  host: HostSystem;
  issue: MethodFault[];
}
export interface IpPoolManagerIpAllocation extends DynamicData {
  ipAddress: string;
  allocationId: string;
}
export interface KeyValue extends DynamicData {
  key: string;
  value: string;
}
export interface LatencySensitivity extends DynamicData {
  level: LatencySensitivitySensitivityLevel;
  sensitivity?: number;
}
export interface LicenseAvailabilityInfo extends DynamicData {
  feature: LicenseFeatureInfo;
  total: number;
  available: number;
}
export interface LicenseDiagnostics extends DynamicData {
  sourceLastChanged: Date;
  sourceLost: string;
  sourceLatency: number;
  licenseRequests: string;
  licenseRequestFailures: string;
  licenseFeatureUnknowns: string;
  opState: LicenseManagerState;
  lastStatusUpdate: Date;
  opFailureMessage: string;
}
export interface LicenseManagerEvaluationInfo extends DynamicData {
  properties: KeyAnyValue[];
}
export interface EvaluationLicenseSource extends LicenseSource {
  remainingHours?: number;
}
export interface LicenseFeatureInfo extends DynamicData {
  key: string;
  featureName: string;
  featureDescription?: string;
  state?: LicenseFeatureInfoState;
  costUnit: string;
  sourceRestriction?: string;
  dependentKey?: string[];
  edition?: boolean;
  expiresOn?: Date;
}
export interface HostLicensableResourceInfo extends DynamicData {
  resource: KeyAnyValue[];
}
export interface LicenseManagerLicenseInfo extends DynamicData {
  licenseKey: string;
  editionKey: string;
  name: string;
  total: number;
  used?: number;
  costUnit: string;
  properties?: KeyAnyValue[];
  labels?: KeyValue[];
}
export interface LicenseServerSource extends LicenseSource {
  licenseServer: string;
}
export interface LicenseSource extends DynamicData {
  
}
export interface LicenseUsageInfo extends DynamicData {
  source: LicenseSource;
  sourceAvailable: boolean;
  reservationInfo?: LicenseReservationInfo[];
  featureInfo?: LicenseFeatureInfo[];
}
export interface LocalLicenseSource extends LicenseSource {
  licenseKeys: string;
}
export interface LicenseReservationInfo extends DynamicData {
  key: string;
  state: LicenseReservationInfoState;
  required: number;
}
export interface LocalizationManagerMessageCatalog extends DynamicData {
  moduleName: string;
  catalogName: string;
  locale: string;
  catalogUri: string;
  lastModified?: Date;
  md5sum?: string;
  version?: string;
}
export interface LongPolicy extends InheritablePolicy {
  value?: number;
}
export interface MethodDescription extends Description {
  key: string;
}
export interface NegatableExpression extends DynamicData {
  negate?: boolean;
}
export interface NumericRange extends DynamicData {
  start: number;
  end: number;
}
export interface OvfConsumerOstNode extends DynamicData {
  id: string;
  type: string;
  section?: OvfConsumerOvfSection[];
  child?: OvfConsumerOstNode[];
  entity?: ManagedEntity;
}
export interface OvfConsumerOvfSection extends DynamicData {
  lineNumber: number;
  xml: string;
}
export interface OvfManagerCommonParams extends DynamicData {
  locale: string;
  deploymentOption: string;
  msgBundle?: KeyValue[];
  importOption?: string[];
}
export interface OvfCreateDescriptorParams extends DynamicData {
  ovfFiles?: OvfFile[];
  name?: string;
  description?: string;
  includeImageFiles?: boolean;
  exportOption?: string[];
  snapshot?: VirtualMachineSnapshot;
}
export interface OvfCreateDescriptorResult extends DynamicData {
  ovfDescriptor: string;
  error?: MethodFault[];
  warning?: MethodFault[];
  includeImageFiles?: boolean;
}
export interface OvfCreateImportSpecParams extends OvfManagerCommonParams {
  entityName: string;
  hostSystem?: HostSystem;
  networkMapping?: OvfNetworkMapping[];
  ipAllocationPolicy?: string;
  ipProtocol?: string;
  propertyMapping?: KeyValue[];
  resourceMapping?: OvfResourceMap[];
  diskProvisioning?: string;
  instantiationOst?: OvfConsumerOstNode;
}
export interface OvfCreateImportSpecResult extends DynamicData {
  importSpec?: ImportSpec;
  fileItem?: OvfFileItem[];
  warning?: MethodFault[];
  error?: MethodFault[];
}
export interface OvfDeploymentOption extends DynamicData {
  key: string;
  label: string;
  description: string;
}
export interface OvfFileItem extends DynamicData {
  deviceId: string;
  path: string;
  compressionMethod?: string;
  chunkSize?: number;
  size?: number;
  cimType: number;
  create: boolean;
}
export interface OvfNetworkInfo extends DynamicData {
  name: string;
  description: string;
}
export interface OvfNetworkMapping extends DynamicData {
  name: string;
  network: Network;
}
export interface OvfFile extends DynamicData {
  deviceId: string;
  path: string;
  compressionMethod?: string;
  chunkSize?: number;
  size: number;
  capacity?: number;
  populatedSize?: number;
}
export interface OvfOptionInfo extends DynamicData {
  option: string;
  description: LocalizableMessage;
}
export interface OvfParseDescriptorParams extends OvfManagerCommonParams {
  
}
export interface OvfParseDescriptorResult extends DynamicData {
  eula?: string[];
  network?: OvfNetworkInfo[];
  ipAllocationScheme?: string[];
  ipProtocols?: string[];
  property?: VAppPropertyInfo[];
  productInfo?: VAppProductInfo;
  annotation: string;
  approximateDownloadSize?: number;
  approximateFlatDeploymentSize?: number;
  approximateSparseDeploymentSize?: number;
  defaultEntityName: string;
  virtualApp: boolean;
  deploymentOption?: OvfDeploymentOption[];
  defaultDeploymentOption: string;
  entityName?: KeyValue[];
  annotatedOst?: OvfConsumerOstNode;
  error?: MethodFault[];
  warning?: MethodFault[];
}
export interface OvfResourceMap extends DynamicData {
  source: string;
  parent?: ResourcePool;
  resourceSpec?: ResourceConfigSpec;
  datastore?: Datastore;
}
export interface OvfValidateHostParams extends OvfManagerCommonParams {
  
}
export interface OvfValidateHostResult extends DynamicData {
  downloadSize?: number;
  flatDeploymentSize?: number;
  sparseDeploymentSize?: number;
  error?: MethodFault[];
  warning?: MethodFault[];
  supportedDiskProvisioning?: string[];
}
export interface PasswordField extends DynamicData {
  value: string;
}
export interface PerformanceDescription extends DynamicData {
  counterType: ElementDescription[];
  statsType: ElementDescription[];
}
export interface PerfCompositeMetric extends DynamicData {
  entity?: PerfEntityMetricBase;
  childEntity?: PerfEntityMetricBase[];
}
export interface PerfCounterInfo extends DynamicData {
  key: number;
  nameInfo: ElementDescription;
  groupInfo: ElementDescription;
  unitInfo: ElementDescription;
  rollupType: PerfSummaryType;
  statsType: PerfStatsType;
  level?: number;
  perDeviceLevel?: number;
  associatedCounterId?: number[];
}
export interface PerformanceManagerCounterLevelMapping extends DynamicData {
  counterId: number;
  aggregateLevel?: number;
  perDeviceLevel?: number;
}
export interface PerfEntityMetric extends PerfEntityMetricBase {
  sampleInfo?: PerfSampleInfo[];
  value?: PerfMetricSeries[];
}
export interface PerfEntityMetricBase extends DynamicData {
  entity: ManagedObject;
}
export interface PerfEntityMetricCSV extends PerfEntityMetricBase {
  sampleInfoCSV: string;
  value?: PerfMetricSeriesCSV[];
}
export interface PerfMetricIntSeries extends PerfMetricSeries {
  value?: number[];
}
export interface PerfMetricId extends DynamicData {
  counterId: number;
  instance: string;
}
export interface PerfMetricSeries extends DynamicData {
  id: PerfMetricId;
}
export interface PerfMetricSeriesCSV extends PerfMetricSeries {
  value?: string;
}
export interface PerfProviderSummary extends DynamicData {
  entity: ManagedObject;
  currentSupported: boolean;
  summarySupported: boolean;
  refreshRate?: number;
}
export interface PerfQuerySpec extends DynamicData {
  entity: ManagedObject;
  startTime?: Date;
  endTime?: Date;
  maxSample?: number;
  metricId?: PerfMetricId[];
  intervalId?: number;
  format?: string;
}
export interface PerfSampleInfo extends DynamicData {
  timestamp: Date;
  interval: number;
}
export interface PrivilegePolicyDef extends DynamicData {
  createPrivilege: string;
  readPrivilege: string;
  updatePrivilege: string;
  deletePrivilege: string;
}
export interface ResourceAllocationInfo extends DynamicData {
  reservation?: number;
  expandableReservation?: boolean;
  limit?: number;
  shares?: SharesInfo;
  overheadLimit?: number;
}
export interface ResourceAllocationOption extends DynamicData {
  sharesOption: SharesOption;
}
export interface ResourceConfigOption extends DynamicData {
  cpuAllocationOption: ResourceAllocationOption;
  memoryAllocationOption: ResourceAllocationOption;
}
export interface ResourceConfigSpec extends DynamicData {
  entity?: ManagedEntity;
  changeVersion?: string;
  lastModified?: Date;
  cpuAllocation: ResourceAllocationInfo;
  memoryAllocation: ResourceAllocationInfo;
  scaleDescendantsShares?: string;
}
export interface DatabaseSizeEstimate extends DynamicData {
  size: number;
}
export interface DatabaseSizeParam extends DynamicData {
  inventoryDesc: InventoryDescription;
  perfStatsDesc?: PerformanceStatisticsDescription;
}
export interface InventoryDescription extends DynamicData {
  numHosts: number;
  numVirtualMachines: number;
  numResourcePools?: number;
  numClusters?: number;
  numCpuDev?: number;
  numNetDev?: number;
  numDiskDev?: number;
  numvCpuDev?: number;
  numvNetDev?: number;
  numvDiskDev?: number;
}
export interface PerformanceStatisticsDescription extends DynamicData {
  intervals?: PerfInterval[];
}
export interface SDDCBase extends DynamicData {
  
}
export interface SelectionSet extends DynamicData {
  
}
export interface ServiceContent extends DynamicData {
  rootFolder: Folder;
  propertyCollector: PropertyCollector;
  viewManager?: ViewManager;
  about: AboutInfo;
  setting?: OptionManager;
  userDirectory?: UserDirectory;
  sessionManager?: SessionManager;
  authorizationManager?: AuthorizationManager;
  serviceManager?: ServiceManager;
  perfManager?: PerformanceManager;
  scheduledTaskManager?: ScheduledTaskManager;
  alarmManager?: AlarmManager;
  eventManager?: EventManager;
  taskManager?: TaskManager;
  extensionManager?: ExtensionManager;
  customizationSpecManager?: CustomizationSpecManager;
  guestCustomizationManager?: VirtualMachineGuestCustomizationManager;
  customFieldsManager?: CustomFieldsManager;
  accountManager?: HostLocalAccountManager;
  diagnosticManager?: DiagnosticManager;
  licenseManager?: LicenseManager;
  searchIndex?: SearchIndex;
  fileManager?: FileManager;
  datastoreNamespaceManager?: DatastoreNamespaceManager;
  virtualDiskManager?: VirtualDiskManager;
  virtualizationManager?: VirtualizationManager;
  snmpSystem?: HostSnmpSystem;
  vmProvisioningChecker?: VirtualMachineProvisioningChecker;
  vmCompatibilityChecker?: VirtualMachineCompatibilityChecker;
  ovfManager?: OvfManager;
  ipPoolManager?: IpPoolManager;
  dvSwitchManager?: DistributedVirtualSwitchManager;
  hostProfileManager?: HostProfileManager;
  clusterProfileManager?: ClusterProfileManager;
  complianceManager?: ProfileComplianceManager;
  localizationManager?: LocalizationManager;
  storageResourceManager?: StorageResourceManager;
  guestOperationsManager?: GuestOperationsManager;
  overheadMemoryManager?: OverheadMemoryManager;
  certificateManager?: CertificateManager;
  ioFilterManager?: IoFilterManager;
  vStorageObjectManager?: VStorageObjectManagerBase;
  hostSpecManager?: HostSpecificationManager;
  cryptoManager?: CryptoManager;
  healthUpdateManager?: HealthUpdateManager;
  failoverClusterConfigurator?: FailoverClusterConfigurator;
  failoverClusterManager?: FailoverClusterManager;
  tenantManager?: TenantTenantManager;
  siteInfoManager?: SiteInfoManager;
  storageQueryManager?: StorageQueryManager;
}
export interface ServiceLocator extends DynamicData {
  instanceUuid: string;
  url: string;
  credential: ServiceLocatorCredential;
  sslThumbprint?: string;
}
export interface ServiceLocatorCredential extends DynamicData {
  
}
export interface ServiceLocatorNamePassword extends ServiceLocatorCredential {
  username: string;
  password: string;
}
export interface ServiceLocatorSAMLCredential extends ServiceLocatorCredential {
  token?: string;
}
export interface ServiceManagerServiceInfo extends DynamicData {
  serviceName: string;
  location?: string[];
  service: ManagedObject;
  description: string;
}
export interface SessionManagerGenericServiceTicket extends DynamicData {
  id: string;
  hostName?: string;
  sslThumbprint?: string;
}
export interface SessionManagerHttpServiceRequestSpec extends SessionManagerServiceRequestSpec {
  method?: string;
  url: string;
}
export interface SessionManagerLocalTicket extends DynamicData {
  userName: string;
  passwordFilePath: string;
}
export interface SessionManagerServiceRequestSpec extends DynamicData {
  
}
export interface SessionManagerVmomiServiceRequestSpec extends SessionManagerServiceRequestSpec {
  method: string;
}
export interface SharesInfo extends DynamicData {
  shares: number;
  level: SharesLevel;
}
export interface SharesOption extends DynamicData {
  sharesOption: IntOption;
  defaultLevel: SharesLevel;
}
export interface SiteInfo extends DynamicData {
  
}
export interface StorageIOAllocationInfo extends DynamicData {
  limit?: number;
  shares?: SharesInfo;
  reservation?: number;
}
export interface StorageIOAllocationOption extends DynamicData {
  limitOption: LongOption;
  sharesOption: SharesOption;
}
export interface StorageIORMInfo extends DynamicData {
  enabled: boolean;
  congestionThresholdMode: string;
  congestionThreshold: number;
  percentOfPeakThroughput?: number;
  statsCollectionEnabled: boolean;
  reservationEnabled: boolean;
  statsAggregationDisabled?: boolean;
  reservableIopsThreshold?: number;
}
export interface StorageIORMConfigOption extends DynamicData {
  enabledOption: BoolOption;
  congestionThresholdOption: IntOption;
  statsCollectionEnabledOption: BoolOption;
  reservationEnabledOption: BoolOption;
}
export interface StorageIORMConfigSpec extends DynamicData {
  enabled?: boolean;
  congestionThresholdMode?: string;
  congestionThreshold?: number;
  percentOfPeakThroughput?: number;
  statsCollectionEnabled?: boolean;
  reservationEnabled?: boolean;
  statsAggregationDisabled?: boolean;
  reservableIopsThreshold?: number;
}
export interface PodStorageDrsEntry extends DynamicData {
  storageDrsConfig: StorageDrsConfigInfo;
  recommendation?: ClusterRecommendation[];
  drsFault?: ClusterDrsFaults[];
  actionHistory?: ClusterActionHistory[];
}
export interface StoragePerformanceSummary extends DynamicData {
  interval: number;
  percentile: number[];
  datastoreReadLatency: number[];
  datastoreWriteLatency: number[];
  datastoreVmLatency: number[];
  datastoreReadIops: number[];
  datastoreWriteIops: number[];
  siocActivityDuration: number;
}
export interface StorageResourceManagerStorageProfileStatistics extends DynamicData {
  profileId: string;
  totalSpaceMB: number;
  usedSpaceMB: number;
}
export interface StringExpression extends NegatableExpression {
  value?: string;
}
export interface StringPolicy extends InheritablePolicy {
  value?: string;
}
export interface Tag extends DynamicData {
  key: string;
}
export interface TaskDescription extends DynamicData {
  methodInfo: ElementDescription[];
  state: ElementDescription[];
  reason: TypeDescription[];
}
export interface TaskInfo extends DynamicData {
  key: string;
  task: Task;
  description?: LocalizableMessage;
  name?: string;
  descriptionId: string;
  entity?: ManagedEntity;
  entityName?: string;
  locked?: ManagedEntity[];
  state: TaskInfoState;
  cancelled: boolean;
  cancelable: boolean;
  error?: MethodFault;
  result?: any;
  progress?: number;
  reason: TaskReason;
  queueTime: Date;
  startTime?: Date;
  completeTime?: Date;
  eventChainId: number;
  changeTag?: string;
  parentTaskKey?: string;
  rootTaskKey?: string;
  activationId?: string;
}
export interface TaskReason extends DynamicData {
  
}
export interface TaskReasonAlarm extends TaskReason {
  alarmName: string;
  alarm: Alarm;
  entityName: string;
  entity: ManagedEntity;
}
export interface TaskReasonSchedule extends TaskReason {
  name: string;
  scheduledTask: ScheduledTask;
}
export interface TaskReasonSystem extends TaskReason {
  
}
export interface TaskReasonUser extends TaskReason {
  userName: string;
}
export interface TypeDescription extends Description {
  key: string;
}
export interface UpdateVirtualMachineFilesResult extends DynamicData {
  failedVmFile?: UpdateVirtualMachineFilesResultFailedVmFileInfo[];
}
export interface UpdateVirtualMachineFilesResultFailedVmFileInfo extends DynamicData {
  vmFile: string;
  fault: MethodFault;
}
export interface UserSearchResult extends DynamicData {
  principal: string;
  fullName?: string;
  group: boolean;
}
export interface UserSession extends DynamicData {
  key: string;
  userName: string;
  fullName: string;
  loginTime: Date;
  lastActiveTime: Date;
  locale: string;
  messageLocale: string;
  extensionSession: boolean;
  ipAddress: string;
  userAgent: string;
  callCount: number;
}
export interface VVolVmConfigFileUpdateResult extends DynamicData {
  succeededVmConfigFile?: KeyValue[];
  failedVmConfigFile?: VVolVmConfigFileUpdateResultFailedVmConfigFileInfo[];
}
export interface VVolVmConfigFileUpdateResultFailedVmConfigFileInfo extends DynamicData {
  targetConfigVVolId: string;
  dsPath?: string;
  fault: MethodFault;
}
export interface VASAStorageArray extends DynamicData {
  name: string;
  uuid: string;
  vendorId: string;
  modelId: string;
}
export interface VimVasaProvider extends DynamicData {
  uid?: string;
  url: string;
  name?: string;
  selfSignedCertificate?: string;
}
export interface VimVasaProviderStatePerArray extends DynamicData {
  priority: number;
  arrayId: string;
  active: boolean;
}
export interface VimVasaProviderInfo extends DynamicData {
  provider: VimVasaProvider;
  arrayState?: VimVasaProviderStatePerArray[];
}
export interface VsanUpgradeSystemAPIBrokenIssue extends VsanUpgradeSystemPreflightCheckIssue {
  hosts: HostSystem[];
}
export interface VsanUpgradeSystemAutoClaimEnabledOnHostsIssue extends VsanUpgradeSystemPreflightCheckIssue {
  hosts: HostSystem[];
}
export interface VsanUpgradeSystemHostsDisconnectedIssue extends VsanUpgradeSystemPreflightCheckIssue {
  hosts: HostSystem[];
}
export interface VsanUpgradeSystemMissingHostsInClusterIssue extends VsanUpgradeSystemPreflightCheckIssue {
  hosts: HostSystem[];
}
export interface VsanUpgradeSystemNetworkPartitionInfo extends DynamicData {
  hosts: HostSystem[];
}
export interface VsanUpgradeSystemNetworkPartitionIssue extends VsanUpgradeSystemPreflightCheckIssue {
  partitions: VsanUpgradeSystemNetworkPartitionInfo[];
}
export interface VsanUpgradeSystemNotEnoughFreeCapacityIssue extends VsanUpgradeSystemPreflightCheckIssue {
  reducedRedundancyUpgradePossible: boolean;
}
export interface VsanUpgradeSystemPreflightCheckIssue extends DynamicData {
  msg: string;
}
export interface VsanUpgradeSystemPreflightCheckResult extends DynamicData {
  issues?: VsanUpgradeSystemPreflightCheckIssue[];
  diskMappingToRestore?: VsanHostDiskMapping;
}
export interface VsanUpgradeSystemRogueHostsInClusterIssue extends VsanUpgradeSystemPreflightCheckIssue {
  uuids: string[];
}
export interface VsanUpgradeSystemUpgradeHistoryDiskGroupOp extends VsanUpgradeSystemUpgradeHistoryItem {
  operation: string;
  diskMapping: VsanHostDiskMapping;
}
export interface VsanUpgradeSystemUpgradeHistoryItem extends DynamicData {
  timestamp: Date;
  host?: HostSystem;
  message: string;
  task?: Task;
}
export interface VsanUpgradeSystemUpgradeHistoryPreflightFail extends VsanUpgradeSystemUpgradeHistoryItem {
  preflightResult: VsanUpgradeSystemPreflightCheckResult;
}
export interface VsanUpgradeSystemUpgradeStatus extends DynamicData {
  inProgress: boolean;
  history?: VsanUpgradeSystemUpgradeHistoryItem[];
  aborted?: boolean;
  completed?: boolean;
  progress?: number;
}
export interface VsanUpgradeSystemV2ObjectsPresentDuringDowngradeIssue extends VsanUpgradeSystemPreflightCheckIssue {
  uuids: string[];
}
export interface VsanUpgradeSystemWrongEsxVersionIssue extends VsanUpgradeSystemPreflightCheckIssue {
  hosts: HostSystem[];
}
export interface Action extends DynamicData {
  
}
export interface CreateTaskAction extends Action {
  taskTypeId: string;
  cancelable: boolean;
}
export interface MethodAction extends Action {
  name: string;
  argument?: MethodActionArgument[];
}
export interface MethodActionArgument extends DynamicData {
  value?: any;
}
export interface RunScriptAction extends Action {
  script: string;
}
export interface SendEmailAction extends Action {
  toList: string;
  ccList: string;
  subject: string;
  body: string;
}
export interface SendSNMPAction extends Action {
  
}
export interface AlarmAction extends DynamicData {
  
}
export interface AlarmDescription extends DynamicData {
  expr: TypeDescription[];
  stateOperator: ElementDescription[];
  metricOperator: ElementDescription[];
  hostSystemConnectionState: ElementDescription[];
  virtualMachinePowerState: ElementDescription[];
  datastoreConnectionState: ElementDescription[];
  hostSystemPowerState: ElementDescription[];
  virtualMachineGuestHeartbeatStatus: ElementDescription[];
  entityStatus: ElementDescription[];
  action: TypeDescription[];
}
export interface AlarmExpression extends DynamicData {
  
}
export interface AlarmSetting extends DynamicData {
  toleranceRange: number;
  reportingFrequency: number;
}
export interface AlarmSpec extends DynamicData {
  name: string;
  systemName?: string;
  description: string;
  enabled: boolean;
  expression: AlarmExpression;
  action?: AlarmAction;
  actionFrequency?: number;
  setting?: AlarmSetting;
}
export interface AndAlarmExpression extends AlarmExpression {
  expression: AlarmExpression[];
}
export interface GroupAlarmAction extends AlarmAction {
  action: AlarmAction[];
}
export interface MetricAlarmExpression extends AlarmExpression {
  operator: MetricAlarmOperator;
  type: string;
  metric: PerfMetricId;
  yellow?: number;
  yellowInterval?: number;
  red?: number;
  redInterval?: number;
}
export interface OrAlarmExpression extends AlarmExpression {
  expression: AlarmExpression[];
}
export interface StateAlarmExpression extends AlarmExpression {
  operator: StateAlarmOperator;
  type: string;
  statePath: string;
  yellow?: string;
  red?: string;
}
export interface ClusterAction extends DynamicData {
  type: string;
  target?: ManagedObject;
}
export interface ClusterActionHistory extends DynamicData {
  action: ClusterAction;
  time: Date;
}
export interface ClusterAttemptedVmInfo extends DynamicData {
  vm: VirtualMachine;
  task?: Task;
}
export interface ClusterConfigInfo extends DynamicData {
  dasConfig: ClusterDasConfigInfo;
  dasVmConfig?: ClusterDasVmConfigInfo[];
  drsConfig: ClusterDrsConfigInfo;
  drsVmConfig?: ClusterDrsVmConfigInfo[];
  rule?: ClusterRuleInfo[];
}
export interface ClusterConfigSpec extends DynamicData {
  dasConfig?: ClusterDasConfigInfo;
  dasVmConfigSpec?: ClusterDasVmConfigSpec[];
  drsConfig?: ClusterDrsConfigInfo;
  drsVmConfigSpec?: ClusterDrsVmConfigSpec[];
  rulesSpec?: ClusterRuleSpec[];
}
export interface ClusterCryptoConfigInfo extends DynamicData {
  cryptoMode?: string;
}
export interface ClusterDasAamNodeState extends DynamicData {
  host: HostSystem;
  name: string;
  configState: string;
  runtimeState: string;
}
export interface ClusterDasAdmissionControlInfo extends DynamicData {
  
}
export interface ClusterDasAdmissionControlPolicy extends DynamicData {
  resourceReductionToToleratePercent?: number;
}
export interface ClusterDasAdvancedRuntimeInfo extends DynamicData {
  dasHostInfo?: ClusterDasHostInfo;
  vmcpSupported?: ClusterDasAdvancedRuntimeInfoVmcpCapabilityInfo;
  heartbeatDatastoreInfo?: DasHeartbeatDatastoreInfo[];
}
export interface DasHeartbeatDatastoreInfo extends DynamicData {
  datastore: Datastore;
  hosts: HostSystem[];
}
export interface ClusterDasAdvancedRuntimeInfoVmcpCapabilityInfo extends DynamicData {
  storageAPDSupported: boolean;
  storagePDLSupported: boolean;
}
export interface ClusterDasConfigInfo extends DynamicData {
  enabled?: boolean;
  vmMonitoring?: string;
  hostMonitoring?: string;
  vmComponentProtecting?: string;
  failoverLevel?: number;
  admissionControlPolicy?: ClusterDasAdmissionControlPolicy;
  admissionControlEnabled?: boolean;
  defaultVmSettings?: ClusterDasVmSettings;
  option?: OptionValue[];
  heartbeatDatastore?: Datastore[];
  hBDatastoreCandidatePolicy?: string;
}
export interface ClusterDasData extends DynamicData {
  
}
export interface ClusterDasDataSummary extends ClusterDasData {
  hostListVersion: number;
  clusterConfigVersion: number;
  compatListVersion: number;
}
export interface ClusterDasFailoverLevelAdvancedRuntimeInfo extends ClusterDasAdvancedRuntimeInfo {
  slotInfo: ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo;
  totalSlots: number;
  usedSlots: number;
  unreservedSlots: number;
  totalVms: number;
  totalHosts: number;
  totalGoodHosts: number;
  hostSlots?: ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots[];
  vmsRequiringMultipleSlots?: ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots[];
}
export interface ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots extends DynamicData {
  host: HostSystem;
  slots: number;
}
export interface ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo extends DynamicData {
  numVcpus: number;
  cpuMHz: number;
  memoryMB: number;
}
export interface ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots extends DynamicData {
  vm: VirtualMachine;
  slots: number;
}
export interface ClusterDasFdmHostState extends DynamicData {
  state: string;
  stateReporter?: HostSystem;
}
export interface ClusterDasHostInfo extends DynamicData {
  
}
export interface ClusterDasHostRecommendation extends DynamicData {
  host: HostSystem;
  drsRating?: number;
}
export interface ClusterDasVmConfigInfo extends DynamicData {
  key: VirtualMachine;
  restartPriority?: DasVmPriority;
  powerOffOnIsolation?: boolean;
  dasSettings?: ClusterDasVmSettings;
}
export interface ClusterDasVmSettings extends DynamicData {
  restartPriority?: string;
  restartPriorityTimeout?: number;
  isolationResponse?: string;
  vmToolsMonitoringSettings?: ClusterVmToolsMonitoringSettings;
  vmComponentProtectionSettings?: ClusterVmComponentProtectionSettings;
}
export interface ClusterDpmConfigInfo extends DynamicData {
  enabled?: boolean;
  defaultDpmBehavior?: DpmBehavior;
  hostPowerActionRate?: number;
  option?: OptionValue[];
}
export interface ClusterDpmHostConfigInfo extends DynamicData {
  key: HostSystem;
  enabled?: boolean;
  behavior?: DpmBehavior;
}
export interface ClusterDrsConfigInfo extends DynamicData {
  enabled?: boolean;
  enableVmBehaviorOverrides?: boolean;
  defaultVmBehavior?: DrsBehavior;
  vmotionRate?: number;
  scaleDescendantsShares?: string;
  option?: OptionValue[];
}
export interface ClusterDrsFaults extends DynamicData {
  reason: string;
  faultsByVm: ClusterDrsFaultsFaultsByVm[];
}
export interface ClusterDrsFaultsFaultsByVirtualDisk extends ClusterDrsFaultsFaultsByVm {
  disk?: VirtualDiskId;
}
export interface ClusterDrsFaultsFaultsByVm extends DynamicData {
  vm?: VirtualMachine;
  fault: MethodFault[];
}
export interface ClusterDrsMigration extends DynamicData {
  key: string;
  time: Date;
  vm: VirtualMachine;
  cpuLoad?: number;
  memoryLoad?: number;
  source: HostSystem;
  sourceCpuLoad?: number;
  sourceMemoryLoad?: number;
  destination: HostSystem;
  destinationCpuLoad?: number;
  destinationMemoryLoad?: number;
}
export interface ClusterDrsRecommendation extends DynamicData {
  key: string;
  rating: number;
  reason: string;
  reasonText: string;
  migrationList: ClusterDrsMigration[];
}
export interface ClusterDrsVmConfigInfo extends DynamicData {
  key: VirtualMachine;
  enabled?: boolean;
  behavior?: DrsBehavior;
}
export interface ClusterEVCManagerCheckResult extends DynamicData {
  evcModeKey: string;
  error: MethodFault;
  host?: HostSystem[];
}
export interface ClusterEVCManagerEVCState extends DynamicData {
  supportedEVCMode: EVCMode[];
  currentEVCModeKey?: string;
  guaranteedCPUFeatures?: HostCpuIdInfo[];
  featureCapability?: HostFeatureCapability[];
  featureMask?: HostFeatureMask[];
  featureRequirement?: VirtualMachineFeatureRequirement[];
}
export interface ClusterEnterMaintenanceResult extends DynamicData {
  recommendations?: ClusterRecommendation[];
  fault?: ClusterDrsFaults;
}
export interface ClusterFailoverHostAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  failoverHosts?: HostSystem[];
  failoverLevel?: number;
}
export interface ClusterFailoverLevelAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  currentFailoverLevel: number;
}
export interface ClusterFailoverLevelAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  failoverLevel: number;
  slotPolicy?: ClusterSlotPolicy;
}
export interface ClusterFailoverResourcesAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  currentCpuFailoverResourcesPercent: number;
  currentMemoryFailoverResourcesPercent: number;
}
export interface ClusterFailoverResourcesAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  cpuFailoverResourcesPercent: number;
  memoryFailoverResourcesPercent: number;
  failoverLevel?: number;
  autoComputePercentages?: boolean;
}
export interface ClusterGroupInfo extends DynamicData {
  name: string;
  userCreated?: boolean;
  uniqueID?: string;
}
export interface ClusterHostGroup extends ClusterGroupInfo {
  host?: HostSystem[];
}
export interface ClusterHostInfraUpdateHaModeAction extends ClusterAction {
  operationType: string;
}
export interface ClusterHostPowerAction extends ClusterAction {
  operationType: HostPowerOperationType;
  powerConsumptionWatt?: number;
  cpuCapacityMHz?: number;
  memCapacityMB?: number;
}
export interface ClusterHostRecommendation extends DynamicData {
  host: HostSystem;
  rating: number;
}
export interface ClusterInfraUpdateHaConfigInfo extends DynamicData {
  enabled?: boolean;
  behavior?: string;
  moderateRemediation?: string;
  severeRemediation?: string;
  providers?: string[];
}
export interface ClusterInitialPlacementAction extends ClusterAction {
  targetHost: HostSystem;
  pool?: ResourcePool;
}
export interface ClusterMigrationAction extends ClusterAction {
  drsMigration?: ClusterDrsMigration;
}
export interface ClusterNotAttemptedVmInfo extends DynamicData {
  vm: VirtualMachine;
  fault: MethodFault;
}
export interface ClusterOrchestrationInfo extends DynamicData {
  defaultVmReadiness?: ClusterVmReadiness;
}
export interface PlacementAction extends ClusterAction {
  vm?: VirtualMachine;
  targetHost?: HostSystem;
  relocateSpec?: VirtualMachineRelocateSpec;
}
export interface PlacementResult extends DynamicData {
  recommendations?: ClusterRecommendation[];
  drsFault?: ClusterDrsFaults;
}
export interface ClusterPowerOnVmResult extends DynamicData {
  attempted?: ClusterAttemptedVmInfo[];
  notAttempted?: ClusterNotAttemptedVmInfo[];
  recommendations?: ClusterRecommendation[];
}
export interface ClusterProactiveDrsConfigInfo extends DynamicData {
  enabled?: boolean;
}
export interface ClusterRecommendation extends DynamicData {
  key: string;
  type: string;
  time: Date;
  rating: number;
  reason: string;
  reasonText: string;
  warningText?: string;
  warningDetails?: LocalizableMessage;
  prerequisite?: string[];
  action?: ClusterAction[];
  target?: ManagedObject;
}
export interface ClusterResourceUsageSummary extends DynamicData {
  cpuUsedMHz: number;
  cpuCapacityMHz: number;
  memUsedMB: number;
  memCapacityMB: number;
  pMemAvailableMB?: number;
  pMemCapacityMB?: number;
  storageUsedMB: number;
  storageCapacityMB: number;
}
export interface ClusterSlotPolicy extends DynamicData {
  
}
export interface ClusterUsageSummary extends DynamicData {
  totalCpuCapacityMhz: number;
  totalMemCapacityMB: number;
  cpuReservationMhz: number;
  memReservationMB: number;
  poweredOffCpuReservationMhz?: number;
  poweredOffMemReservationMB?: number;
  cpuDemandMhz: number;
  memDemandMB: number;
  statsGenNumber: number;
  cpuEntitledMhz: number;
  memEntitledMB: number;
  poweredOffVmCount: number;
  totalVmCount: number;
}
export interface ClusterVmComponentProtectionSettings extends DynamicData {
  vmStorageProtectionForAPD?: string;
  enableAPDTimeoutForHosts?: boolean;
  vmTerminateDelayForAPDSec?: number;
  vmReactionOnAPDCleared?: string;
  vmStorageProtectionForPDL?: string;
}
export interface ClusterVmGroup extends ClusterGroupInfo {
  vm?: VirtualMachine[];
}
export interface ClusterVmOrchestrationInfo extends DynamicData {
  vm: VirtualMachine;
  vmReadiness: ClusterVmReadiness;
}
export interface ClusterVmReadiness extends DynamicData {
  readyCondition?: string;
  postReadyDelay?: number;
}
export interface ClusterVmToolsMonitoringSettings extends DynamicData {
  enabled?: boolean;
  vmMonitoring?: string;
  clusterSettings?: boolean;
  failureInterval?: number;
  minUpTime?: number;
  maxFailures?: number;
  maxFailureWindow?: number;
}
export interface DistributedVirtualPort extends DynamicData {
  key: string;
  config: DVPortConfigInfo;
  dvsUuid: string;
  portgroupKey?: string;
  proxyHost?: HostSystem;
  connectee?: DistributedVirtualSwitchPortConnectee;
  conflict: boolean;
  conflictPortKey?: string;
  state?: DVPortState;
  connectionCookie?: number;
  lastStatusChange: Date;
  hostLocalPort?: boolean;
  externalId?: string;
  segmentPortId?: string;
}
export interface DVPortConfigInfo extends DynamicData {
  name?: string;
  scope?: ManagedEntity[];
  description?: string;
  setting?: DVPortSetting;
  configVersion: string;
}
export interface DVPortConfigSpec extends DynamicData {
  operation: string;
  key?: string;
  name?: string;
  scope?: ManagedEntity[];
  description?: string;
  setting?: DVPortSetting;
  configVersion?: string;
}
export interface DvsFilterConfig extends InheritablePolicy {
  key?: string;
  agentName?: string;
  slotNumber?: string;
  parameters?: DvsFilterParameter;
  onFailure?: string;
}
export interface DvsFilterConfigSpec extends DvsFilterConfig {
  operation: string;
}
export interface DvsFilterParameter extends DynamicData {
  parameters?: string[];
}
export interface DvsFilterPolicy extends InheritablePolicy {
  filterConfig?: DvsFilterConfig[];
}
export interface DVSHostLocalPortInfo extends DynamicData {
  switchUuid: string;
  portKey: string;
  setting: DVPortSetting;
  vnic: string;
}
export interface DVPortStatus extends DynamicData {
  linkUp: boolean;
  blocked: boolean;
  vlanIds?: NumericRange[];
  trunkingMode?: boolean;
  mtu?: number;
  linkPeer?: string;
  macAddress?: string;
  statusDetail?: string;
  vmDirectPathGen2Active?: boolean;
  vmDirectPathGen2InactiveReasonNetwork?: string[];
  vmDirectPathGen2InactiveReasonOther?: string[];
  vmDirectPathGen2InactiveReasonExtended?: string;
}
export interface DVPortSetting extends DynamicData {
  blocked?: BoolPolicy;
  vmDirectPathGen2Allowed?: BoolPolicy;
  inShapingPolicy?: DVSTrafficShapingPolicy;
  outShapingPolicy?: DVSTrafficShapingPolicy;
  vendorSpecificConfig?: DVSVendorSpecificConfig;
  networkResourcePoolKey?: StringPolicy;
  filterPolicy?: DvsFilterPolicy;
}
export interface DVPortState extends DynamicData {
  runtimeInfo?: DVPortStatus;
  stats: DistributedVirtualSwitchPortStatistics;
  vendorSpecificState?: DistributedVirtualSwitchKeyedOpaqueBlob[];
}
export interface DvsTrafficFilterConfig extends DvsFilterConfig {
  trafficRuleset?: DvsTrafficRuleset;
}
export interface DvsTrafficFilterConfigSpec extends DvsTrafficFilterConfig {
  operation: string;
}
export interface DVSTrafficShapingPolicy extends InheritablePolicy {
  enabled?: BoolPolicy;
  averageBandwidth?: LongPolicy;
  peakBandwidth?: LongPolicy;
  burstSize?: LongPolicy;
}
export interface DVSVendorSpecificConfig extends InheritablePolicy {
  keyValue?: DistributedVirtualSwitchKeyedOpaqueBlob[];
}
export interface DistributedVirtualPortgroupInfo extends DynamicData {
  switchName: string;
  switchUuid: string;
  portgroupName: string;
  portgroupKey: string;
  portgroupType: string;
  uplinkPortgroup: boolean;
  portgroup: DistributedVirtualPortgroup;
  networkReservationSupported?: boolean;
  backingType?: string;
  logicalSwitchUuid?: string;
  segmentId?: string;
}
export interface DVPortgroupSelection extends SelectionSet {
  dvsUuid: string;
  portgroupKey: string[];
}
export interface DistributedVirtualSwitchInfo extends DynamicData {
  switchName: string;
  switchUuid: string;
  distributedVirtualSwitch: DistributedVirtualSwitch;
  networkReservationSupported?: boolean;
}
export interface DVSSelection extends SelectionSet {
  dvsUuid: string;
}
export interface EntityBackup extends DynamicData {
  
}
export interface EntityBackupConfig extends DynamicData {
  entityType: string;
  configBlob: Buffer;
  key?: string;
  name?: string;
  container?: ManagedEntity;
  configVersion?: string;
}
export interface DistributedVirtualSwitchHostMember extends DynamicData {
  runtimeState?: DistributedVirtualSwitchHostMemberRuntimeState;
  config: DistributedVirtualSwitchHostMemberConfigInfo;
  productInfo?: DistributedVirtualSwitchProductSpec;
  uplinkPortKey?: string[];
  status: string;
  statusDetail?: string;
}
export interface DistributedVirtualSwitchHostMemberBacking extends DynamicData {
  
}
export interface DistributedVirtualSwitchHostMemberConfigInfo extends DynamicData {
  host?: HostSystem;
  maxProxySwitchPorts: number;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  backing: DistributedVirtualSwitchHostMemberBacking;
  nsxSwitch?: boolean;
  ensEnabled?: boolean;
  ensInterruptEnabled?: boolean;
  transportZones?: DistributedVirtualSwitchHostMemberTransportZoneInfo[];
  nsxtUsedUplinkNames?: string[];
}
export interface DistributedVirtualSwitchHostMemberConfigSpec extends DynamicData {
  operation: string;
  host: HostSystem;
  backing?: DistributedVirtualSwitchHostMemberBacking;
  maxProxySwitchPorts?: number;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
}
export interface HostMemberHealthCheckResult extends DynamicData {
  summary?: string;
}
export interface DistributedVirtualSwitchHostMemberPnicBacking extends DistributedVirtualSwitchHostMemberBacking {
  pnicSpec?: DistributedVirtualSwitchHostMemberPnicSpec[];
}
export interface DistributedVirtualSwitchHostMemberPnicSpec extends DynamicData {
  pnicDevice: string;
  uplinkPortKey?: string;
  uplinkPortgroupKey?: string;
  connectionCookie?: number;
}
export interface HostMemberRuntimeInfo extends DynamicData {
  host: HostSystem;
  status?: string;
  statusDetail?: string;
  nsxtStatus?: string;
  nsxtStatusDetail?: string;
  healthCheckResult?: HostMemberHealthCheckResult[];
}
export interface DistributedVirtualSwitchHostMemberRuntimeState extends DynamicData {
  currentMaxProxySwitchPorts: number;
}
export interface DistributedVirtualSwitchHostMemberTransportZoneInfo extends DynamicData {
  uuid: string;
  type: string;
}
export interface HostMemberUplinkHealthCheckResult extends HostMemberHealthCheckResult {
  uplinkPortKey: string;
}
export interface DistributedVirtualSwitchHostProductSpec extends DynamicData {
  productLineId?: string;
  version?: string;
}
export interface DistributedVirtualSwitchKeyedOpaqueBlob extends DynamicData {
  key: string;
  opaqueData: string;
}
export interface DVSNetworkResourcePool extends DynamicData {
  key: string;
  name?: string;
  description?: string;
  configVersion: string;
  allocationInfo: DVSNetworkResourcePoolAllocationInfo;
}
export interface DVSNetworkResourcePoolAllocationInfo extends DynamicData {
  limit?: number;
  shares?: SharesInfo;
  priorityTag?: number;
}
export interface DVSNetworkResourcePoolConfigSpec extends DynamicData {
  key: string;
  configVersion?: string;
  allocationInfo?: DVSNetworkResourcePoolAllocationInfo;
  name?: string;
  description?: string;
}
export interface DistributedVirtualSwitchPortConnectee extends DynamicData {
  connectedEntity?: ManagedEntity;
  nicKey?: string;
  type?: string;
  addressHint?: string;
}
export interface DistributedVirtualSwitchPortConnection extends DynamicData {
  switchUuid: string;
  portgroupKey?: string;
  portKey?: string;
  connectionCookie?: number;
}
export interface DistributedVirtualSwitchPortCriteria extends DynamicData {
  connected?: boolean;
  active?: boolean;
  uplinkPort?: boolean;
  nsxPort?: boolean;
  scope?: ManagedEntity;
  portgroupKey?: string[];
  inside?: boolean;
  portKey?: string[];
  host?: HostSystem[];
}
export interface DistributedVirtualSwitchPortStatistics extends DynamicData {
  packetsInMulticast: number;
  packetsOutMulticast: number;
  bytesInMulticast: number;
  bytesOutMulticast: number;
  packetsInUnicast: number;
  packetsOutUnicast: number;
  bytesInUnicast: number;
  bytesOutUnicast: number;
  packetsInBroadcast: number;
  packetsOutBroadcast: number;
  bytesInBroadcast: number;
  bytesOutBroadcast: number;
  packetsInDropped: number;
  packetsOutDropped: number;
  packetsInException: number;
  packetsOutException: number;
  bytesInFromPnic?: number;
  bytesOutToPnic?: number;
}
export interface DistributedVirtualSwitchProductSpec extends DynamicData {
  name?: string;
  vendor?: string;
  version?: string;
  build?: string;
  forwardingClass?: string;
  bundleId?: string;
  bundleUrl?: string;
}
export interface DvsTrafficRule extends DynamicData {
  key?: string;
  description?: string;
  sequence?: number;
  qualifier?: DvsNetworkRuleQualifier[];
  action?: DvsNetworkRuleAction;
  direction?: string;
}
export interface DvsAcceptNetworkRuleAction extends DvsNetworkRuleAction {
  
}
export interface DvsNetworkRuleAction extends DynamicData {
  
}
export interface DvsCopyNetworkRuleAction extends DvsNetworkRuleAction {
  
}
export interface DvsDropNetworkRuleAction extends DvsNetworkRuleAction {
  
}
export interface DvsGreEncapNetworkRuleAction extends DvsNetworkRuleAction {
  encapsulationIp: SingleIp;
}
export interface DvsIpPort extends NegatableExpression {
  
}
export interface DvsIpPortRange extends DvsIpPort {
  startPortNumber: number;
  endPortNumber: number;
}
export interface DvsIpNetworkRuleQualifier extends DvsNetworkRuleQualifier {
  sourceAddress?: IpAddress;
  destinationAddress?: IpAddress;
  protocol?: IntExpression;
  sourceIpPort?: DvsIpPort;
  destinationIpPort?: DvsIpPort;
  tcpFlags?: IntExpression;
}
export interface DvsLogNetworkRuleAction extends DvsNetworkRuleAction {
  
}
export interface DvsMacNetworkRuleQualifier extends DvsNetworkRuleQualifier {
  sourceAddress?: MacAddress;
  destinationAddress?: MacAddress;
  protocol?: IntExpression;
  vlanId?: IntExpression;
}
export interface DvsMacRewriteNetworkRuleAction extends DvsNetworkRuleAction {
  rewriteMac: string;
}
export interface DvsPuntNetworkRuleAction extends DvsNetworkRuleAction {
  
}
export interface DvsNetworkRuleQualifier extends DynamicData {
  key?: string;
}
export interface DvsRateLimitNetworkRuleAction extends DvsNetworkRuleAction {
  packetsPerSecond: number;
}
export interface DvsSingleIpPort extends DvsIpPort {
  portNumber: number;
}
export interface DvsSystemTrafficNetworkRuleQualifier extends DvsNetworkRuleQualifier {
  typeOfSystemTraffic?: StringExpression;
}
export interface DvsUpdateTagNetworkRuleAction extends DvsNetworkRuleAction {
  qosTag?: number;
  dscpTag?: number;
}
export interface DvsTrafficRuleset extends DynamicData {
  key?: string;
  enabled?: boolean;
  precedence?: number;
  rules?: DvsTrafficRule[];
}
export interface DVSVmVnicNetworkResourcePool extends DynamicData {
  key: string;
  name?: string;
  description?: string;
  configVersion: string;
  allocationInfo?: DvsVmVnicResourceAllocation;
}
export interface DvsVmVnicResourcePoolConfigSpec extends DynamicData {
  operation: string;
  key?: string;
  configVersion?: string;
  allocationInfo?: DvsVmVnicResourceAllocation;
  name?: string;
  description?: string;
}
export interface DvsVmVnicResourceAllocation extends DynamicData {
  reservationQuota?: number;
}
export interface DvsVmVnicNetworkResourcePoolRuntimeInfo extends DynamicData {
  key: string;
  name?: string;
  capacity?: number;
  usage?: number;
  available?: number;
  status: string;
  allocatedResource?: DvsVnicAllocatedResource[];
}
export interface DvsVnicAllocatedResource extends DynamicData {
  vm: VirtualMachine;
  vnicKey: string;
  reservation?: number;
}
export interface CryptoKeyId extends DynamicData {
  keyId: string;
  providerId?: KeyProviderId;
}
export interface CryptoKeyPlain extends DynamicData {
  keyId: CryptoKeyId;
  algorithm: string;
  keyData: string;
}
export interface CryptoKeyResult extends DynamicData {
  keyId: CryptoKeyId;
  success: boolean;
  reason?: string;
  fault?: MethodFault;
}
export interface CryptoSpec extends DynamicData {
  
}
export interface CryptoSpecDecrypt extends CryptoSpec {
  
}
export interface CryptoSpecDeepRecrypt extends CryptoSpec {
  newKeyId: CryptoKeyId;
}
export interface CryptoSpecEncrypt extends CryptoSpec {
  cryptoKeyId: CryptoKeyId;
}
export interface CryptoSpecNoOp extends CryptoSpec {
  
}
export interface CryptoSpecRegister extends CryptoSpecNoOp {
  cryptoKeyId: CryptoKeyId;
}
export interface CryptoSpecShallowRecrypt extends CryptoSpec {
  newKeyId: CryptoKeyId;
}
export interface KeyProviderId extends DynamicData {
  id: string;
}
export interface KmipClusterInfo extends DynamicData {
  clusterId: KeyProviderId;
  servers?: KmipServerInfo[];
  useAsDefault: boolean;
  managementType?: string;
  useAsEntityDefault?: ManagedEntity[];
}
export interface KmipServerInfo extends DynamicData {
  name: string;
  address: string;
  port: number;
  proxyAddress?: string;
  proxyPort?: number;
  reconnect?: number;
  protocol?: string;
  nbio?: number;
  timeout?: number;
  userName?: string;
}
export interface KmipServerSpec extends DynamicData {
  clusterId: KeyProviderId;
  info: KmipServerInfo;
  password?: string;
}
export interface ChangesInfoEventArgument extends DynamicData {
  modified?: string;
  added?: string;
  deleted?: string;
}
export interface DvsOutOfSyncHostArgument extends DynamicData {
  outOfSyncHost: HostEventArgument;
  configParamters: string[];
}
export interface Event extends DynamicData {
  key: number;
  chainId: number;
  createdTime: Date;
  userName: string;
  datacenter?: DatacenterEventArgument;
  computeResource?: ComputeResourceEventArgument;
  host?: HostEventArgument;
  vm?: VmEventArgument;
  ds?: DatastoreEventArgument;
  net?: NetworkEventArgument;
  dvs?: DvsEventArgument;
  fullFormattedMessage?: string;
  changeTag?: string;
}
export interface EventArgument extends DynamicData {
  
}
export interface EventDescription extends DynamicData {
  category: ElementDescription[];
  eventInfo: EventDescriptionEventDetail[];
  enumeratedTypes?: EnumDescription[];
}
export interface EventArgDesc extends DynamicData {
  name: string;
  type: string;
  description?: ElementDescription;
}
export interface EventDescriptionEventDetail extends DynamicData {
  key: string;
  description?: string;
  category: string;
  formatOnDatacenter: string;
  formatOnComputeResource: string;
  formatOnHost: string;
  formatOnVm: string;
  fullFormat: string;
  longDescription?: string;
}
export interface EventEx extends Event {
  eventTypeId: string;
  severity?: string;
  message?: string;
  arguments?: KeyAnyValue[];
  objectId?: string;
  objectType?: string;
  objectName?: string;
  fault?: MethodFault;
}
export interface EventFilterSpec extends DynamicData {
  entity?: EventFilterSpecByEntity;
  time?: EventFilterSpecByTime;
  userName?: EventFilterSpecByUsername;
  eventChainId?: number;
  alarm?: Alarm;
  scheduledTask?: ScheduledTask;
  disableFullMessage?: boolean;
  category?: string[];
  type?: string[];
  tag?: string[];
  eventTypeId?: string[];
  maxCount?: number;
}
export interface EventFilterSpecByEntity extends DynamicData {
  entity: ManagedEntity;
  recursion: EventFilterSpecRecursionOption;
}
export interface EventFilterSpecByTime extends DynamicData {
  beginTime?: Date;
  endTime?: Date;
}
export interface EventFilterSpecByUsername extends DynamicData {
  systemUser: boolean;
  userList?: string[];
}
export interface GeneralEvent extends Event {
  message: string;
}
export interface GeneralHostErrorEvent extends GeneralEvent {
  
}
export interface GeneralHostInfoEvent extends GeneralEvent {
  
}
export interface GeneralHostWarningEvent extends GeneralEvent {
  
}
export interface GeneralUserEvent extends GeneralEvent {
  entity?: ManagedEntityEventArgument;
}
export interface GeneralVmErrorEvent extends GeneralEvent {
  
}
export interface GeneralVmInfoEvent extends GeneralEvent {
  
}
export interface GeneralVmWarningEvent extends GeneralEvent {
  
}
export interface HealthStatusChangedEvent extends Event {
  componentId: string;
  oldStatus: string;
  newStatus: string;
  componentName: string;
  serviceId?: string;
}
export interface HostEvent extends Event {
  
}
export interface HostGetShortNameFailedEvent extends HostEvent {
  
}
export interface HostInAuditModeEvent extends HostEvent {
  
}
export interface HostInventoryUnreadableEvent extends Event {
  
}
export interface HostIpChangedEvent extends HostEvent {
  oldIP: string;
  newIP: string;
}
export interface HostIpInconsistentEvent extends HostEvent {
  ipAddress: string;
  ipAddress2: string;
}
export interface HostIpToShortNameFailedEvent extends HostEvent {
  
}
export interface HostNonCompliantEvent extends HostEvent {
  
}
export interface HostProfileAppliedEvent extends HostEvent {
  profile: ProfileEventArgument;
}
export interface HostReconnectionFailedEvent extends HostEvent {
  
}
export interface HostRemovedEvent extends HostEvent {
  
}
export interface HostShortNameToIpFailedEvent extends HostEvent {
  shortName: string;
}
export interface HostShutdownEvent extends HostEvent {
  reason: string;
}
export interface HostSpecificationChangedEvent extends HostEvent {
  
}
export interface HostSpecificationRequireEvent extends HostEvent {
  
}
export interface HostSpecificationUpdateEvent extends HostEvent {
  hostSpec: HostSpecification;
}
export interface HostSubSpecificationDeleteEvent extends HostEvent {
  subSpecName: string;
}
export interface HostSubSpecificationUpdateEvent extends HostEvent {
  hostSubSpec: HostSubSpecification;
}
export interface HostSyncFailedEvent extends HostEvent {
  reason: MethodFault;
}
export interface HostUpgradeFailedEvent extends HostEvent {
  
}
export interface HostUserWorldSwapNotEnabledEvent extends HostEvent {
  
}
export interface HostVnicConnectedToCustomizedDVPortEvent extends HostEvent {
  vnic: VnicPortArgument;
  prevPortKey?: string;
}
export interface HostWwnChangedEvent extends HostEvent {
  oldNodeWwns?: number[];
  oldPortWwns?: number[];
  newNodeWwns?: number[];
  newPortWwns?: number[];
}
export interface HostWwnConflictEvent extends HostEvent {
  conflictedVms?: VmEventArgument[];
  conflictedHosts?: HostEventArgument[];
  wwn: number;
}
export interface LicenseEvent extends Event {
  
}
export interface LicenseExpiredEvent extends Event {
  feature: LicenseFeatureInfo;
}
export interface LicenseNonComplianceEvent extends LicenseEvent {
  url: string;
}
export interface LicenseRestrictedEvent extends LicenseEvent {
  
}
export interface LicenseServerAvailableEvent extends LicenseEvent {
  licenseServer: string;
}
export interface LicenseServerUnavailableEvent extends LicenseEvent {
  licenseServer: string;
}
export interface LocalDatastoreCreatedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
  datastoreUrl?: string;
}
export interface LocalTSMEnabledEvent extends HostEvent {
  
}
export interface LockerMisconfiguredEvent extends Event {
  datastore: DatastoreEventArgument;
}
export interface LockerReconfiguredEvent extends Event {
  oldDatastore?: DatastoreEventArgument;
  newDatastore?: DatastoreEventArgument;
}
export interface NASDatastoreCreatedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
  datastoreUrl?: string;
}
export interface NetworkRollbackEvent extends Event {
  methodName: string;
  transactionId: string;
}
export interface NoDatastoresConfiguredEvent extends HostEvent {
  
}
export interface NoLicenseEvent extends LicenseEvent {
  feature: LicenseFeatureInfo;
}
export interface ProfileEvent extends Event {
  profile: ProfileEventArgument;
}
export interface ProfileEventArgument extends EventArgument {
  profile: Profile;
  name: string;
}
export interface ProfileReferenceHostChangedEvent extends ProfileEvent {
  referenceHost?: HostSystem;
  referenceHostName?: string;
  prevReferenceHostName?: string;
}
export interface ProfileRemovedEvent extends ProfileEvent {
  
}
export interface RemoteTSMEnabledEvent extends HostEvent {
  
}
export interface ResourcePoolEvent extends Event {
  resourcePool: ResourcePoolEventArgument;
}
export interface ResourcePoolMovedEvent extends ResourcePoolEvent {
  oldParent: ResourcePoolEventArgument;
  newParent: ResourcePoolEventArgument;
}
export interface ResourcePoolReconfiguredEvent extends ResourcePoolEvent {
  configChanges?: ChangesInfoEventArgument;
}
export interface ResourceViolatedEvent extends ResourcePoolEvent {
  
}
export interface RoleEventArgument extends EventArgument {
  roleId: number;
  name: string;
}
export interface ScheduledTaskEvent extends Event {
  scheduledTask: ScheduledTaskEventArgument;
  entity: ManagedEntityEventArgument;
}
export interface ScheduledTaskFailedEvent extends ScheduledTaskEvent {
  reason: MethodFault;
}
export interface ScheduledTaskReconfiguredEvent extends ScheduledTaskEvent {
  configChanges?: ChangesInfoEventArgument;
}
export interface ScheduledTaskRemovedEvent extends ScheduledTaskEvent {
  
}
export interface ScheduledTaskStartedEvent extends ScheduledTaskEvent {
  
}
export interface ServerLicenseExpiredEvent extends LicenseEvent {
  product: string;
}
export interface SessionEvent extends Event {
  
}
export interface SessionTerminatedEvent extends SessionEvent {
  sessionId: string;
  terminatedUsername: string;
}
export interface TaskEvent extends Event {
  info: TaskInfo;
}
export interface TaskTimeoutEvent extends TaskEvent {
  
}
export interface TemplateUpgradeEvent extends Event {
  legacyTemplate: string;
}
export interface TemplateUpgradeFailedEvent extends TemplateUpgradeEvent {
  reason: MethodFault;
}
export interface TemplateUpgradedEvent extends TemplateUpgradeEvent {
  
}
export interface TimedOutHostOperationEvent extends HostEvent {
  
}
export interface UnlicensedVirtualMachinesEvent extends LicenseEvent {
  unlicensed: number;
  available: number;
}
export interface UnlicensedVirtualMachinesFoundEvent extends LicenseEvent {
  available: number;
}
export interface UpdatedAgentBeingRestartedEvent extends HostEvent {
  
}
export interface UpgradeEvent extends Event {
  message: string;
}
export interface UserAssignedToGroup extends HostEvent {
  userLogin: string;
  group: string;
}
export interface UserLoginSessionEvent extends SessionEvent {
  ipAddress: string;
  userAgent?: string;
  locale: string;
  sessionId: string;
}
export interface UserLogoutSessionEvent extends SessionEvent {
  ipAddress?: string;
  userAgent?: string;
  callCount?: number;
  sessionId?: string;
  loginTime?: Date;
}
export interface UserPasswordChanged extends HostEvent {
  userLogin: string;
}
export interface UserUnassignedFromGroup extends HostEvent {
  userLogin: string;
  group: string;
}
export interface UserUpgradeEvent extends UpgradeEvent {
  
}
export interface VMFSDatastoreCreatedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
  datastoreUrl?: string;
}
export interface VMFSDatastoreExpandedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}
export interface VMFSDatastoreExtendedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}
export interface VMotionLicenseExpiredEvent extends LicenseEvent {
  
}
export interface VcAgentUninstallFailedEvent extends HostEvent {
  reason?: string;
}
export interface VcAgentUninstalledEvent extends HostEvent {
  
}
export interface VcAgentUpgradeFailedEvent extends HostEvent {
  reason?: string;
}
export interface VcAgentUpgradedEvent extends HostEvent {
  
}
export interface VimAccountPasswordChangedEvent extends HostEvent {
  
}
export interface VmEvent extends Event {
  template: boolean;
}
export interface VmFailedMigrateEvent extends VmEvent {
  destHost: HostEventArgument;
  reason: MethodFault;
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
}
export interface VmFailedRelayoutEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedRelayoutOnVmfs2DatastoreEvent extends VmEvent {
  
}
export interface VmFailedStartingSecondaryEvent extends VmEvent {
  reason?: string;
}
export interface VmFailedToPowerOffEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedToPowerOnEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedToRebootGuestEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedToResetEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedToShutdownGuestEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedToStandbyGuestEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedToSuspendEvent extends VmEvent {
  reason: MethodFault;
}
export interface VmFailedUpdatingSecondaryConfig extends VmEvent {
  
}
export interface VmFailoverFailed extends VmEvent {
  reason?: MethodFault;
}
export interface VmFaultToleranceTurnedOffEvent extends VmEvent {
  
}
export interface VmFaultToleranceVmTerminatedEvent extends VmEvent {
  reason?: string;
}
export interface VmGuestOSCrashedEvent extends VmEvent {
  
}
export interface VmGuestRebootEvent extends VmEvent {
  
}
export interface VmGuestShutdownEvent extends VmEvent {
  
}
export interface VmGuestStandbyEvent extends VmEvent {
  
}
export interface VmInstanceUuidAssignedEvent extends VmEvent {
  instanceUuid: string;
}
export interface VmInstanceUuidChangedEvent extends VmEvent {
  oldInstanceUuid: string;
  newInstanceUuid: string;
}
export interface VmInstanceUuidConflictEvent extends VmEvent {
  conflictedVm: VmEventArgument;
  instanceUuid: string;
}
export interface VmMacAssignedEvent extends VmEvent {
  adapter: string;
  mac: string;
}
export interface VmMacChangedEvent extends VmEvent {
  adapter: string;
  oldMac: string;
  newMac: string;
}
export interface VmMacConflictEvent extends VmEvent {
  conflictedVm: VmEventArgument;
  mac: string;
}
export interface VmMaxFTRestartCountReached extends VmEvent {
  
}
export interface VmMaxRestartCountReached extends VmEvent {
  
}
export interface VmMessageErrorEvent extends VmEvent {
  message: string;
  messageInfo?: VirtualMachineMessage[];
}
export interface VmMessageEvent extends VmEvent {
  message: string;
  messageInfo?: VirtualMachineMessage[];
}
export interface VmMessageWarningEvent extends VmEvent {
  message: string;
  messageInfo?: VirtualMachineMessage[];
}
export interface VmMigratedEvent extends VmEvent {
  sourceHost: HostEventArgument;
  sourceDatacenter?: DatacenterEventArgument;
  sourceDatastore?: DatastoreEventArgument;
}
export interface VmNoCompatibleHostForSecondaryEvent extends VmEvent {
  
}
export interface VmNoNetworkAccessEvent extends VmEvent {
  destHost: HostEventArgument;
}
export interface VmOrphanedEvent extends VmEvent {
  
}
export interface VmPoweredOffEvent extends VmEvent {
  
}
export interface VmPoweredOnEvent extends VmEvent {
  
}
export interface VmPoweringOnWithCustomizedDVPortEvent extends VmEvent {
  vnic: VnicPortArgument[];
}
export interface VmPrimaryFailoverEvent extends VmEvent {
  reason?: string;
}
export interface VmReconfiguredEvent extends VmEvent {
  configSpec: VirtualMachineConfigSpec;
  configChanges?: ChangesInfoEventArgument;
}
export interface VmRegisteredEvent extends VmEvent {
  
}
export interface VmRelayoutSuccessfulEvent extends VmEvent {
  
}
export interface VmRelayoutUpToDateEvent extends VmEvent {
  
}
export interface VmReloadFromPathEvent extends VmEvent {
  configPath: string;
}
export interface VmReloadFromPathFailedEvent extends VmEvent {
  configPath: string;
}
export interface VmRelocateSpecEvent extends VmEvent {
  
}
export interface VmRelocatedEvent extends VmRelocateSpecEvent {
  sourceHost: HostEventArgument;
  sourceDatacenter?: DatacenterEventArgument;
  sourceDatastore?: DatastoreEventArgument;
}
export interface VmRemoteConsoleConnectedEvent extends VmEvent {
  
}
export interface VmRemoteConsoleDisconnectedEvent extends VmEvent {
  
}
export interface VmRemovedEvent extends VmEvent {
  
}
export interface VmRenamedEvent extends VmEvent {
  oldName: string;
  newName: string;
}
export interface VmRequirementsExceedCurrentEVCModeEvent extends VmEvent {
  
}
export interface VmResettingEvent extends VmEvent {
  
}
export interface VmResourcePoolMovedEvent extends VmEvent {
  oldParent: ResourcePoolEventArgument;
  newParent: ResourcePoolEventArgument;
}
export interface VmResourceReallocatedEvent extends VmEvent {
  configChanges?: ChangesInfoEventArgument;
}
export interface VmRestartedOnAlternateHostEvent extends VmPoweredOnEvent {
  sourceHost: HostEventArgument;
}
export interface VmResumingEvent extends VmEvent {
  
}
export interface VmSecondaryAddedEvent extends VmEvent {
  
}
export interface VmSecondaryDisabledBySystemEvent extends VmEvent {
  reason?: MethodFault;
}
export interface VmSecondaryDisabledEvent extends VmEvent {
  
}
export interface VmSecondaryEnabledEvent extends VmEvent {
  
}
export interface VmSecondaryStartedEvent extends VmEvent {
  
}
export interface VmShutdownOnIsolationEvent extends VmPoweredOffEvent {
  isolatedHost: HostEventArgument;
  shutdownResult?: string;
}
export interface VmStartRecordingEvent extends VmEvent {
  
}
export interface VmStartReplayingEvent extends VmEvent {
  
}
export interface VmStartingEvent extends VmEvent {
  
}
export interface VmStartingSecondaryEvent extends VmEvent {
  
}
export interface VmStaticMacConflictEvent extends VmEvent {
  conflictedVm: VmEventArgument;
  mac: string;
}
export interface VmStoppingEvent extends VmEvent {
  
}
export interface VmSuspendedEvent extends VmEvent {
  
}
export interface VmSuspendingEvent extends VmEvent {
  
}
export interface VmTimedoutStartingSecondaryEvent extends VmEvent {
  timeout?: number;
}
export interface VmUnsupportedStartingEvent extends VmStartingEvent {
  guestId: string;
}
export interface VmUpgradeCompleteEvent extends VmEvent {
  version: string;
}
export interface VmUpgradeFailedEvent extends VmEvent {
  
}
export interface VmUpgradingEvent extends VmEvent {
  version: string;
}
export interface VmUuidAssignedEvent extends VmEvent {
  uuid: string;
}
export interface VmUuidChangedEvent extends VmEvent {
  oldUuid: string;
  newUuid: string;
}
export interface VmUuidConflictEvent extends VmEvent {
  conflictedVm: VmEventArgument;
  uuid: string;
}
export interface VmWwnAssignedEvent extends VmEvent {
  nodeWwns: number[];
  portWwns: number[];
}
export interface VmWwnChangedEvent extends VmEvent {
  oldNodeWwns?: number[];
  oldPortWwns?: number[];
  newNodeWwns?: number[];
  newPortWwns?: number[];
}
export interface VmWwnConflictEvent extends VmEvent {
  conflictedVms?: VmEventArgument[];
  conflictedHosts?: HostEventArgument[];
  wwn: number;
}
export interface VnicPortArgument extends DynamicData {
  vnic: string;
  port: DistributedVirtualSwitchPortConnection;
}
export interface WarningUpgradeEvent extends UpgradeEvent {
  
}
export interface IScsiBootFailureEvent extends HostEvent {
  
}
export interface ExtExtendedProductInfo extends DynamicData {
  companyUrl?: string;
  productUrl?: string;
  managementUrl?: string;
  self?: ManagedEntity;
}
export interface ManagedByInfo extends DynamicData {
  extensionKey: string;
  type: string;
}
export interface ExtManagedEntityInfo extends DynamicData {
  type: string;
  smallIconUrl?: string;
  iconUrl?: string;
  description?: string;
}
export interface ExtSolutionManagerInfo extends DynamicData {
  tab?: ExtSolutionManagerInfoTabInfo[];
  smallIconUrl?: string;
}
export interface ExtSolutionManagerInfoTabInfo extends DynamicData {
  label: string;
  url: string;
}
export interface CannotDisableDrsOnClustersWithVApps extends RuntimeFault {
  
}
export interface ConflictingDatastoreFound extends RuntimeFault {
  name: string;
  url: string;
}
export interface DatabaseError extends RuntimeFault {
  
}
export interface DisallowedChangeByService extends RuntimeFault {
  serviceName: string;
  disallowedChange?: string;
}
export interface DisallowedOperationOnFailoverHost extends RuntimeFault {
  host: HostSystem;
  hostname: string;
}
export interface ExpiredFeatureLicense extends NotEnoughLicenses {
  feature: string;
  count: number;
  expirationDate: Date;
}
export interface FailToLockFaultToleranceVMs extends RuntimeFault {
  vmName: string;
  vm: VirtualMachine;
  alreadyLockedVm: VirtualMachine;
}
export interface HostAccessRestrictedToManagementServer extends NotSupported {
  managementServer: string;
}
export interface HostInventoryFull extends NotEnoughLicenses {
  capacity: number;
}
export interface InUseFeatureManipulationDisallowed extends NotEnoughLicenses {
  
}
export interface IncompatibleSetting extends InvalidArgument {
  conflictingProperty: string;
}
export interface IncorrectHostInformation extends NotEnoughLicenses {
  
}
export interface InvalidDasConfigArgument extends InvalidArgument {
  entry?: string;
  clusterName?: string;
}
export interface InvalidDasRestartPriorityForFtVm extends InvalidArgument {
  vm: VirtualMachine;
  vmName: string;
}
export interface InvalidDrsBehaviorForFtVm extends InvalidArgument {
  vm: VirtualMachine;
  vmName: string;
}
export interface InvalidEditionLicense extends NotEnoughLicenses {
  feature: string;
}
export interface InvalidIndexArgument extends InvalidArgument {
  key: string;
}
export interface InvalidProfileReferenceHost extends RuntimeFault {
  reason?: string;
  host?: HostSystem;
  profile?: Profile;
  profileName?: string;
}
export interface InventoryHasStandardAloneHosts extends NotEnoughLicenses {
  hosts: string[];
}
export interface LicenseAssignmentFailed extends RuntimeFault {
  reason?: string;
}
export interface LicenseDowngradeDisallowed extends NotEnoughLicenses {
  edition: string;
  entityId: string;
  features: KeyAnyValue[];
}
export interface LicenseExpired extends NotEnoughLicenses {
  licenseKey: string;
}
export interface LicenseKeyEntityMismatch extends NotEnoughLicenses {
  
}
export interface LicenseRestricted extends NotEnoughLicenses {
  
}
export interface LicenseSourceUnavailable extends NotEnoughLicenses {
  licenseSource: LicenseSource;
}
export interface MethodAlreadyDisabledFault extends RuntimeFault {
  sourceId: string;
}
export interface MethodDisabled extends RuntimeFault {
  source?: string;
}
export interface NoLicenseServerConfigured extends NotEnoughLicenses {
  
}
export interface NoPermission extends SecurityError {
  object: ManagedObject;
  privilegeId: string;
}
export interface NotAuthenticated extends NoPermission {
  
}
export interface OperationDisallowedOnHost extends RuntimeFault {
  
}
export interface RestrictedByAdministrator extends RuntimeFault {
  details: string;
}
export interface RestrictedVersion extends SecurityError {
  
}
export interface SolutionUserRequired extends SecurityError {
  
}
export interface ThirdPartyLicenseAssignmentFailed extends RuntimeFault {
  host: HostSystem;
  module: string;
  reason?: string;
}
export interface VAppOperationInProgress extends RuntimeFault {
  
}
export interface VimFault extends MethodFault {
  
}
export interface VmConfigFault extends VimFault {
  
}
export interface VmConfigIncompatibleForFaultTolerance extends VmConfigFault {
  fault?: MethodFault;
}
export interface VmConfigIncompatibleForRecordReplay extends VmConfigFault {
  fault?: MethodFault;
}
export interface VmFaultToleranceIssue extends VimFault {
  
}
export interface VmFaultToleranceOpIssuesList extends VmFaultToleranceIssue {
  errors?: MethodFault[];
  warnings?: MethodFault[];
}
export interface VmHostAffinityRuleViolation extends VmConfigFault {
  vmName: string;
  hostName: string;
}
export interface VmLimitLicense extends NotEnoughLicenses {
  limit: number;
}
export interface VmMetadataManagerFault extends VimFault {
  
}
export interface VmMonitorIncompatibleForFaultTolerance extends VimFault {
  
}
export interface VmToolsUpgradeFault extends VimFault {
  
}
export interface VmValidateMaxDevice extends VimFault {
  device: string;
  max: number;
  count: number;
}
export interface VramLimitLicense extends NotEnoughLicenses {
  limit: number;
}
export interface VsanFault extends VimFault {
  
}
export interface WipeDiskFault extends VimFault {
  
}
export interface HostActiveDirectory extends DynamicData {
  changeOperation: string;
  spec?: HostActiveDirectorySpec;
}
export interface HostActiveDirectorySpec extends DynamicData {
  domainName?: string;
  userName?: string;
  password?: string;
  camServer?: string;
  thumbprint?: string;
  smartCardAuthenticationEnabled?: boolean;
  smartCardTrustAnchors?: string[];
}
export interface HostAssignableHardwareBinding extends DynamicData {
  instanceId: string;
  vm: VirtualMachine;
}
export interface HostAssignableHardwareConfig extends DynamicData {
  attributeOverride?: HostAssignableHardwareConfigAttributeOverride[];
}
export interface HostAssignableHardwareConfigAttributeOverride extends DynamicData {
  instanceId: string;
  name: string;
  value?: any;
}
export interface HostAuthenticationManagerInfo extends DynamicData {
  authConfig: HostAuthenticationStoreInfo[];
}
export interface HostAuthenticationStoreInfo extends DynamicData {
  enabled: boolean;
}
export interface AutoStartPowerInfo extends DynamicData {
  key: VirtualMachine;
  startOrder: number;
  startDelay: number;
  waitForHeartbeat: AutoStartWaitHeartbeatSetting;
  startAction: string;
  stopDelay: number;
  stopAction: string;
}
export interface HostAutoStartManagerConfig extends DynamicData {
  defaults?: AutoStartDefaults;
  powerInfo?: AutoStartPowerInfo[];
}
export interface AutoStartDefaults extends DynamicData {
  enabled?: boolean;
  startDelay?: number;
  stopDelay?: number;
  waitForHeartbeat?: boolean;
  stopAction?: string;
}
export interface HostBIOSInfo extends DynamicData {
  biosVersion?: string;
  releaseDate?: Date;
  vendor?: string;
  majorRelease?: number;
  minorRelease?: number;
  firmwareMajorRelease?: number;
  firmwareMinorRelease?: number;
}
export interface HostBootDevice extends DynamicData {
  key: string;
  description: string;
}
export interface HostCacheConfigurationInfo extends DynamicData {
  key: Datastore;
  swapSize: number;
}
export interface HostCacheConfigurationSpec extends DynamicData {
  datastore: Datastore;
  swapSize: number;
}
export interface HostCapability extends DynamicData {
  recursiveResourcePoolsSupported: boolean;
  cpuMemoryResourceConfigurationSupported: boolean;
  rebootSupported: boolean;
  shutdownSupported: boolean;
  vmotionSupported: boolean;
  standbySupported: boolean;
  ipmiSupported?: boolean;
  maxSupportedVMs?: number;
  maxRunningVMs?: number;
  maxSupportedVcpus?: number;
  maxRegisteredVMs?: number;
  datastorePrincipalSupported: boolean;
  sanSupported: boolean;
  nfsSupported: boolean;
  iscsiSupported: boolean;
  vlanTaggingSupported: boolean;
  nicTeamingSupported: boolean;
  highGuestMemSupported: boolean;
  maintenanceModeSupported: boolean;
  suspendedRelocateSupported: boolean;
  restrictedSnapshotRelocateSupported: boolean;
  perVmSwapFiles: boolean;
  localSwapDatastoreSupported: boolean;
  unsharedSwapVMotionSupported: boolean;
  backgroundSnapshotsSupported: boolean;
  preAssignedPCIUnitNumbersSupported: boolean;
  screenshotSupported: boolean;
  scaledScreenshotSupported: boolean;
  storageVMotionSupported: boolean;
  vmotionWithStorageVMotionSupported: boolean;
  vmotionAcrossNetworkSupported?: boolean;
  maxNumDisksSVMotion?: number;
  hbrNicSelectionSupported: boolean;
  vrNfcNicSelectionSupported: boolean;
  recordReplaySupported: boolean;
  ftSupported: boolean;
  replayUnsupportedReason?: string;
  replayCompatibilityIssues?: string[];
  smpFtSupported: boolean;
  ftCompatibilityIssues?: string[];
  smpFtCompatibilityIssues?: string[];
  maxVcpusPerFtVm?: number;
  loginBySSLThumbprintSupported?: boolean;
  cloneFromSnapshotSupported: boolean;
  deltaDiskBackingsSupported: boolean;
  perVMNetworkTrafficShapingSupported: boolean;
  tpmSupported: boolean;
  tpmVersion?: string;
  txtEnabled?: boolean;
  supportedCpuFeature?: HostCpuIdInfo[];
  virtualExecUsageSupported: boolean;
  storageIORMSupported: boolean;
  vmDirectPathGen2Supported: boolean;
  vmDirectPathGen2UnsupportedReason?: string[];
  vmDirectPathGen2UnsupportedReasonExtended?: string;
  supportedVmfsMajorVersion?: number[];
  vStorageCapable: boolean;
  snapshotRelayoutSupported: boolean;
  firewallIpRulesSupported?: boolean;
  servicePackageInfoSupported?: boolean;
  maxHostRunningVms?: number;
  maxHostSupportedVcpus?: number;
  vmfsDatastoreMountCapable: boolean;
  eightPlusHostVmfsSharedAccessSupported: boolean;
  nestedHVSupported: boolean;
  vPMCSupported: boolean;
  interVMCommunicationThroughVMCISupported: boolean;
  scheduledHardwareUpgradeSupported?: boolean;
  featureCapabilitiesSupported: boolean;
  latencySensitivitySupported: boolean;
  storagePolicySupported?: boolean;
  accel3dSupported: boolean;
  reliableMemoryAware?: boolean;
  multipleNetworkStackInstanceSupported?: boolean;
  messageBusProxySupported?: boolean;
  vsanSupported?: boolean;
  vFlashSupported?: boolean;
  hostAccessManagerSupported?: boolean;
  provisioningNicSelectionSupported: boolean;
  nfs41Supported?: boolean;
  nfs41Krb5iSupported?: boolean;
  turnDiskLocatorLedSupported?: boolean;
  virtualVolumeDatastoreSupported?: boolean;
  markAsSsdSupported?: boolean;
  markAsLocalSupported?: boolean;
  smartCardAuthenticationSupported?: boolean;
  pMemSupported?: boolean;
  pMemSnapshotSupported?: boolean;
  cryptoSupported?: boolean;
  oneKVolumeAPIsSupported?: boolean;
  gatewayOnNicSupported?: boolean;
  upitSupported?: boolean;
  cpuHwMmuSupported?: boolean;
  encryptedVMotionSupported?: boolean;
  encryptionChangeOnAddRemoveSupported?: boolean;
  encryptionHotOperationSupported?: boolean;
  encryptionWithSnapshotsSupported?: boolean;
  encryptionFaultToleranceSupported?: boolean;
  encryptionMemorySaveSupported?: boolean;
  encryptionRDMSupported?: boolean;
  encryptionVFlashSupported?: boolean;
  encryptionCBRCSupported?: boolean;
  encryptionHBRSupported?: boolean;
  ftEfiSupported?: boolean;
  unmapMethodSupported?: string;
  maxMemMBPerFtVm?: number;
  virtualMmuUsageIgnored?: boolean;
  virtualExecUsageIgnored?: boolean;
  vmCreateDateSupported?: boolean;
  vmfs3EOLSupported?: boolean;
  ftVmcpSupported?: boolean;
  quickBootSupported?: boolean;
  assignableHardwareSupported?: boolean;
  useFeatureReqsForOldHWv?: boolean;
  markPerenniallyReservedSupported?: boolean;
  hppPspSupported?: boolean;
  deviceRebindWithoutRebootSupported?: boolean;
  storagePolicyChangeSupported?: boolean;
  precisionTimeProtocolSupported?: boolean;
  remoteDeviceVMotionSupported?: boolean;
  maxSupportedVmMemory?: number;
}
export interface HostCertificateManagerCertificateInfo extends DynamicData {
  issuer?: string;
  notBefore?: Date;
  notAfter?: Date;
  subject?: string;
  status: string;
}
export interface HostConfigChange extends DynamicData {
  
}
export interface HostConfigManager extends DynamicData {
  cpuScheduler?: HostCpuSchedulerSystem;
  datastoreSystem?: HostDatastoreSystem;
  memoryManager?: HostMemorySystem;
  storageSystem?: HostStorageSystem;
  networkSystem?: HostNetworkSystem;
  vmotionSystem?: HostVMotionSystem;
  virtualNicManager?: HostVirtualNicManager;
  serviceSystem?: HostServiceSystem;
  firewallSystem?: HostFirewallSystem;
  advancedOption?: OptionManager;
  diagnosticSystem?: HostDiagnosticSystem;
  autoStartManager?: HostAutoStartManager;
  snmpSystem?: HostSnmpSystem;
  dateTimeSystem?: HostDateTimeSystem;
  patchManager?: HostPatchManager;
  imageConfigManager?: HostImageConfigManager;
  bootDeviceSystem?: HostBootDeviceSystem;
  firmwareSystem?: HostFirmwareSystem;
  healthStatusSystem?: HostHealthStatusSystem;
  pciPassthruSystem?: HostPciPassthruSystem;
  licenseManager?: LicenseManager;
  kernelModuleSystem?: HostKernelModuleSystem;
  authenticationManager?: HostAuthenticationManager;
  powerSystem?: HostPowerSystem;
  cacheConfigurationManager?: HostCacheConfigurationManager;
  esxAgentHostManager?: HostEsxAgentHostManager;
  iscsiManager?: IscsiManager;
  vFlashManager?: HostVFlashManager;
  vsanSystem?: HostVsanSystem;
  messageBusProxy?: MessageBusProxy;
  userDirectory?: UserDirectory;
  accountManager?: HostLocalAccountManager;
  hostAccessManager?: HostAccessManager;
  graphicsManager?: HostGraphicsManager;
  vsanInternalSystem?: HostVsanInternalSystem;
  certificateManager?: HostCertificateManager;
  cryptoManager?: CryptoManager;
  nvdimmSystem?: HostNvdimmSystem;
  assignableHardwareManager?: HostAssignableHardwareManager;
}
export interface HostCpuIdInfo extends DynamicData {
  level: number;
  vendor?: string;
  eax?: string;
  ebx?: string;
  ecx?: string;
  edx?: string;
}
export interface HostCpuInfo extends DynamicData {
  numCpuPackages: number;
  numCpuCores: number;
  numCpuThreads: number;
  hz: number;
}
export interface HostCpuPackage extends DynamicData {
  index: number;
  vendor: string;
  hz: number;
  busHz: number;
  description: string;
  threadId: number[];
  cpuFeature?: HostCpuIdInfo[];
}
export interface HostCpuPowerManagementInfo extends DynamicData {
  currentPolicy?: string;
  hardwareSupport?: string;
}
export interface HostHyperThreadScheduleInfo extends DynamicData {
  available: boolean;
  active: boolean;
  config: boolean;
}
export interface FileInfo extends DynamicData {
  path: string;
  friendlyName?: string;
  fileSize?: number;
  modification?: Date;
  owner?: string;
}
export interface FileQueryFlags extends DynamicData {
  fileType: boolean;
  fileSize: boolean;
  modification: boolean;
  fileOwner: boolean;
}
export interface FloppyImageFileInfo extends FileInfo {
  
}
export interface FloppyImageFileQuery extends FileQuery {
  
}
export interface FolderFileInfo extends FileInfo {
  
}
export interface FolderFileQuery extends FileQuery {
  
}
export interface IsoImageFileInfo extends FileInfo {
  
}
export interface IsoImageFileQuery extends FileQuery {
  
}
export interface FileQuery extends DynamicData {
  
}
export interface HostDatastoreBrowserSearchResults extends DynamicData {
  datastore?: Datastore;
  folderPath?: string;
  file?: FileInfo[];
}
export interface HostDatastoreBrowserSearchSpec extends DynamicData {
  query?: FileQuery[];
  details?: FileQueryFlags;
  searchCaseInsensitive?: boolean;
  matchPattern?: string[];
  sortFoldersFirst?: boolean;
}
export interface TemplateConfigFileInfo extends VmConfigFileInfo {
  
}
export interface TemplateConfigFileQuery extends VmConfigFileQuery {
  
}
export interface VmConfigFileInfo extends FileInfo {
  configVersion?: number;
  encryption?: VmConfigFileEncryptionInfo;
}
export interface VmConfigFileEncryptionInfo extends DynamicData {
  keyId?: CryptoKeyId;
}
export interface VmConfigFileQuery extends FileQuery {
  filter?: VmConfigFileQueryFilter;
  details?: VmConfigFileQueryFlags;
}
export interface VmConfigFileQueryFlags extends DynamicData {
  configVersion: boolean;
  encryption?: boolean;
}
export interface VmConfigFileQueryFilter extends DynamicData {
  matchConfigVersion?: number[];
  encrypted?: boolean;
}
export interface VmDiskFileInfo extends FileInfo {
  diskType?: string;
  capacityKb?: number;
  hardwareVersion?: number;
  controllerType?: string;
  diskExtents?: string[];
  thin?: boolean;
  encryption?: VmDiskFileEncryptionInfo;
}
export interface VmDiskFileEncryptionInfo extends DynamicData {
  keyId?: CryptoKeyId;
}
export interface VmDiskFileQuery extends FileQuery {
  filter?: VmDiskFileQueryFilter;
  details?: VmDiskFileQueryFlags;
}
export interface VmDiskFileQueryFlags extends DynamicData {
  diskType: boolean;
  capacityKb: boolean;
  hardwareVersion: boolean;
  controllerType?: boolean;
  diskExtents?: boolean;
  thin?: boolean;
  encryption?: boolean;
}
export interface VmDiskFileQueryFilter extends DynamicData {
  diskType?: string[];
  matchHardwareVersion?: number[];
  controllerType?: string[];
  thin?: boolean;
  encrypted?: boolean;
}
export interface VmLogFileInfo extends FileInfo {
  
}
export interface VmLogFileQuery extends FileQuery {
  
}
export interface VmNvramFileInfo extends FileInfo {
  
}
export interface VmNvramFileQuery extends FileQuery {
  
}
export interface VmSnapshotFileInfo extends FileInfo {
  
}
export interface VmSnapshotFileQuery extends FileQuery {
  
}
export interface HostDateTimeConfig extends DynamicData {
  timeZone?: string;
  ntpConfig?: HostNtpConfig;
}
export interface HostDateTimeSystemTimeZone extends DynamicData {
  key: string;
  name: string;
  description: string;
  gmtOffset: number;
}
export interface HostDeploymentInfo extends DynamicData {
  bootedFromStatelessCache?: boolean;
}
export interface HostDevice extends DynamicData {
  deviceName: string;
  deviceType: string;
}
export interface HostDhcpService extends DynamicData {
  key: string;
  spec: HostDhcpServiceSpec;
}
export interface HostDhcpServiceConfig extends DynamicData {
  changeOperation?: string;
  key: string;
  spec: HostDhcpServiceSpec;
}
export interface HostDhcpServiceSpec extends DynamicData {
  virtualSwitch: string;
  defaultLeaseDuration: number;
  leaseBeginIp: string;
  leaseEndIp: string;
  maxLeaseDuration: number;
  unlimitedLease: boolean;
  ipSubnetAddr: string;
  ipSubnetMask: string;
}
export interface HostDigestInfo extends DynamicData {
  digestMethod: string;
  digestValue: number[];
  objectName?: string;
}
export interface HostDirectoryStoreInfo extends HostAuthenticationStoreInfo {
  
}
export interface HostDiskConfigurationResult extends DynamicData {
  devicePath?: string;
  success?: boolean;
  fault?: MethodFault;
}
export interface HostDiskDimensions extends DynamicData {
  
}
export interface HostDiskDimensionsChs extends DynamicData {
  cylinder: number;
  head: number;
  sector: number;
}
export interface HostDiskDimensionsLba extends DynamicData {
  blockSize: number;
  block: number;
}
export interface HostDiskPartitionInfo extends DynamicData {
  deviceName: string;
  spec: HostDiskPartitionSpec;
  layout: HostDiskPartitionLayout;
}
export interface HostDiskPartitionBlockRange extends DynamicData {
  partition?: number;
  type: string;
  start: HostDiskDimensionsLba;
  end: HostDiskDimensionsLba;
}
export interface HostDiskPartitionLayout extends DynamicData {
  total?: HostDiskDimensionsLba;
  partition: HostDiskPartitionBlockRange[];
}
export interface HostDiskPartitionAttributes extends DynamicData {
  partition: number;
  startSector: number;
  endSector: number;
  type: string;
  guid?: string;
  logical: boolean;
  attributes: number;
  partitionAlignment?: number;
}
export interface HostDiskPartitionSpec extends DynamicData {
  partitionFormat?: string;
  chs?: HostDiskDimensionsChs;
  totalSectors?: number;
  partition?: HostDiskPartitionAttributes[];
}
export interface HostDnsConfig extends DynamicData {
  dhcp: boolean;
  virtualNicDevice?: string;
  ipv6VirtualNicDevice?: string;
  hostName: string;
  domainName: string;
  address?: string[];
  searchDomain?: string[];
}
export interface HostDnsConfigSpec extends HostDnsConfig {
  virtualNicConnection?: HostVirtualNicConnection;
  virtualNicConnectionV6?: HostVirtualNicConnection;
}
export interface HostEnterMaintenanceResult extends DynamicData {
  vmFaults?: FaultsByVM[];
  hostFaults?: FaultsByHost[];
}
export interface HostEsxAgentHostManagerConfigInfo extends DynamicData {
  agentVmDatastore?: Datastore;
  agentVmNetwork?: Network;
}
export interface HostFaultToleranceManagerComponentHealthInfo extends DynamicData {
  isStorageHealthy: boolean;
  isNetworkHealthy: boolean;
}
export interface FcoeConfig extends DynamicData {
  priorityClass: number;
  sourceMac: string;
  vlanRange: FcoeConfigVlanRange[];
  capabilities: FcoeConfigFcoeCapabilities;
  fcoeActive: boolean;
}
export interface FcoeConfigFcoeCapabilities extends DynamicData {
  priorityClass: boolean;
  sourceMacAddress: boolean;
  vlanRange: boolean;
}
export interface FcoeConfigFcoeSpecification extends DynamicData {
  underlyingPnic: string;
  priorityClass?: number;
  sourceMac?: string;
  vlanRange?: FcoeConfigVlanRange[];
}
export interface FcoeConfigVlanRange extends DynamicData {
  vlanLow: number;
  vlanHigh: number;
}
export interface HostFeatureCapability extends DynamicData {
  key: string;
  featureName: string;
  value: string;
}
export interface HostFeatureMask extends DynamicData {
  key: string;
  featureName: string;
  value: string;
}
export interface HostFeatureVersionInfo extends DynamicData {
  key: string;
  value: string;
}
export interface HostFileAccess extends DynamicData {
  who: string;
  what: string;
}
export interface ModeInfo extends DynamicData {
  browse?: string;
  read: string;
  modify: string;
  use: string;
  admin?: string;
  full: string;
}
export interface HostFileSystemMountInfo extends DynamicData {
  mountInfo: HostMountInfo;
  volume: HostFileSystemVolume;
  vStorageSupport?: string;
}
export interface HostFileSystemVolume extends DynamicData {
  type: string;
  name: string;
  capacity: number;
}
export interface HostFileSystemVolumeInfo extends DynamicData {
  volumeTypeList?: string[];
  mountInfo?: HostFileSystemMountInfo[];
}
export interface HostFirewallInfo extends DynamicData {
  defaultPolicy: HostFirewallDefaultPolicy;
  ruleset?: HostFirewallRuleset[];
}
export interface HostFirewallDefaultPolicy extends DynamicData {
  incomingBlocked?: boolean;
  outgoingBlocked?: boolean;
}
export interface HostFlagInfo extends DynamicData {
  backgroundSnapshotsEnabled?: boolean;
}
export interface HostForceMountedInfo extends DynamicData {
  persist: boolean;
  mounted: boolean;
}
export interface HostGatewaySpec extends DynamicData {
  gatewayType: string;
  gatewayId?: string;
  trustVerificationToken?: string;
  hostAuthParams?: KeyValue[];
}
export interface HostGraphicsConfig extends DynamicData {
  hostDefaultGraphicsType: string;
  sharedPassthruAssignmentPolicy: string;
  deviceType?: HostGraphicsConfigDeviceType[];
}
export interface HostGraphicsConfigDeviceType extends DynamicData {
  deviceId: string;
  graphicsType: string;
}
export interface HostGraphicsInfo extends DynamicData {
  deviceName: string;
  vendorName: string;
  pciId: string;
  graphicsType: string;
  memorySizeInKB: number;
  vm?: VirtualMachine[];
}
export interface HostHardwareInfo extends DynamicData {
  systemInfo: HostSystemInfo;
  cpuPowerManagementInfo?: HostCpuPowerManagementInfo;
  cpuInfo: HostCpuInfo;
  cpuPkg: HostCpuPackage[];
  memorySize: number;
  numaInfo?: HostNumaInfo;
  smcPresent: boolean;
  pciDevice?: HostPciDevice[];
  cpuFeature?: HostCpuIdInfo[];
  biosInfo?: HostBIOSInfo;
  reliableMemoryInfo?: HostReliableMemoryInfo;
  persistentMemoryInfo?: HostPersistentMemoryInfo;
  sgxInfo?: HostSgxInfo;
  sevInfo?: HostSevInfo;
}
export interface HostHardwareStatusInfo extends DynamicData {
  memoryStatusInfo?: HostHardwareElementInfo[];
  cpuStatusInfo?: HostHardwareElementInfo[];
  storageStatusInfo?: HostStorageElementInfo[];
}
export interface HostHardwareElementInfo extends DynamicData {
  name: string;
  status: ElementDescription;
}
export interface HostStorageElementInfo extends HostHardwareElementInfo {
  operationalInfo?: HostStorageOperationalInfo[];
}
export interface HostStorageOperationalInfo extends DynamicData {
  property: string;
  value: string;
}
export interface HealthSystemRuntime extends DynamicData {
  systemHealthInfo?: HostSystemHealthInfo;
  hardwareStatusInfo?: HostHardwareStatusInfo;
}
export interface HostAccessControlEntry extends DynamicData {
  principal: string;
  group: boolean;
  accessMode: HostAccessMode;
}
export interface HostHostBusAdapter extends DynamicData {
  key?: string;
  device: string;
  bus: number;
  status: string;
  model: string;
  driver?: string;
  pci?: string;
  storageProtocol?: string;
}
export interface HostProxySwitch extends DynamicData {
  dvsUuid: string;
  dvsName: string;
  key: string;
  numPorts: number;
  configNumPorts?: number;
  numPortsAvailable: number;
  uplinkPort?: KeyValue[];
  mtu?: number;
  pnic?: PhysicalNic[];
  spec: HostProxySwitchSpec;
  hostLag?: HostProxySwitchHostLagConfig[];
  networkReservationSupported?: boolean;
  nsxtEnabled?: boolean;
  ensEnabled?: boolean;
  ensInterruptEnabled?: boolean;
  transportZones?: DistributedVirtualSwitchHostMemberTransportZoneInfo[];
  nsxUsedUplinkPort?: string[];
  nsxtStatus?: string;
  nsxtStatusDetail?: string;
}
export interface HostProxySwitchConfig extends DynamicData {
  changeOperation?: string;
  uuid: string;
  spec?: HostProxySwitchSpec;
}
export interface HostProxySwitchHostLagConfig extends DynamicData {
  lagKey: string;
  lagName?: string;
  uplinkPort?: KeyValue[];
}
export interface HostProxySwitchSpec extends DynamicData {
  backing?: DistributedVirtualSwitchHostMemberBacking;
}
export interface HostImageProfileSummary extends DynamicData {
  name: string;
  vendor: string;
}
export interface HostIpConfig extends DynamicData {
  dhcp: boolean;
  ipAddress?: string;
  subnetMask?: string;
  ipV6Config?: HostIpConfigIpV6AddressConfiguration;
}
export interface HostIpConfigIpV6Address extends DynamicData {
  ipAddress: string;
  prefixLength: number;
  origin?: string;
  dadState?: string;
  lifetime?: Date;
  operation?: string;
}
export interface HostIpConfigIpV6AddressConfiguration extends DynamicData {
  ipV6Address?: HostIpConfigIpV6Address[];
  autoConfigurationEnabled?: boolean;
  dhcpV6Enabled?: boolean;
}
export interface HostIpRouteConfig extends DynamicData {
  defaultGateway?: string;
  gatewayDevice?: string;
  ipV6DefaultGateway?: string;
  ipV6GatewayDevice?: string;
}
export interface HostIpRouteConfigSpec extends HostIpRouteConfig {
  gatewayDeviceConnection?: HostVirtualNicConnection;
  ipV6GatewayDeviceConnection?: HostVirtualNicConnection;
}
export interface HostIpRouteEntry extends DynamicData {
  network: string;
  prefixLength: number;
  gateway: string;
  deviceName?: string;
}
export interface HostIpRouteOp extends DynamicData {
  changeOperation: string;
  route: HostIpRouteEntry;
}
export interface HostIpRouteTableConfig extends DynamicData {
  ipRoute?: HostIpRouteOp[];
  ipv6Route?: HostIpRouteOp[];
}
export interface HostIpRouteTableInfo extends DynamicData {
  ipRoute?: HostIpRouteEntry[];
  ipv6Route?: HostIpRouteEntry[];
}
export interface HostIpmiInfo extends DynamicData {
  bmcIpAddress?: string;
  bmcMacAddress?: string;
  login?: string;
  password?: string;
}
export interface IscsiDependencyEntity extends DynamicData {
  pnicDevice: string;
  vnicDevice: string;
  vmhbaName: string;
}
export interface IscsiMigrationDependency extends DynamicData {
  migrationAllowed: boolean;
  disallowReason?: IscsiStatus;
  dependency?: IscsiDependencyEntity[];
}
export interface IscsiPortInfo extends DynamicData {
  vnicDevice?: string;
  vnic?: HostVirtualNic;
  pnicDevice?: string;
  pnic?: PhysicalNic;
  switchName?: string;
  switchUuid?: string;
  portgroupName?: string;
  portgroupKey?: string;
  portKey?: string;
  opaqueNetworkId?: string;
  opaqueNetworkType?: string;
  opaqueNetworkName?: string;
  externalId?: string;
  complianceStatus?: IscsiStatus;
  pathStatus?: string;
}
export interface IscsiStatus extends DynamicData {
  reason?: MethodFault[];
}
export interface KernelModuleInfo extends DynamicData {
  id: number;
  name: string;
  version: string;
  filename: string;
  optionString: string;
  loaded: boolean;
  enabled: boolean;
  useCount: number;
  readOnlySection: KernelModuleSectionInfo;
  writableSection: KernelModuleSectionInfo;
  textSection: KernelModuleSectionInfo;
  dataSection: KernelModuleSectionInfo;
  bssSection: KernelModuleSectionInfo;
}
export interface KernelModuleSectionInfo extends DynamicData {
  address: number;
  length?: number;
}
export interface HostLicenseSpec extends DynamicData {
  source?: LicenseSource;
  editionKey?: string;
  disabledFeatureKey?: string[];
  enabledFeatureKey?: string[];
}
export interface LinkDiscoveryProtocolConfig extends DynamicData {
  protocol: string;
  operation: string;
}
export interface HostAccountSpec extends DynamicData {
  id: string;
  password?: string;
  description?: string;
}
export interface HostPosixAccountSpec extends HostAccountSpec {
  posixId?: number;
  shellAccess?: boolean;
}
export interface HostLocalAuthenticationInfo extends HostAuthenticationStoreInfo {
  
}
export interface HostLocalFileSystemVolume extends HostFileSystemVolume {
  device: string;
}
export interface HostLocalFileSystemVolumeSpec extends DynamicData {
  device: string;
  localPath: string;
}
export interface HostLowLevelProvisioningManagerDiskLayoutSpec extends DynamicData {
  controllerType: string;
  busNumber: number;
  unitNumber: number;
  srcFilename: string;
  dstFilename: string;
}
export interface HostLowLevelProvisioningManagerFileDeleteResult extends DynamicData {
  fileName: string;
  fault: MethodFault;
}
export interface HostLowLevelProvisioningManagerFileDeleteSpec extends DynamicData {
  fileName: string;
  fileType: string;
}
export interface HostLowLevelProvisioningManagerFileReserveResult extends DynamicData {
  baseName: string;
  parentDir: string;
  reservedName: string;
}
export interface HostLowLevelProvisioningManagerFileReserveSpec extends DynamicData {
  baseName: string;
  parentDir: string;
  fileType: string;
  storageProfile: string;
}
export interface HostLowLevelProvisioningManagerSnapshotLayoutSpec extends DynamicData {
  id: number;
  srcFilename: string;
  dstFilename: string;
  disk?: HostLowLevelProvisioningManagerDiskLayoutSpec[];
}
export interface HostLowLevelProvisioningManagerVmMigrationStatus extends DynamicData {
  migrationId: number;
  type: string;
  source: boolean;
  consideredSuccessful: boolean;
}
export interface HostLowLevelProvisioningManagerVmRecoveryInfo extends DynamicData {
  version: string;
  biosUUID: string;
  instanceUUID: string;
  ftInfo?: FaultToleranceConfigInfo;
}
export interface HostMaintenanceSpec extends DynamicData {
  vsanMode?: VsanHostDecommissionMode;
  purpose?: string;
}
export interface ServiceConsoleReservationInfo extends DynamicData {
  serviceConsoleReservedCfg: number;
  serviceConsoleReserved: number;
  unreserved: number;
}
export interface VirtualMachineMemoryReservationInfo extends DynamicData {
  virtualMachineMin: number;
  virtualMachineMax: number;
  virtualMachineReserved: number;
  allocationPolicy: string;
}
export interface VirtualMachineMemoryReservationSpec extends DynamicData {
  virtualMachineReserved?: number;
  allocationPolicy?: string;
}
export interface HostMemorySpec extends DynamicData {
  serviceConsoleReservation?: number;
}
export interface HostMountInfo extends DynamicData {
  path?: string;
  accessMode: string;
  mounted?: boolean;
  accessible?: boolean;
  inaccessibleReason?: string;
}
export interface HostMultipathInfo extends DynamicData {
  lun?: HostMultipathInfoLogicalUnit[];
}
export interface HostMultipathInfoFixedLogicalUnitPolicy extends HostMultipathInfoLogicalUnitPolicy {
  prefer: string;
}
export interface HostMultipathInfoHppLogicalUnitPolicy extends HostMultipathInfoLogicalUnitPolicy {
  bytes?: number;
  iops?: number;
  path?: string;
  latencyEvalTime?: number;
  samplingIosPerPath?: number;
}
export interface HostMultipathInfoLogicalUnit extends DynamicData {
  key: string;
  id: string;
  lun: ScsiLun;
  path: HostMultipathInfoPath[];
  policy: HostMultipathInfoLogicalUnitPolicy;
  storageArrayTypePolicy?: HostMultipathInfoLogicalUnitStorageArrayTypePolicy;
}
export interface HostMultipathInfoLogicalUnitPolicy extends DynamicData {
  policy: string;
}
export interface HostMultipathInfoLogicalUnitStorageArrayTypePolicy extends DynamicData {
  policy: string;
}
export interface HostMultipathInfoPath extends DynamicData {
  key: string;
  name: string;
  pathState: string;
  state?: string;
  isWorkingPath?: boolean;
  adapter: HostHostBusAdapter;
  lun: HostMultipathInfoLogicalUnit;
  transport?: HostTargetTransport;
}
export interface HostMultipathStateInfo extends DynamicData {
  path?: HostMultipathStateInfoPath[];
}
export interface HostMultipathStateInfoPath extends DynamicData {
  name: string;
  pathState: string;
}
export interface HostNasVolume extends HostFileSystemVolume {
  remoteHost: string;
  remotePath: string;
  userName?: string;
  remoteHostNames?: string[];
  securityType?: string;
  protocolEndpoint?: boolean;
}
export interface HostNasVolumeConfig extends DynamicData {
  changeOperation?: string;
  spec?: HostNasVolumeSpec;
}
export interface HostNasVolumeSpec extends DynamicData {
  remoteHost: string;
  remotePath: string;
  localPath: string;
  accessMode: string;
  type?: string;
  userName?: string;
  password?: string;
  remoteHostNames?: string[];
  securityType?: string;
}
export interface HostNasVolumeUserInfo extends DynamicData {
  user: string;
}
export interface HostNatService extends DynamicData {
  key: string;
  spec: HostNatServiceSpec;
}
export interface HostNatServiceConfig extends DynamicData {
  changeOperation?: string;
  key: string;
  spec: HostNatServiceSpec;
}
export interface HostNatServiceNameServiceSpec extends DynamicData {
  dnsAutoDetect: boolean;
  dnsPolicy: string;
  dnsRetries: number;
  dnsTimeout: number;
  dnsNameServer?: string[];
  nbdsTimeout: number;
  nbnsRetries: number;
  nbnsTimeout: number;
}
export interface HostNatServicePortForwardSpec extends DynamicData {
  type: string;
  name: string;
  hostPort: number;
  guestPort: number;
  guestIpAddress: string;
}
export interface HostNatServiceSpec extends DynamicData {
  virtualSwitch: string;
  activeFtp: boolean;
  allowAnyOui: boolean;
  configPort: boolean;
  ipGatewayAddress: string;
  udpTimeout: number;
  portForward?: HostNatServicePortForwardSpec[];
  nameService?: HostNatServiceNameServiceSpec;
}
export interface HostNetCapabilities extends DynamicData {
  canSetPhysicalNicLinkSpeed: boolean;
  supportsNicTeaming: boolean;
  nicTeamingPolicy?: string[];
  supportsVlan: boolean;
  usesServiceConsoleNic: boolean;
  supportsNetworkHints: boolean;
  maxPortGroupsPerVswitch?: number;
  vswitchConfigSupported: boolean;
  vnicConfigSupported: boolean;
  ipRouteConfigSupported: boolean;
  dnsConfigSupported: boolean;
  dhcpOnVnicSupported: boolean;
  ipV6Supported: boolean;
  backupNfcNiocSupported?: boolean;
}
export interface HostNetOffloadCapabilities extends DynamicData {
  csumOffload?: boolean;
  tcpSegmentation?: boolean;
  zeroCopyXmit?: boolean;
}
export interface HostNetStackInstance extends DynamicData {
  key?: string;
  name?: string;
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  requestedMaxNumberOfConnections?: number;
  congestionControlAlgorithm?: string;
  ipV6Enabled?: boolean;
  routeTableConfig?: HostIpRouteTableConfig;
}
export interface HostNetworkInfo extends DynamicData {
  vswitch?: HostVirtualSwitch[];
  proxySwitch?: HostProxySwitch[];
  portgroup?: HostPortGroup[];
  pnic?: PhysicalNic[];
  rdmaDevice?: HostRdmaDevice[];
  vnic?: HostVirtualNic[];
  consoleVnic?: HostVirtualNic[];
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  consoleIpRouteConfig?: HostIpRouteConfig;
  routeTableInfo?: HostIpRouteTableInfo;
  dhcp?: HostDhcpService[];
  nat?: HostNatService[];
  ipV6Enabled?: boolean;
  atBootIpV6Enabled?: boolean;
  netStackInstance?: HostNetStackInstance[];
  opaqueSwitch?: HostOpaqueSwitch[];
  opaqueNetwork?: HostOpaqueNetworkInfo[];
  nsxTransportNodeId?: string;
}
export interface HostNetworkPolicy extends DynamicData {
  security?: HostNetworkSecurityPolicy;
  nicTeaming?: HostNicTeamingPolicy;
  offloadPolicy?: HostNetOffloadCapabilities;
  shapingPolicy?: HostNetworkTrafficShapingPolicy;
}
export interface HostNicFailureCriteria extends DynamicData {
  checkSpeed?: string;
  speed?: number;
  checkDuplex?: boolean;
  fullDuplex?: boolean;
  checkErrorPercent?: boolean;
  percentage?: number;
  checkBeacon?: boolean;
}
export interface HostNicOrderPolicy extends DynamicData {
  activeNic?: string[];
  standbyNic?: string[];
}
export interface HostNicTeamingPolicy extends DynamicData {
  policy?: string;
  reversePolicy?: boolean;
  notifySwitches?: boolean;
  rollingOrder?: boolean;
  failureCriteria?: HostNicFailureCriteria;
  nicOrder?: HostNicOrderPolicy;
}
export interface HostNetworkSecurityPolicy extends DynamicData {
  allowPromiscuous?: boolean;
  macChanges?: boolean;
  forgedTransmits?: boolean;
}
export interface HostNetworkTrafficShapingPolicy extends DynamicData {
  enabled?: boolean;
  averageBandwidth?: number;
  peakBandwidth?: number;
  burstSize?: number;
}
export interface HostNtpConfig extends DynamicData {
  server?: string[];
  configFile?: string[];
}
export interface HostNumaInfo extends DynamicData {
  type: string;
  numNodes: number;
  numaNode?: HostNumaNode[];
}
export interface HostNumaNode extends DynamicData {
  typeId: number;
  cpuID: number[];
  memoryRangeBegin: number;
  memoryRangeLength: number;
  pciId?: string[];
}
export interface HostNumericSensorInfo extends DynamicData {
  name: string;
  healthState?: ElementDescription;
  currentReading: number;
  unitModifier: number;
  baseUnits: string;
  rateUnits?: string;
  sensorType: string;
  id?: string;
  timeStamp?: string;
}
export interface NvdimmDimmInfo extends DynamicData {
  dimmHandle: number;
  healthInfo: NvdimmHealthInfo;
  totalCapacity: number;
  persistentCapacity: number;
  availablePersistentCapacity: number;
  volatileCapacity: number;
  availableVolatileCapacity: number;
  blockCapacity: number;
  regionInfo?: NvdimmRegionInfo[];
  representationString: string;
}
export interface NvdimmGuid extends DynamicData {
  uuid: string;
}
export interface NvdimmHealthInfo extends DynamicData {
  healthStatus: string;
  healthInformation: string;
  stateFlagInfo?: string[];
  dimmTemperature: number;
  dimmTemperatureThreshold: number;
  spareBlocksPercentage: number;
  spareBlockThreshold: number;
  dimmLifespanPercentage: number;
  esTemperature?: number;
  esTemperatureThreshold?: number;
  esLifespanPercentage?: number;
}
export interface NvdimmInterleaveSetInfo extends DynamicData {
  setId: number;
  rangeType: string;
  baseAddress: number;
  size: number;
  availableSize: number;
  deviceList?: number[];
  state: string;
}
export interface NvdimmNamespaceCreateSpec extends DynamicData {
  friendlyName?: string;
  blockSize: number;
  blockCount: number;
  type: string;
  locationID: number;
}
export interface NvdimmNamespaceDeleteSpec extends DynamicData {
  uuid: string;
}
export interface NvdimmNamespaceDetails extends DynamicData {
  uuid: string;
  friendlyName: string;
  size: number;
  type: string;
  namespaceHealthStatus: string;
  interleavesetID: number;
  state: string;
}
export interface NvdimmNamespaceInfo extends DynamicData {
  uuid: string;
  friendlyName: string;
  blockSize: number;
  blockCount: number;
  type: string;
  namespaceHealthStatus: string;
  locationID: number;
  state: string;
}
export interface NvdimmSystemInfo extends DynamicData {
  summary?: NvdimmSummary;
  dimms?: number[];
  dimmInfo?: NvdimmDimmInfo[];
  interleaveSet?: number[];
  iSetInfo?: NvdimmInterleaveSetInfo[];
  namespace?: NvdimmGuid[];
  nsInfo?: NvdimmNamespaceInfo[];
  nsDetails?: NvdimmNamespaceDetails[];
}
export interface NvdimmPMemNamespaceCreateSpec extends DynamicData {
  friendlyName?: string;
  size: number;
  interleavesetID: number;
}
export interface NvdimmRegionInfo extends DynamicData {
  regionId: number;
  setId: number;
  rangeType: string;
  startAddr: number;
  size: number;
  offset: number;
}
export interface NvdimmSummary extends DynamicData {
  numDimms: number;
  healthStatus: string;
  totalCapacity: number;
  persistentCapacity: number;
  blockCapacity: number;
  availableCapacity: number;
  numInterleavesets: number;
  numNamespaces: number;
}
export interface HostNvmeController extends DynamicData {
  key: string;
  controllerNumber: number;
  subnqn: string;
  name: string;
  associatedAdapter: HostHostBusAdapter;
  transportType: string;
  fusedOperationSupported: boolean;
  numberOfQueues: number;
  queueSize: number;
  attachedNamespace?: HostNvmeNamespace[];
  vendorId?: string;
  model?: string;
  serialNumber?: string;
  firmwareVersion?: string;
}
export interface HostNvmeDisconnectSpec extends DynamicData {
  hbaName: string;
  subnqn?: string;
  controllerNumber?: number;
}
export interface HostNvmeDiscoveryLog extends DynamicData {
  entry?: HostNvmeDiscoveryLogEntry[];
  complete: boolean;
}
export interface HostNvmeDiscoveryLogEntry extends DynamicData {
  subnqn: string;
  subsystemType: string;
  subsystemPortId: number;
  controllerId: number;
  adminQueueMaxSize: number;
  transportParameters: HostNvmeTransportParameters;
  transportRequirements: string;
  connected: boolean;
}
export interface HostNvmeNamespace extends DynamicData {
  key: string;
  name: string;
  id: number;
  blockSize: number;
  capacityInBlocks: number;
}
export interface HostNvmeSpec extends DynamicData {
  hbaName: string;
  transportParameters: HostNvmeTransportParameters;
}
export interface HostNvmeTopology extends DynamicData {
  adapter?: HostNvmeTopologyInterface[];
}
export interface HostNvmeTopologyInterface extends DynamicData {
  key: string;
  adapter: HostHostBusAdapter;
  connectedController?: HostNvmeController[];
}
export interface HostNvmeTransportParameters extends DynamicData {
  
}
export interface HostOpaqueSwitch extends DynamicData {
  key: string;
  name?: string;
  pnic?: PhysicalNic[];
  pnicZone?: HostOpaqueSwitchPhysicalNicZone[];
  status?: string;
  vtep?: HostVirtualNic[];
  extraConfig?: OptionValue[];
  featureCapability?: HostFeatureCapability[];
}
export interface HostOpaqueSwitchPhysicalNicZone extends DynamicData {
  key: string;
  pnicDevice?: string[];
}
export interface HostPMemVolume extends HostFileSystemVolume {
  uuid: string;
  version: string;
}
export interface HostParallelScsiHba extends HostHostBusAdapter {
  
}
export interface HostPatchManagerLocator extends DynamicData {
  url: string;
  proxy?: string;
}
export interface HostPatchManagerPatchManagerOperationSpec extends DynamicData {
  proxy?: string;
  port?: number;
  userName?: string;
  password?: string;
  cmdOption?: string;
}
export interface HostPatchManagerResult extends DynamicData {
  version: string;
  status?: HostPatchManagerStatus[];
  xmlResult?: string;
}
export interface HostPatchManagerStatus extends DynamicData {
  id: string;
  applicable: boolean;
  reason?: string[];
  integrity?: string;
  installed: boolean;
  installState?: string[];
  prerequisitePatch?: HostPatchManagerStatusPrerequisitePatch[];
  restartRequired: boolean;
  reconnectRequired: boolean;
  vmOffRequired: boolean;
  supersededPatchIds?: string[];
}
export interface HostPatchManagerStatusPrerequisitePatch extends DynamicData {
  id: string;
  installState?: string[];
}
export interface HostPathSelectionPolicyOption extends DynamicData {
  policy: ElementDescription;
}
export interface HostPciDevice extends DynamicData {
  id: string;
  classId: number;
  bus: number;
  slot: number;
  function: number;
  vendorId: number;
  subVendorId: number;
  vendorName: string;
  deviceId: number;
  subDeviceId: number;
  parentBridge?: string;
  deviceName: string;
}
export interface HostPciPassthruConfig extends DynamicData {
  id: string;
  passthruEnabled: boolean;
  applyNow?: boolean;
}
export interface HostPciPassthruInfo extends DynamicData {
  id: string;
  dependentDevice: string;
  passthruEnabled: boolean;
  passthruCapable: boolean;
  passthruActive: boolean;
}
export interface HostPcieHba extends HostHostBusAdapter {
  
}
export interface HostPersistentMemoryInfo extends DynamicData {
  capacityInMB?: number;
  volumeUUID?: string;
}
export interface PhysicalNic extends DynamicData {
  key?: string;
  device: string;
  pci: string;
  driver?: string;
  linkSpeed?: PhysicalNicLinkInfo;
  validLinkSpecification?: PhysicalNicLinkInfo[];
  spec: PhysicalNicSpec;
  wakeOnLanSupported: boolean;
  mac: string;
  fcoeConfiguration?: FcoeConfig;
  vmDirectPathGen2Supported?: boolean;
  vmDirectPathGen2SupportedMode?: string;
  resourcePoolSchedulerAllowed?: boolean;
  resourcePoolSchedulerDisallowedReason?: string[];
  autoNegotiateSupported?: boolean;
  enhancedNetworkingStackSupported?: boolean;
  ensInterruptSupported?: boolean;
  rdmaDevice?: HostRdmaDevice;
}
export interface PhysicalNicCdpDeviceCapability extends DynamicData {
  router: boolean;
  transparentBridge: boolean;
  sourceRouteBridge: boolean;
  networkSwitch: boolean;
  host: boolean;
  igmpEnabled: boolean;
  repeater: boolean;
}
export interface PhysicalNicCdpInfo extends DynamicData {
  cdpVersion?: number;
  timeout?: number;
  ttl?: number;
  samples?: number;
  devId?: string;
  address?: string;
  portId?: string;
  deviceCapability?: PhysicalNicCdpDeviceCapability;
  softwareVersion?: string;
  hardwarePlatform?: string;
  ipPrefix?: string;
  ipPrefixLen?: number;
  vlan?: number;
  fullDuplex?: boolean;
  mtu?: number;
  systemName?: string;
  systemOID?: string;
  mgmtAddr?: string;
  location?: string;
}
export interface PhysicalNicConfig extends DynamicData {
  device: string;
  spec: PhysicalNicSpec;
}
export interface PhysicalNicLinkInfo extends DynamicData {
  speedMb: number;
  duplex: boolean;
}
export interface LinkLayerDiscoveryProtocolInfo extends DynamicData {
  chassisId: string;
  portId: string;
  timeToLive: number;
  parameter?: KeyAnyValue[];
}
export interface PhysicalNicHintInfo extends DynamicData {
  device: string;
  subnet?: PhysicalNicIpHint[];
  network?: PhysicalNicNameHint[];
  connectedSwitchPort?: PhysicalNicCdpInfo;
  lldpInfo?: LinkLayerDiscoveryProtocolInfo;
}
export interface PhysicalNicHint extends DynamicData {
  vlanId?: number;
}
export interface PhysicalNicIpHint extends PhysicalNicHint {
  ipSubnet: string;
}
export interface PhysicalNicNameHint extends PhysicalNicHint {
  network: string;
}
export interface PhysicalNicSpec extends DynamicData {
  ip?: HostIpConfig;
  linkSpeed?: PhysicalNicLinkInfo;
  enableEnhancedNetworkingStack?: boolean;
  ensInterruptEnabled?: boolean;
}
export interface HostPlugStoreTopology extends DynamicData {
  adapter?: HostPlugStoreTopologyAdapter[];
  path?: HostPlugStoreTopologyPath[];
  target?: HostPlugStoreTopologyTarget[];
  device?: HostPlugStoreTopologyDevice[];
  plugin?: HostPlugStoreTopologyPlugin[];
}
export interface HostPlugStoreTopologyAdapter extends DynamicData {
  key: string;
  adapter: HostHostBusAdapter;
  path?: HostPlugStoreTopologyPath[];
}
export interface HostPlugStoreTopologyDevice extends DynamicData {
  key: string;
  lun: ScsiLun;
  path?: HostPlugStoreTopologyPath[];
}
export interface HostPlugStoreTopologyPath extends DynamicData {
  key: string;
  name: string;
  channelNumber?: number;
  targetNumber?: number;
  lunNumber?: number;
  adapter?: HostPlugStoreTopologyAdapter;
  target?: HostPlugStoreTopologyTarget;
  device?: HostPlugStoreTopologyDevice;
}
export interface HostPlugStoreTopologyPlugin extends DynamicData {
  key: string;
  name: string;
  device?: HostPlugStoreTopologyDevice[];
  claimedPath?: HostPlugStoreTopologyPath[];
}
export interface HostPlugStoreTopologyTarget extends DynamicData {
  key: string;
  transport?: HostTargetTransport;
}
export interface HostPortGroup extends DynamicData {
  key?: string;
  port?: HostPortGroupPort[];
  vswitch?: HostVirtualSwitch;
  computedPolicy: HostNetworkPolicy;
  spec: HostPortGroupSpec;
}
export interface HostPortGroupConfig extends DynamicData {
  changeOperation?: string;
  spec?: HostPortGroupSpec;
}
export interface HostPortGroupPort extends DynamicData {
  key?: string;
  mac?: string[];
  type: string;
}
export interface HostPortGroupSpec extends DynamicData {
  name: string;
  vlanId: number;
  vswitchName: string;
  policy: HostNetworkPolicy;
}
export interface PowerSystemCapability extends DynamicData {
  availablePolicy: HostPowerPolicy[];
}
export interface PowerSystemInfo extends DynamicData {
  currentPolicy: HostPowerPolicy;
}
export interface HostPowerPolicy extends DynamicData {
  key: number;
  name: string;
  shortName: string;
  description: string;
}
export interface HostProtocolEndpoint extends DynamicData {
  peType: string;
  type?: string;
  uuid: string;
  hostKey?: HostSystem[];
  storageArray?: string;
  nfsServer?: string;
  nfsDir?: string;
  nfsServerScope?: string;
  nfsServerMajor?: string;
  nfsServerAuthType?: string;
  nfsServerUser?: string;
  deviceId?: string;
}
export interface HostRdmaDevice extends DynamicData {
  key: string;
  device: string;
  driver?: string;
  description?: string;
  backing?: HostRdmaDeviceBacking;
  connectionInfo: HostRdmaDeviceConnectionInfo;
  capability: HostRdmaDeviceCapability;
}
export interface HostRdmaDeviceBacking extends DynamicData {
  
}
export interface HostRdmaDeviceCapability extends DynamicData {
  roceV1Capable: boolean;
  roceV2Capable: boolean;
  iWarpCapable: boolean;
}
export interface HostRdmaDeviceConnectionInfo extends DynamicData {
  state: string;
  mtu: number;
  speedInMbps: number;
}
export interface HostRdmaDevicePnicBacking extends HostRdmaDeviceBacking {
  pairedUplink: PhysicalNic;
}
export interface HostRdmaHba extends HostHostBusAdapter {
  associatedRdmaDevice?: string;
}
export interface HostReliableMemoryInfo extends DynamicData {
  memorySize: number;
}
export interface HostResignatureRescanResult extends DynamicData {
  rescan?: HostVmfsRescanResult[];
  result: Datastore;
}
export interface HostFirewallRuleset extends DynamicData {
  key: string;
  label: string;
  required: boolean;
  rule: HostFirewallRule[];
  service?: string;
  enabled: boolean;
  allowedHosts?: HostFirewallRulesetIpList;
}
export interface HostFirewallRulesetIpList extends DynamicData {
  ipAddress?: string[];
  ipNetwork?: HostFirewallRulesetIpNetwork[];
  allIp: boolean;
}
export interface HostFirewallRulesetIpNetwork extends DynamicData {
  network: string;
  prefixLength: number;
}
export interface HostFirewallRule extends DynamicData {
  port: number;
  endPort?: number;
  direction: HostFirewallRuleDirection;
  portType?: HostFirewallRulePortType;
  protocol: string;
}
export interface HostFirewallRulesetRulesetSpec extends DynamicData {
  allowedHosts: HostFirewallRulesetIpList;
}
export interface ScsiLun extends HostDevice {
  key?: string;
  uuid: string;
  descriptor?: ScsiLunDescriptor[];
  canonicalName?: string;
  displayName?: string;
  lunType: string;
  vendor?: string;
  model?: string;
  revision?: string;
  scsiLevel?: number;
  serialNumber?: string;
  durableName?: ScsiLunDurableName;
  alternateName?: ScsiLunDurableName[];
  standardInquiry?: number[];
  queueDepth?: number;
  operationalState: string[];
  capabilities?: ScsiLunCapabilities;
  vStorageSupport?: string;
  protocolEndpoint?: boolean;
  perenniallyReserved?: boolean;
  clusteredVmdkSupported?: boolean;
}
export interface ScsiLunCapabilities extends DynamicData {
  updateDisplayNameSupported: boolean;
}
export interface ScsiLunDescriptor extends DynamicData {
  quality: string;
  id: string;
}
export interface ScsiLunDurableName extends DynamicData {
  namespace: string;
  namespaceId: number;
  data?: number[];
}
export interface HostScsiTopology extends DynamicData {
  adapter?: HostScsiTopologyInterface[];
}
export interface HostScsiTopologyInterface extends DynamicData {
  key: string;
  adapter: HostHostBusAdapter;
  target?: HostScsiTopologyTarget[];
}
export interface HostScsiTopologyLun extends DynamicData {
  key: string;
  lun: number;
  scsiLun: ScsiLun;
}
export interface HostScsiTopologyTarget extends DynamicData {
  key: string;
  target: number;
  lun?: HostScsiTopologyLun[];
  transport?: HostTargetTransport;
}
export interface HostSerialAttachedHba extends HostHostBusAdapter {
  nodeWorldWideName: string;
}
export interface HostService extends DynamicData {
  key: string;
  label: string;
  required: boolean;
  uninstallable: boolean;
  running: boolean;
  ruleset?: string[];
  policy: string;
  sourcePackage?: HostServiceSourcePackage;
}
export interface HostServiceSourcePackage extends DynamicData {
  sourcePackageName: string;
  description: string;
}
export interface HostServiceConfig extends DynamicData {
  serviceId: string;
  startupPolicy: string;
}
export interface HostServiceInfo extends DynamicData {
  service?: HostService[];
}
export interface HostSevInfo extends DynamicData {
  sevState: string;
  maxSevEsGuests: number;
}
export interface HostSgxInfo extends DynamicData {
  sgxState: string;
  totalEpcMemory: number;
  flcMode: string;
  lePubKeyHash?: string;
}
export interface HostSharedGpuCapabilities extends DynamicData {
  vgpu: string;
  diskSnapshotSupported: boolean;
  memorySnapshotSupported: boolean;
  suspendSupported: boolean;
  migrateSupported: boolean;
}
export interface HostSnmpSystemAgentLimits extends DynamicData {
  maxReadOnlyCommunities: number;
  maxTrapDestinations: number;
  maxCommunityLength: number;
  maxBufferSize: number;
  capability: HostSnmpAgentCapability;
}
export interface HostSnmpConfigSpec extends DynamicData {
  enabled?: boolean;
  port?: number;
  readOnlyCommunities?: string[];
  trapTargets?: HostSnmpDestination[];
  option?: KeyValue[];
}
export interface HostSnmpDestination extends DynamicData {
  hostName: string;
  port: number;
  community: string;
}
export interface SoftwarePackage extends DynamicData {
  name: string;
  version: string;
  type: string;
  vendor: string;
  acceptanceLevel: string;
  summary: string;
  description: string;
  referenceURL?: string[];
  creationDate?: Date;
  depends?: Relation[];
  conflicts?: Relation[];
  replaces?: Relation[];
  provides?: string[];
  maintenanceModeRequired?: boolean;
  hardwarePlatformsRequired?: string[];
  capability: SoftwarePackageCapability;
  tag?: string[];
  payload?: string[];
}
export interface SoftwarePackageCapability extends DynamicData {
  liveInstallAllowed?: boolean;
  liveRemoveAllowed?: boolean;
  statelessReady?: boolean;
  overlay?: boolean;
}
export interface Relation extends DynamicData {
  constraint?: string;
  name: string;
  version?: string;
}
export interface HostSriovConfig extends HostPciPassthruConfig {
  sriovEnabled: boolean;
  numVirtualFunction: number;
}
export interface HostSriovDevicePoolInfo extends DynamicData {
  key: string;
}
export interface HostSriovInfo extends HostPciPassthruInfo {
  sriovEnabled: boolean;
  sriovCapable: boolean;
  sriovActive: boolean;
  numVirtualFunctionRequested: number;
  numVirtualFunction: number;
  maxVirtualFunctionSupported: number;
}
export interface HostSriovNetworkDevicePoolInfo extends HostSriovDevicePoolInfo {
  switchKey?: string;
  switchUuid?: string;
  pnic?: PhysicalNic[];
}
export interface HostSslThumbprintInfo extends DynamicData {
  principal: string;
  ownerTag: string;
  sslThumbprints?: string[];
}
export interface HostStorageArrayTypePolicyOption extends DynamicData {
  policy: ElementDescription;
}
export interface HostStorageDeviceInfo extends DynamicData {
  hostBusAdapter?: HostHostBusAdapter[];
  scsiLun?: ScsiLun[];
  scsiTopology?: HostScsiTopology;
  nvmeTopology?: HostNvmeTopology;
  multipathInfo?: HostMultipathInfo;
  plugStoreTopology?: HostPlugStoreTopology;
  softwareInternetScsiEnabled: boolean;
}
export interface SystemEventInfo extends DynamicData {
  recordId: number;
  when: string;
  selType: number;
  message: string;
  sensorNumber: number;
}
export interface HostSystemHealthInfo extends DynamicData {
  numericSensorInfo?: HostNumericSensorInfo[];
}
export interface HostSystemIdentificationInfo extends DynamicData {
  identifierValue: string;
  identifierType: ElementDescription;
}
export interface HostSystemInfo extends DynamicData {
  vendor: string;
  model: string;
  uuid: string;
  otherIdentifyingInfo?: HostSystemIdentificationInfo[];
  serialNumber?: string;
}
export interface HostSystemResourceInfo extends DynamicData {
  key: string;
  config?: ResourceConfigSpec;
  child?: HostSystemResourceInfo[];
}
export interface HostSystemSwapConfiguration extends DynamicData {
  option?: HostSystemSwapConfigurationSystemSwapOption[];
}
export interface HostSystemSwapConfigurationDatastoreOption extends HostSystemSwapConfigurationSystemSwapOption {
  datastore: string;
}
export interface HostSystemSwapConfigurationDisabledOption extends HostSystemSwapConfigurationSystemSwapOption {
  
}
export interface HostSystemSwapConfigurationHostCacheOption extends HostSystemSwapConfigurationSystemSwapOption {
  
}
export interface HostSystemSwapConfigurationHostLocalSwapOption extends HostSystemSwapConfigurationSystemSwapOption {
  
}
export interface HostSystemSwapConfigurationSystemSwapOption extends DynamicData {
  key: number;
}
export interface HostTargetTransport extends DynamicData {
  
}
export interface HostTpmAttestationInfo extends DynamicData {
  time: Date;
  status: HostTpmAttestationInfoAcceptanceStatus;
  message?: LocalizableMessage;
}
export interface HostTpmAttestationReport extends DynamicData {
  tpmPcrValues: HostTpmDigestInfo[];
  tpmEvents: HostTpmEventLogEntry[];
  tpmLogReliable: boolean;
}
export interface HostTpmDigestInfo extends HostDigestInfo {
  pcrNumber: number;
}
export interface HostTpmEventDetails extends DynamicData {
  dataHash: number[];
  dataHashMethod?: string;
}
export interface HostTpmEventLogEntry extends DynamicData {
  pcrIndex: number;
  eventDetails: HostTpmEventDetails;
}
export interface HostTpmOptionEventDetails extends HostTpmEventDetails {
  optionsFileName: string;
  bootOptions?: number[];
}
export interface HostTpmSoftwareComponentEventDetails extends HostTpmEventDetails {
  componentName: string;
  vibName: string;
  vibVersion: string;
  vibVendor: string;
}
export interface HostTrustAuthorityAttestationInfo extends DynamicData {
  attestationStatus: string;
  serviceId?: string;
  attestedAt?: Date;
  attestedUntil?: Date;
  messages?: LocalizableMessage[];
}
export interface HostUnresolvedVmfsResignatureSpec extends DynamicData {
  extentDevicePath: string[];
}
export interface HostUnresolvedVmfsResolutionResult extends DynamicData {
  spec: HostUnresolvedVmfsResolutionSpec;
  vmfs?: HostVmfsVolume;
  fault?: MethodFault;
}
export interface HostUnresolvedVmfsResolutionSpec extends DynamicData {
  extentDevicePath: string[];
  uuidResolution: string;
}
export interface HostUnresolvedVmfsVolume extends DynamicData {
  extent: HostUnresolvedVmfsExtent[];
  vmfsLabel: string;
  vmfsUuid: string;
  totalBlocks: number;
  resolveStatus: HostUnresolvedVmfsVolumeResolveStatus;
}
export interface HostUnresolvedVmfsVolumeResolveStatus extends DynamicData {
  resolvable: boolean;
  incompleteExtents?: boolean;
  multipleCopies?: boolean;
}
export interface HostVFlashResourceConfigurationResult extends DynamicData {
  devicePath?: string[];
  vffs?: HostVffsVolume;
  diskConfigurationResult?: HostDiskConfigurationResult[];
}
export interface HostVMotionConfig extends DynamicData {
  vmotionNicKey?: string;
  enabled: boolean;
}
export interface HostVMotionNetConfig extends DynamicData {
  candidateVnic?: HostVirtualNic[];
  selectedVnic?: HostVirtualNic;
}
export interface HostVfatVolume extends HostFileSystemVolume {
  
}
export interface HostVirtualNic extends DynamicData {
  device: string;
  key: string;
  portgroup: string;
  spec: HostVirtualNicSpec;
  port?: HostPortGroupPort;
}
export interface HostVirtualNicConfig extends DynamicData {
  changeOperation?: string;
  device?: string;
  portgroup: string;
  spec?: HostVirtualNicSpec;
}
export interface HostVirtualNicIpRouteSpec extends DynamicData {
  ipRouteConfig?: HostIpRouteConfig;
}
export interface HostVirtualNicOpaqueNetworkSpec extends DynamicData {
  opaqueNetworkId: string;
  opaqueNetworkType: string;
}
export interface HostVirtualNicSpec extends DynamicData {
  ip?: HostIpConfig;
  mac?: string;
  distributedVirtualPort?: DistributedVirtualSwitchPortConnection;
  portgroup?: string;
  mtu?: number;
  tsoEnabled?: boolean;
  netStackInstanceKey?: string;
  opaqueNetwork?: HostVirtualNicOpaqueNetworkSpec;
  externalId?: string;
  pinnedPnic?: string;
  ipRouteSpec?: HostVirtualNicIpRouteSpec;
  systemOwned?: boolean;
}
export interface HostVirtualNicConnection extends DynamicData {
  portgroup?: string;
  dvPort?: DistributedVirtualSwitchPortConnection;
  opNetwork?: HostVirtualNicOpaqueNetworkSpec;
}
export interface VirtualNicManagerNetConfig extends DynamicData {
  nicType: string;
  multiSelectAllowed: boolean;
  candidateVnic?: HostVirtualNic[];
  selectedVnic?: HostVirtualNic[];
}
export interface HostVirtualNicManagerNicTypeSelection extends DynamicData {
  vnic: HostVirtualNicConnection;
  nicType?: string[];
}
export interface HostVirtualNicManagerInfo extends DynamicData {
  netConfig?: VirtualNicManagerNetConfig[];
}
export interface HostVirtualSwitch extends DynamicData {
  name: string;
  key: string;
  numPorts: number;
  numPortsAvailable: number;
  mtu?: number;
  portgroup?: HostPortGroup[];
  pnic?: PhysicalNic[];
  spec: HostVirtualSwitchSpec;
}
export interface HostVirtualSwitchAutoBridge extends HostVirtualSwitchBridge {
  excludedNicDevice?: string[];
}
export interface HostVirtualSwitchBeaconConfig extends DynamicData {
  interval: number;
}
export interface HostVirtualSwitchBondBridge extends HostVirtualSwitchBridge {
  nicDevice: string[];
  beacon?: HostVirtualSwitchBeaconConfig;
  linkDiscoveryProtocolConfig?: LinkDiscoveryProtocolConfig;
}
export interface HostVirtualSwitchBridge extends DynamicData {
  
}
export interface HostVirtualSwitchConfig extends DynamicData {
  changeOperation?: string;
  name: string;
  spec?: HostVirtualSwitchSpec;
}
export interface HostVirtualSwitchSimpleBridge extends HostVirtualSwitchBridge {
  nicDevice: string;
}
export interface HostVirtualSwitchSpec extends DynamicData {
  numPorts: number;
  bridge?: HostVirtualSwitchBridge;
  policy?: HostNetworkPolicy;
  mtu?: number;
}
export interface HostVmciAccessManagerAccessSpec extends DynamicData {
  vm: VirtualMachine;
  services?: string[];
  mode: string;
}
export interface VmfsDatastoreOption extends DynamicData {
  info: VmfsDatastoreBaseOption;
  spec: VmfsDatastoreSpec;
}
export interface VmfsDatastoreAllExtentOption extends VmfsDatastoreSingleExtentOption {
  
}
export interface VmfsDatastoreBaseOption extends DynamicData {
  layout: HostDiskPartitionLayout;
  partitionFormatChange?: boolean;
}
export interface VmfsDatastoreMultipleExtentOption extends VmfsDatastoreBaseOption {
  vmfsExtent: HostDiskPartitionBlockRange[];
}
export interface VmfsDatastoreSingleExtentOption extends VmfsDatastoreBaseOption {
  vmfsExtent: HostDiskPartitionBlockRange;
}
export interface VmfsDatastoreSpec extends DynamicData {
  diskUuid: string;
}
export interface HostVmfsRescanResult extends DynamicData {
  host: HostSystem;
  fault?: MethodFault;
}
export interface HostVsanInternalSystemCmmdsQuery extends DynamicData {
  type?: string;
  uuid?: string;
  owner?: string;
}
export interface HostVsanInternalSystemDeleteVsanObjectsResult extends DynamicData {
  uuid: string;
  success: boolean;
  failureReason?: LocalizableMessage[];
}
export interface VsanNewPolicyBatch extends DynamicData {
  size?: number[];
  policy?: string;
}
export interface VsanPolicyChangeBatch extends DynamicData {
  uuid?: string[];
  policy?: string;
}
export interface VsanPolicyCost extends DynamicData {
  changeDataSize?: number;
  currentDataSize?: number;
  tempDataSize?: number;
  copyDataSize?: number;
  changeFlashReadCacheSize?: number;
  currentFlashReadCacheSize?: number;
  currentDiskSpaceToAddressSpaceRatio?: number;
  diskSpaceToAddressSpaceRatio?: number;
}
export interface VsanPolicySatisfiability extends DynamicData {
  uuid?: string;
  isSatisfiable: boolean;
  reason?: LocalizableMessage;
  cost?: VsanPolicyCost;
}
export interface HostVsanInternalSystemVsanObjectOperationResult extends DynamicData {
  uuid: string;
  failureReason?: LocalizableMessage[];
}
export interface HostVsanInternalSystemVsanPhysicalDiskDiagnosticsResult extends DynamicData {
  diskUuid: string;
  success: boolean;
  failureReason?: string;
}
export interface HostVvolVolume extends HostFileSystemVolume {
  scId: string;
  hostPE?: VVolHostPE[];
  vasaProviderInfo?: VimVasaProviderInfo[];
  storageArray?: VASAStorageArray[];
}
export interface VVolHostPE extends DynamicData {
  key: HostSystem;
  protocolEndpoint: HostProtocolEndpoint[];
}
export interface HostVvolVolumeSpecification extends DynamicData {
  maxSizeInMB: number;
  volumeName: string;
  vasaProviderInfo?: VimVasaProviderInfo[];
  storageArray?: VASAStorageArray[];
  uuid: string;
}
export interface NetDhcpConfigInfo extends DynamicData {
  ipv6?: NetDhcpConfigInfoDhcpOptions;
  ipv4?: NetDhcpConfigInfoDhcpOptions;
}
export interface NetDhcpConfigInfoDhcpOptions extends DynamicData {
  enable: boolean;
  config?: KeyValue[];
}
export interface NetDhcpConfigSpec extends DynamicData {
  ipv6?: NetDhcpConfigSpecDhcpOptionsSpec;
  ipv4?: NetDhcpConfigSpecDhcpOptionsSpec;
}
export interface NetDhcpConfigSpecDhcpOptionsSpec extends DynamicData {
  enable?: boolean;
  config: KeyValue[];
  operation: string;
}
export interface NetDnsConfigInfo extends DynamicData {
  dhcp: boolean;
  hostName: string;
  domainName: string;
  ipAddress?: string[];
  searchDomain?: string[];
}
export interface NetDnsConfigSpec extends DynamicData {
  dhcp?: boolean;
  hostName?: string;
  domainName?: string;
  ipAddress?: string[];
  searchDomain?: string[];
}
export interface NetIpConfigInfo extends DynamicData {
  ipAddress?: NetIpConfigInfoIpAddress[];
  dhcp?: NetDhcpConfigInfo;
  autoConfigurationEnabled?: boolean;
}
export interface NetIpConfigInfoIpAddress extends DynamicData {
  ipAddress: string;
  prefixLength: number;
  origin?: string;
  state?: string;
  lifetime?: Date;
}
export interface NetIpConfigSpec extends DynamicData {
  ipAddress?: NetIpConfigSpecIpAddressSpec[];
  dhcp?: NetDhcpConfigSpec;
  autoConfigurationEnabled?: boolean;
}
export interface NetIpConfigSpecIpAddressSpec extends DynamicData {
  ipAddress: string;
  prefixLength: number;
  operation: string;
}
export interface NetIpRouteConfigInfo extends DynamicData {
  ipRoute?: NetIpRouteConfigInfoIpRoute[];
}
export interface NetIpRouteConfigInfoGateway extends DynamicData {
  ipAddress?: string;
  device?: string;
}
export interface NetIpRouteConfigInfoIpRoute extends DynamicData {
  network: string;
  prefixLength: number;
  gateway: NetIpRouteConfigInfoGateway;
}
export interface NetIpRouteConfigSpec extends DynamicData {
  ipRoute?: NetIpRouteConfigSpecIpRouteSpec[];
}
export interface NetIpRouteConfigSpecGatewaySpec extends DynamicData {
  ipAddress?: string;
  device?: string;
}
export interface NetIpRouteConfigSpecIpRouteSpec extends DynamicData {
  network: string;
  prefixLength: number;
  gateway: NetIpRouteConfigSpecGatewaySpec;
  operation: string;
}
export interface NetIpStackInfo extends DynamicData {
  neighbor?: NetIpStackInfoNetToMedia[];
  defaultRouter?: NetIpStackInfoDefaultRouter[];
}
export interface NetIpStackInfoDefaultRouter extends DynamicData {
  ipAddress: string;
  device: string;
  lifetime: Date;
  preference: string;
}
export interface NetIpStackInfoNetToMedia extends DynamicData {
  ipAddress: string;
  physicalAddress: string;
  device: string;
  type: string;
}
export interface NetBIOSConfigInfo extends DynamicData {
  mode: string;
}
export interface WinNetBIOSConfigInfo extends NetBIOSConfigInfo {
  primaryWINS: string;
  secondaryWINS?: string;
}
export interface ArrayUpdateSpec extends DynamicData {
  operation: ArrayUpdateOperation;
  removeKey?: any;
}
export interface OptionDef extends ElementDescription {
  optionType: OptionType;
}
export interface OptionType extends DynamicData {
  valueIsReadonly?: boolean;
}
export interface OptionValue extends DynamicData {
  key: string;
  value?: any;
}
export interface StringOption extends OptionType {
  defaultValue: string;
  validCharacters?: string;
}
export interface ApplyProfile extends DynamicData {
  enabled: boolean;
  policy?: ProfilePolicy[];
  profileTypeName?: string;
  profileVersion?: string;
  property?: ProfileApplyProfileProperty[];
  favorite?: boolean;
  toBeMerged?: boolean;
  toReplaceWith?: boolean;
  toBeDeleted?: boolean;
  copyEnableStatus?: boolean;
  hidden?: boolean;
}
export interface ProfileApplyProfileElement extends ApplyProfile {
  key: string;
}
export interface ProfileApplyProfileProperty extends DynamicData {
  propertyName: string;
  array: boolean;
  profile?: ApplyProfile[];
}
export interface ComplianceLocator extends DynamicData {
  expressionName: string;
  applyPath: ProfilePropertyPath;
}
export interface ComplianceProfile extends DynamicData {
  expression: ProfileExpression[];
  rootExpression: string;
}
export interface ComplianceResult extends DynamicData {
  profile?: Profile;
  complianceStatus: string;
  entity?: ManagedEntity;
  checkTime?: Date;
  failure?: ComplianceFailure[];
}
export interface ComplianceFailure extends DynamicData {
  failureType: string;
  message: LocalizableMessage;
  expressionName?: string;
  failureValues?: ComplianceFailureComplianceFailureValues[];
}
export interface ComplianceFailureComplianceFailureValues extends DynamicData {
  comparisonIdentifier: string;
  profileInstance?: string;
  hostValue?: any;
  profileValue?: any;
}
export interface ProfileDeferredPolicyOptionParameter extends DynamicData {
  inputPath: ProfilePropertyPath;
  parameter?: KeyAnyValue[];
}
export interface ProfileExpression extends DynamicData {
  id: string;
  displayName: string;
  negated: boolean;
}
export interface ProfileExpressionMetadata extends DynamicData {
  expressionId: ExtendedElementDescription;
  parameter?: ProfileParameterMetadata[];
}
export interface ProfileParameterMetadata extends DynamicData {
  id: ExtendedElementDescription;
  type: string;
  optional: boolean;
  defaultValue?: any;
  hidden?: boolean;
  securitySensitive?: boolean;
  readOnly?: boolean;
  parameterRelations?: ProfileParameterMetadataParameterRelationMetadata[];
}
export interface ProfileParameterMetadataParameterRelationMetadata extends DynamicData {
  relationTypes?: string[];
  values?: any[];
  path?: ProfilePropertyPath;
  minCount: number;
  maxCount: number;
}
export interface ProfilePolicy extends DynamicData {
  id: string;
  policyOption: PolicyOption;
}
export interface ProfilePolicyMetadata extends DynamicData {
  id: ExtendedElementDescription;
  possibleOption: ProfilePolicyOptionMetadata[];
}
export interface PolicyOption extends DynamicData {
  id: string;
  parameter?: KeyAnyValue[];
}
export interface ProfilePolicyOptionMetadata extends DynamicData {
  id: ExtendedElementDescription;
  parameter?: ProfileParameterMetadata[];
}
export interface ProfileConfigInfo extends DynamicData {
  name: string;
  annotation?: string;
  enabled: boolean;
}
export interface ProfileCreateSpec extends DynamicData {
  name?: string;
  annotation?: string;
  enabled?: boolean;
}
export interface ProfileDescription extends DynamicData {
  section: ProfileDescriptionSection[];
}
export interface ProfileDescriptionSection extends DynamicData {
  description: ExtendedElementDescription;
  message?: LocalizableMessage[];
}
export interface ProfileSerializedCreateSpec extends ProfileCreateSpec {
  profileConfigString: string;
}
export interface ProfileMetadata extends DynamicData {
  key: string;
  profileTypeName?: string;
  description?: ExtendedDescription;
  sortSpec?: ProfileMetadataProfileSortSpec[];
  profileCategory?: string;
  profileComponent?: string;
  operationMessages?: ProfileMetadataProfileOperationMessage[];
}
export interface ProfileMetadataProfileOperationMessage extends DynamicData {
  operationName: string;
  message: LocalizableMessage;
}
export interface ProfileMetadataProfileSortSpec extends DynamicData {
  policyId: string;
  parameter: string;
}
export interface ProfilePropertyPath extends DynamicData {
  profilePath: string;
  policyId?: string;
  parameterId?: string;
  policyOptionId?: string;
}
export interface ProfileProfileStructure extends DynamicData {
  profileTypeName: string;
  child?: ProfileProfileStructureProperty[];
}
export interface ProfileProfileStructureProperty extends DynamicData {
  propertyName: string;
  array: boolean;
  element: ProfileProfileStructure;
}
export interface ProfileSimpleExpression extends ProfileExpression {
  expressionType: string;
  parameter?: KeyAnyValue[];
}
export interface UserInputRequiredParameterMetadata extends ProfilePolicyOptionMetadata {
  userInputParameter?: ProfileParameterMetadata[];
}
export interface ClusterProfileCompleteConfigSpec extends ClusterProfileConfigSpec {
  complyProfile?: ComplianceProfile;
}
export interface ClusterProfileConfigInfo extends ProfileConfigInfo {
  complyProfile?: ComplianceProfile;
}
export interface ClusterProfileConfigServiceCreateSpec extends ClusterProfileConfigSpec {
  serviceType?: string[];
}
export interface ClusterProfileConfigSpec extends ClusterProfileCreateSpec {
  
}
export interface ClusterProfileCreateSpec extends ProfileCreateSpec {
  
}
export interface ActiveDirectoryProfile extends ApplyProfile {
  
}
export interface AnswerFile extends DynamicData {
  userInput?: ProfileDeferredPolicyOptionParameter[];
  createdTime: Date;
  modifiedTime: Date;
}
export interface AnswerFileStatusResult extends DynamicData {
  checkedTime: Date;
  host: HostSystem;
  status: string;
  error?: AnswerFileStatusError[];
}
export interface AnswerFileStatusError extends DynamicData {
  userInputPath: ProfilePropertyPath;
  errMsg: LocalizableMessage;
}
export interface AuthenticationProfile extends ApplyProfile {
  activeDirectory?: ActiveDirectoryProfile;
}
export interface DateTimeProfile extends ApplyProfile {
  
}
export interface DvsProfile extends ApplyProfile {
  key: string;
  name: string;
  uplink?: PnicUplinkProfile[];
}
export interface DvsVNicProfile extends ApplyProfile {
  key: string;
  ipConfig: IpAddressProfile;
}
export interface ProfileExecuteResult extends DynamicData {
  status: string;
  configSpec?: HostConfigSpec;
  inapplicablePath?: string[];
  requireInput?: ProfileDeferredPolicyOptionParameter[];
  error?: ProfileExecuteError[];
}
export interface ProfileExecuteError extends DynamicData {
  path?: ProfilePropertyPath;
  message: LocalizableMessage;
}
export interface FirewallProfile extends ApplyProfile {
  ruleset?: FirewallProfileRulesetProfile[];
}
export interface FirewallProfileRulesetProfile extends ApplyProfile {
  key: string;
}
export interface HostApplyProfile extends ApplyProfile {
  memory?: HostMemoryProfile;
  storage?: StorageProfile;
  network?: NetworkProfile;
  datetime?: DateTimeProfile;
  firewall?: FirewallProfile;
  security?: SecurityProfile;
  service?: ServiceProfile[];
  option?: OptionProfile[];
  userAccount?: UserProfile[];
  usergroupAccount?: UserGroupProfile[];
  authentication?: AuthenticationProfile;
}
export interface HostMemoryProfile extends ApplyProfile {
  
}
export interface HostSpecification extends DynamicData {
  createdTime: Date;
  lastModified?: Date;
  host: HostSystem;
  subSpecs?: HostSubSpecification[];
  changeID?: string;
}
export interface HostSubSpecification extends DynamicData {
  name: string;
  createdTime: Date;
  data?: number[];
  binaryData?: Buffer;
}
export interface IpAddressProfile extends ApplyProfile {
  
}
export interface IpRouteProfile extends ApplyProfile {
  staticRoute?: StaticRouteProfile[];
}
export interface NasStorageProfile extends ApplyProfile {
  key: string;
}
export interface NetworkPolicyProfile extends ApplyProfile {
  
}
export interface NetworkProfile extends ApplyProfile {
  vswitch?: VirtualSwitchProfile[];
  vmPortGroup?: VmPortGroupProfile[];
  hostPortGroup?: HostPortGroupProfile[];
  serviceConsolePortGroup?: ServiceConsolePortGroupProfile[];
  dnsConfig?: NetworkProfileDnsConfigProfile;
  ipRouteConfig?: IpRouteProfile;
  consoleIpRouteConfig?: IpRouteProfile;
  pnic?: PhysicalNicProfile[];
  dvswitch?: DvsProfile[];
  dvsServiceConsoleNic?: DvsServiceConsoleVNicProfile[];
  dvsHostNic?: DvsHostVNicProfile[];
  nsxHostNic?: NsxHostVNicProfile[];
  netStackInstance?: NetStackInstanceProfile[];
  opaqueSwitch?: OpaqueSwitchProfile;
}
export interface NetworkProfileDnsConfigProfile extends ApplyProfile {
  
}
export interface NsxHostVNicProfile extends ApplyProfile {
  key: string;
  ipConfig: IpAddressProfile;
}
export interface OpaqueSwitchProfile extends ApplyProfile {
  
}
export interface OptionProfile extends ApplyProfile {
  key: string;
}
export interface PermissionProfile extends ApplyProfile {
  key: string;
}
export interface PhysicalNicProfile extends ApplyProfile {
  key: string;
}
export interface PnicUplinkProfile extends ApplyProfile {
  key: string;
}
export interface PortGroupProfile extends ApplyProfile {
  key: string;
  name: string;
  vlan: VlanProfile;
  vswitch: VirtualSwitchSelectionProfile;
  networkPolicy: NetworkPolicyProfile;
}
export interface VirtualSwitchSelectionProfile extends ApplyProfile {
  
}
export interface VlanProfile extends ApplyProfile {
  
}
export interface SecurityProfile extends ApplyProfile {
  permission?: PermissionProfile[];
}
export interface ServiceConsolePortGroupProfile extends PortGroupProfile {
  ipConfig: IpAddressProfile;
}
export interface ServiceProfile extends ApplyProfile {
  key: string;
}
export interface StaticRouteProfile extends ApplyProfile {
  key?: string;
}
export interface StorageProfile extends ApplyProfile {
  nasStorage?: NasStorageProfile[];
}
export interface UserGroupProfile extends ApplyProfile {
  key: string;
}
export interface UserProfile extends ApplyProfile {
  key: string;
}
export interface VirtualSwitchProfile extends ApplyProfile {
  key: string;
  name: string;
  link: LinkProfile;
  numPorts: NumPortsProfile;
  networkPolicy: NetworkPolicyProfile;
}
export interface LinkProfile extends ApplyProfile {
  
}
export interface NumPortsProfile extends ApplyProfile {
  
}
export interface VmPortGroupProfile extends PortGroupProfile {
  
}
export interface ScheduledTaskDescription extends DynamicData {
  action: TypeDescription[];
  schedulerInfo: ScheduledTaskDetail[];
  state: ElementDescription[];
  dayOfWeek: ElementDescription[];
  weekOfMonth: ElementDescription[];
}
export interface ScheduledTaskDetail extends TypeDescription {
  frequency: string;
}
export interface ScheduledTaskSpec extends DynamicData {
  name: string;
  description: string;
  enabled: boolean;
  scheduler: TaskScheduler;
  action: Action;
  notification?: string;
}
export interface TaskScheduler extends DynamicData {
  activeTime?: Date;
  expireTime?: Date;
}
export interface ApplyStorageRecommendationResult extends DynamicData {
  vm?: VirtualMachine;
}
export interface StorageDrsAutomationConfig extends DynamicData {
  spaceLoadBalanceAutomationMode?: string;
  ioLoadBalanceAutomationMode?: string;
  ruleEnforcementAutomationMode?: string;
  policyEnforcementAutomationMode?: string;
  vmEvacuationAutomationMode?: string;
}
export interface StorageDrsConfigInfo extends DynamicData {
  podConfig: StorageDrsPodConfigInfo;
  vmConfig?: StorageDrsVmConfigInfo[];
}
export interface StorageDrsConfigSpec extends DynamicData {
  podConfigSpec?: StorageDrsPodConfigSpec;
  vmConfigSpec?: StorageDrsVmConfigSpec[];
}
export interface HbrDiskMigrationAction extends ClusterAction {
  collectionId: string;
  collectionName: string;
  diskIds: string[];
  source: Datastore;
  destination: Datastore;
  sizeTransferred: number;
  spaceUtilSrcBefore?: number;
  spaceUtilDstBefore?: number;
  spaceUtilSrcAfter?: number;
  spaceUtilDstAfter?: number;
  ioLatencySrcBefore?: number;
  ioLatencyDstBefore?: number;
}
export interface StorageDrsIoLoadBalanceConfig extends DynamicData {
  reservablePercentThreshold?: number;
  reservableIopsThreshold?: number;
  reservableThresholdMode?: string;
  ioLatencyThreshold?: number;
  ioLoadImbalanceThreshold?: number;
}
export interface StorageDrsOptionSpec extends ArrayUpdateSpec {
  option?: OptionValue;
}
export interface PlacementAffinityRule extends DynamicData {
  ruleType: string;
  ruleScope: string;
  vms?: VirtualMachine[];
  keys?: string[];
}
export interface PlacementRankResult extends DynamicData {
  key: string;
  candidate: ClusterComputeResource;
  reservedSpaceMB: number;
  usedSpaceMB: number;
  totalSpaceMB: number;
  utilization: number;
  faults?: MethodFault[];
}
export interface PlacementRankSpec extends DynamicData {
  specs: PlacementSpec[];
  clusters: ClusterComputeResource[];
  rules?: PlacementAffinityRule[];
  placementRankByVm?: StorageDrsPlacementRankVmSpec[];
}
export interface StorageDrsPlacementRankVmSpec extends DynamicData {
  vmPlacementSpec: PlacementSpec;
  vmClusters: ClusterComputeResource[];
}
export interface StorageDrsPodConfigInfo extends DynamicData {
  enabled: boolean;
  ioLoadBalanceEnabled: boolean;
  defaultVmBehavior: string;
  loadBalanceInterval?: number;
  defaultIntraVmAffinity?: boolean;
  spaceLoadBalanceConfig?: StorageDrsSpaceLoadBalanceConfig;
  ioLoadBalanceConfig?: StorageDrsIoLoadBalanceConfig;
  automationOverrides?: StorageDrsAutomationConfig;
  rule?: ClusterRuleInfo[];
  option?: OptionValue[];
}
export interface StorageDrsPodConfigSpec extends DynamicData {
  enabled?: boolean;
  ioLoadBalanceEnabled?: boolean;
  defaultVmBehavior?: string;
  loadBalanceInterval?: number;
  defaultIntraVmAffinity?: boolean;
  spaceLoadBalanceConfig?: StorageDrsSpaceLoadBalanceConfig;
  ioLoadBalanceConfig?: StorageDrsIoLoadBalanceConfig;
  automationOverrides?: StorageDrsAutomationConfig;
  rule?: ClusterRuleSpec[];
  option?: StorageDrsOptionSpec[];
}
export interface StorageDrsSpaceLoadBalanceConfig extends DynamicData {
  spaceThresholdMode?: string;
  spaceUtilizationThreshold?: number;
  freeSpaceThresholdGB?: number;
  minSpaceUtilizationDifference?: number;
}
export interface StorageMigrationAction extends ClusterAction {
  vm: VirtualMachine;
  relocateSpec: VirtualMachineRelocateSpec;
  source: Datastore;
  destination: Datastore;
  sizeTransferred: number;
  spaceUtilSrcBefore?: number;
  spaceUtilDstBefore?: number;
  spaceUtilSrcAfter?: number;
  spaceUtilDstAfter?: number;
  ioLatencySrcBefore?: number;
  ioLatencyDstBefore?: number;
}
export interface StoragePlacementAction extends ClusterAction {
  vm?: VirtualMachine;
  relocateSpec: VirtualMachineRelocateSpec;
  destination: Datastore;
  spaceUtilBefore?: number;
  spaceDemandBefore?: number;
  spaceUtilAfter?: number;
  spaceDemandAfter?: number;
  ioLatencyBefore?: number;
}
export interface StoragePlacementResult extends DynamicData {
  recommendations?: ClusterRecommendation[];
  drsFault?: ClusterDrsFaults;
  task?: Task;
}
export interface StorageDrsVmConfigInfo extends DynamicData {
  vm?: VirtualMachine;
  enabled?: boolean;
  behavior?: string;
  intraVmAffinity?: boolean;
  intraVmAntiAffinity?: VirtualDiskAntiAffinityRuleSpec;
  virtualDiskRules?: VirtualDiskRuleSpec[];
}
export interface StorageDrsVmConfigSpec extends ArrayUpdateSpec {
  info?: StorageDrsVmConfigInfo;
}
export interface VAppCloneSpec extends DynamicData {
  location: Datastore;
  host?: HostSystem;
  resourceSpec?: ResourceConfigSpec;
  vmFolder?: Folder;
  networkMapping?: VAppCloneSpecNetworkMappingPair[];
  property?: KeyValue[];
  resourceMapping?: VAppCloneSpecResourceMap[];
  provisioning?: string;
}
export interface VAppCloneSpecNetworkMappingPair extends DynamicData {
  source: Network;
  destination: Network;
}
export interface VAppCloneSpecResourceMap extends DynamicData {
  source: ManagedEntity;
  parent?: ResourcePool;
  resourceSpec?: ResourceConfigSpec;
  location?: Datastore;
}
export interface VAppEntityConfigInfo extends DynamicData {
  key?: ManagedEntity;
  tag?: string;
  startOrder?: number;
  startDelay?: number;
  waitingForGuest?: boolean;
  startAction?: string;
  stopDelay?: number;
  stopAction?: string;
  destroyWithParent?: boolean;
}
export interface VAppIPAssignmentInfo extends DynamicData {
  supportedAllocationScheme?: string[];
  ipAllocationPolicy?: string;
  supportedIpProtocol?: string[];
  ipProtocol?: string;
}
export interface IpPool extends DynamicData {
  id?: number;
  name?: string;
  ipv4Config?: IpPoolIpPoolConfigInfo;
  ipv6Config?: IpPoolIpPoolConfigInfo;
  dnsDomain?: string;
  dnsSearchPath?: string;
  hostPrefix?: string;
  httpProxy?: string;
  networkAssociation?: IpPoolAssociation[];
  availableIpv4Addresses?: number;
  availableIpv6Addresses?: number;
  allocatedIpv4Addresses?: number;
  allocatedIpv6Addresses?: number;
}
export interface IpPoolAssociation extends DynamicData {
  network?: Network;
  networkName: string;
}
export interface IpPoolIpPoolConfigInfo extends DynamicData {
  subnetAddress?: string;
  netmask?: string;
  gateway?: string;
  range?: string;
  dns?: string[];
  dhcpServerAvailable?: boolean;
  ipPoolEnabled?: boolean;
}
export interface VAppOvfSectionInfo extends DynamicData {
  key?: number;
  namespace?: string;
  type?: string;
  atEnvelopeLevel?: boolean;
  contents?: string;
}
export interface VAppOvfSectionSpec extends ArrayUpdateSpec {
  info?: VAppOvfSectionInfo;
}
export interface VAppProductInfo extends DynamicData {
  key: number;
  classId?: string;
  instanceId?: string;
  name?: string;
  vendor?: string;
  version?: string;
  fullVersion?: string;
  vendorUrl?: string;
  productUrl?: string;
  appUrl?: string;
}
export interface VAppProductSpec extends ArrayUpdateSpec {
  info?: VAppProductInfo;
}
export interface VAppPropertyInfo extends DynamicData {
  key: number;
  classId?: string;
  instanceId?: string;
  id?: string;
  category?: string;
  label?: string;
  type?: string;
  typeReference?: string;
  userConfigurable?: boolean;
  defaultValue?: string;
  value?: string;
  description?: string;
}
export interface VAppPropertySpec extends ArrayUpdateSpec {
  info?: VAppPropertyInfo;
}
export interface VmConfigInfo extends DynamicData {
  product?: VAppProductInfo[];
  property?: VAppPropertyInfo[];
  ipAssignment: VAppIPAssignmentInfo;
  eula?: string[];
  ovfSection?: VAppOvfSectionInfo[];
  ovfEnvironmentTransport?: string[];
  installBootRequired: boolean;
  installBootStopDelay: number;
}
export interface VmConfigSpec extends DynamicData {
  product?: VAppProductSpec[];
  property?: VAppPropertySpec[];
  ipAssignment?: VAppIPAssignmentInfo;
  eula?: string[];
  ovfSection?: VAppOvfSectionSpec[];
  ovfEnvironmentTransport?: string[];
  installBootRequired?: boolean;
  installBootStopDelay?: number;
}
export interface ClusterNetworkConfigSpec extends DynamicData {
  networkPortGroup: Network;
  ipSettings: CustomizationIPSettings;
}
export interface FailoverNodeInfo extends DynamicData {
  clusterIpSettings: CustomizationIPSettings;
  failoverIp?: CustomizationIPSettings;
  biosUuid?: string;
}
export interface NodeDeploymentSpec extends DynamicData {
  esxHost?: HostSystem;
  datastore?: Datastore;
  publicNetworkPortGroup?: Network;
  clusterNetworkPortGroup?: Network;
  folder: Folder;
  resourcePool?: ResourcePool;
  managementVc?: ServiceLocator;
  nodeName: string;
  ipSettings: CustomizationIPSettings;
}
export interface NodeNetworkSpec extends DynamicData {
  ipSettings: CustomizationIPSettings;
}
export interface PassiveNodeDeploymentSpec extends NodeDeploymentSpec {
  failoverIpSettings?: CustomizationIPSettings;
}
export interface PassiveNodeNetworkSpec extends NodeNetworkSpec {
  failoverIpSettings?: CustomizationIPSettings;
}
export interface SourceNodeSpec extends DynamicData {
  managementVc: ServiceLocator;
  activeVc: VirtualMachine;
}
export interface VchaClusterConfigInfo extends DynamicData {
  failoverNodeInfo1?: FailoverNodeInfo;
  failoverNodeInfo2?: FailoverNodeInfo;
  witnessNodeInfo?: WitnessNodeInfo;
  state: string;
}
export interface VchaClusterConfigSpec extends DynamicData {
  passiveIp: string;
  witnessIp: string;
}
export interface VchaClusterDeploymentSpec extends DynamicData {
  passiveDeploymentSpec: PassiveNodeDeploymentSpec;
  witnessDeploymentSpec: NodeDeploymentSpec;
  activeVcSpec: SourceNodeSpec;
  activeVcNetworkConfig?: ClusterNetworkConfigSpec;
}
export interface VchaClusterNetworkSpec extends DynamicData {
  witnessNetworkSpec: NodeNetworkSpec;
  passiveNetworkSpec: PassiveNodeNetworkSpec;
}
export interface WitnessNodeInfo extends DynamicData {
  ipSettings: CustomizationIPSettings;
  biosUuid?: string;
}
export interface VchaClusterHealth extends DynamicData {
  runtimeInfo: VchaClusterRuntimeInfo;
  healthMessages?: LocalizableMessage[];
  additionalInformation?: LocalizableMessage[];
}
export interface VchaClusterRuntimeInfo extends DynamicData {
  clusterState: string;
  nodeInfo?: VchaNodeRuntimeInfo[];
  clusterMode: string;
}
export interface VchaNodeRuntimeInfo extends DynamicData {
  nodeState: string;
  nodeRole: string;
  nodeIp: string;
}
export interface VirtualMachineAffinityInfo extends DynamicData {
  affinitySet?: number[];
}
export interface VirtualMachineBootOptions extends DynamicData {
  bootDelay?: number;
  enterBIOSSetup?: boolean;
  efiSecureBootEnabled?: boolean;
  bootRetryEnabled?: boolean;
  bootRetryDelay?: number;
  bootOrder?: VirtualMachineBootOptionsBootableDevice[];
  networkBootProtocol?: string;
}
export interface VirtualMachineBootOptionsBootableCdromDevice extends VirtualMachineBootOptionsBootableDevice {
  
}
export interface VirtualMachineBootOptionsBootableDevice extends DynamicData {
  
}
export interface VirtualMachineBootOptionsBootableDiskDevice extends VirtualMachineBootOptionsBootableDevice {
  deviceKey: number;
}
export interface VirtualMachineBootOptionsBootableEthernetDevice extends VirtualMachineBootOptionsBootableDevice {
  deviceKey: number;
}
export interface VirtualMachineBootOptionsBootableFloppyDevice extends VirtualMachineBootOptionsBootableDevice {
  
}
export interface VirtualMachineCapability extends DynamicData {
  snapshotOperationsSupported: boolean;
  multipleSnapshotsSupported: boolean;
  snapshotConfigSupported: boolean;
  poweredOffSnapshotsSupported: boolean;
  memorySnapshotsSupported: boolean;
  revertToSnapshotSupported: boolean;
  quiescedSnapshotsSupported: boolean;
  disableSnapshotsSupported: boolean;
  lockSnapshotsSupported: boolean;
  consolePreferencesSupported: boolean;
  cpuFeatureMaskSupported: boolean;
  s1AcpiManagementSupported: boolean;
  settingScreenResolutionSupported: boolean;
  toolsAutoUpdateSupported: boolean;
  vmNpivWwnSupported: boolean;
  npivWwnOnNonRdmVmSupported: boolean;
  vmNpivWwnDisableSupported: boolean;
  vmNpivWwnUpdateSupported: boolean;
  swapPlacementSupported: boolean;
  toolsSyncTimeSupported: boolean;
  virtualMmuUsageSupported: boolean;
  diskSharesSupported: boolean;
  bootOptionsSupported: boolean;
  bootRetryOptionsSupported: boolean;
  settingVideoRamSizeSupported: boolean;
  settingDisplayTopologySupported: boolean;
  recordReplaySupported: boolean;
  changeTrackingSupported: boolean;
  multipleCoresPerSocketSupported: boolean;
  hostBasedReplicationSupported: boolean;
  guestAutoLockSupported: boolean;
  memoryReservationLockSupported: boolean;
  featureRequirementSupported: boolean;
  poweredOnMonitorTypeChangeSupported: boolean;
  seSparseDiskSupported: boolean;
  nestedHVSupported: boolean;
  vPMCSupported: boolean;
  secureBootSupported?: boolean;
  perVmEvcSupported?: boolean;
  virtualMmuUsageIgnored?: boolean;
  virtualExecUsageIgnored?: boolean;
  diskOnlySnapshotOnSuspendedVMSupported?: boolean;
  toolsSyncTimeAllowSupported?: boolean;
  sevSupported?: boolean;
}
export interface VirtualMachineCloneSpec extends DynamicData {
  location: VirtualMachineRelocateSpec;
  template: boolean;
  config?: VirtualMachineConfigSpec;
  customization?: CustomizationSpec;
  powerOn: boolean;
  snapshot?: VirtualMachineSnapshot;
  memory?: boolean;
}
export interface VirtualMachineConfigInfo extends DynamicData {
  changeVersion: string;
  modified: Date;
  name: string;
  guestFullName: string;
  version: string;
  uuid: string;
  createDate?: Date;
  instanceUuid?: string;
  npivNodeWorldWideName?: number[];
  npivPortWorldWideName?: number[];
  npivWorldWideNameType?: string;
  npivDesiredNodeWwns?: number;
  npivDesiredPortWwns?: number;
  npivTemporaryDisabled?: boolean;
  npivOnNonRdmDisks?: boolean;
  locationId?: string;
  template: boolean;
  guestId: string;
  alternateGuestName: string;
  annotation?: string;
  files: VirtualMachineFileInfo;
  tools?: ToolsConfigInfo;
  flags: VirtualMachineFlagInfo;
  consolePreferences?: VirtualMachineConsolePreferences;
  defaultPowerOps: VirtualMachineDefaultPowerOpInfo;
  hardware: VirtualHardware;
  vcpuConfig?: VirtualMachineVcpuConfig[];
  cpuAllocation?: ResourceAllocationInfo;
  memoryAllocation?: ResourceAllocationInfo;
  latencySensitivity?: LatencySensitivity;
  memoryHotAddEnabled?: boolean;
  cpuHotAddEnabled?: boolean;
  cpuHotRemoveEnabled?: boolean;
  hotPlugMemoryLimit?: number;
  hotPlugMemoryIncrementSize?: number;
  cpuAffinity?: VirtualMachineAffinityInfo;
  memoryAffinity?: VirtualMachineAffinityInfo;
  networkShaper?: VirtualMachineNetworkShaperInfo;
  extraConfig?: OptionValue[];
  cpuFeatureMask?: HostCpuIdInfo[];
  datastoreUrl?: VirtualMachineConfigInfoDatastoreUrlPair[];
  swapPlacement?: string;
  bootOptions?: VirtualMachineBootOptions;
  ftInfo?: FaultToleranceConfigInfo;
  repConfig?: ReplicationConfigSpec;
  vAppConfig?: VmConfigInfo;
  vAssertsEnabled?: boolean;
  changeTrackingEnabled?: boolean;
  firmware?: string;
  maxMksConnections?: number;
  guestAutoLockEnabled?: boolean;
  managedBy?: ManagedByInfo;
  memoryReservationLockedToMax?: boolean;
  initialOverhead?: VirtualMachineConfigInfoOverheadInfo;
  nestedHVEnabled?: boolean;
  vPMCEnabled?: boolean;
  scheduledHardwareUpgradeInfo?: ScheduledHardwareUpgradeInfo;
  forkConfigInfo?: VirtualMachineForkConfigInfo;
  vFlashCacheReservation?: number;
  vmxConfigChecksum?: Buffer;
  messageBusTunnelEnabled?: boolean;
  vmStorageObjectId?: string;
  swapStorageObjectId?: string;
  keyId?: CryptoKeyId;
  guestIntegrityInfo?: VirtualMachineGuestIntegrityInfo;
  migrateEncryption?: string;
  sgxInfo?: VirtualMachineSgxInfo;
  contentLibItemInfo?: VirtualMachineContentLibraryItemInfo;
  guestMonitoringModeInfo?: VirtualMachineGuestMonitoringModeInfo;
  sevEnabled?: boolean;
}
export interface VirtualMachineConfigInfoDatastoreUrlPair extends DynamicData {
  name: string;
  url: string;
}
export interface VirtualMachineConfigInfoOverheadInfo extends DynamicData {
  initialMemoryReservation?: number;
  initialSwapReservation?: number;
}
export interface VirtualMachineConfigOption extends DynamicData {
  version: string;
  description: string;
  guestOSDescriptor: GuestOsDescriptor[];
  guestOSDefaultIndex: number;
  hardwareOptions: VirtualHardwareOption;
  capabilities: VirtualMachineCapability;
  datastore: DatastoreOption;
  defaultDevice?: VirtualDevice[];
  supportedMonitorType: string[];
  supportedOvfEnvironmentTransport?: string[];
  supportedOvfInstallTransport?: string[];
  propertyRelations?: VirtualMachinePropertyRelation[];
}
export interface VirtualMachineConfigOptionDescriptor extends DynamicData {
  key: string;
  description?: string;
  host?: HostSystem[];
  createSupported: boolean;
  defaultConfigOption: boolean;
  runSupported: boolean;
  upgradeSupported: boolean;
}
export interface VirtualMachineConfigSpec extends DynamicData {
  changeVersion?: string;
  name?: string;
  version?: string;
  createDate?: Date;
  uuid?: string;
  instanceUuid?: string;
  npivNodeWorldWideName?: number[];
  npivPortWorldWideName?: number[];
  npivWorldWideNameType?: string;
  npivDesiredNodeWwns?: number;
  npivDesiredPortWwns?: number;
  npivTemporaryDisabled?: boolean;
  npivOnNonRdmDisks?: boolean;
  npivWorldWideNameOp?: string;
  locationId?: string;
  guestId?: string;
  alternateGuestName?: string;
  annotation?: string;
  files?: VirtualMachineFileInfo;
  tools?: ToolsConfigInfo;
  flags?: VirtualMachineFlagInfo;
  consolePreferences?: VirtualMachineConsolePreferences;
  powerOpInfo?: VirtualMachineDefaultPowerOpInfo;
  numCPUs?: number;
  vcpuConfig?: VirtualMachineVcpuConfig[];
  numCoresPerSocket?: number;
  memoryMB?: number;
  memoryHotAddEnabled?: boolean;
  cpuHotAddEnabled?: boolean;
  cpuHotRemoveEnabled?: boolean;
  virtualICH7MPresent?: boolean;
  virtualSMCPresent?: boolean;
  deviceChange?: VirtualDeviceConfigSpec[];
  cpuAllocation?: ResourceAllocationInfo;
  memoryAllocation?: ResourceAllocationInfo;
  latencySensitivity?: LatencySensitivity;
  cpuAffinity?: VirtualMachineAffinityInfo;
  memoryAffinity?: VirtualMachineAffinityInfo;
  networkShaper?: VirtualMachineNetworkShaperInfo;
  cpuFeatureMask?: VirtualMachineCpuIdInfoSpec[];
  extraConfig?: OptionValue[];
  swapPlacement?: string;
  bootOptions?: VirtualMachineBootOptions;
  vAppConfig?: VmConfigSpec;
  ftInfo?: FaultToleranceConfigInfo;
  repConfig?: ReplicationConfigSpec;
  vAppConfigRemoved?: boolean;
  vAssertsEnabled?: boolean;
  changeTrackingEnabled?: boolean;
  firmware?: string;
  maxMksConnections?: number;
  guestAutoLockEnabled?: boolean;
  managedBy?: ManagedByInfo;
  memoryReservationLockedToMax?: boolean;
  nestedHVEnabled?: boolean;
  vPMCEnabled?: boolean;
  scheduledHardwareUpgradeInfo?: ScheduledHardwareUpgradeInfo;
  vmProfile?: VirtualMachineProfileSpec[];
  messageBusTunnelEnabled?: boolean;
  crypto?: CryptoSpec;
  migrateEncryption?: string;
  sgxInfo?: VirtualMachineSgxInfo;
  guestMonitoringModeInfo?: VirtualMachineGuestMonitoringModeInfo;
  sevEnabled?: boolean;
}
export interface VirtualMachineCpuIdInfoSpec extends ArrayUpdateSpec {
  info?: HostCpuIdInfo;
}
export interface VirtualMachineConsolePreferences extends DynamicData {
  powerOnWhenOpened?: boolean;
  enterFullScreenOnPowerOn?: boolean;
  closeOnPowerOffOrSuspend?: boolean;
}
export interface VirtualMachineContentLibraryItemInfo extends DynamicData {
  contentLibraryItemUuid: string;
  contentLibraryItemVersion?: string;
}
export interface DatastoreOption extends DynamicData {
  unsupportedVolumes?: VirtualMachineDatastoreVolumeOption[];
}
export interface VirtualMachineDatastoreVolumeOption extends DynamicData {
  fileSystemType: string;
  majorVersion?: number;
}
export interface VirtualMachineDefaultPowerOpInfo extends DynamicData {
  powerOffType?: string;
  suspendType?: string;
  resetType?: string;
  defaultPowerOffType?: string;
  defaultSuspendType?: string;
  defaultResetType?: string;
  standbyAction?: string;
}
export interface VirtualMachineDeviceRuntimeInfo extends DynamicData {
  runtimeState: VirtualMachineDeviceRuntimeInfoDeviceRuntimeState;
  key: number;
}
export interface VirtualMachineDeviceRuntimeInfoDeviceRuntimeState extends DynamicData {
  
}
export interface VirtualMachineDeviceRuntimeInfoVirtualEthernetCardRuntimeState extends VirtualMachineDeviceRuntimeInfoDeviceRuntimeState {
  vmDirectPathGen2Active: boolean;
  vmDirectPathGen2InactiveReasonVm?: string[];
  vmDirectPathGen2InactiveReasonOther?: string[];
  vmDirectPathGen2InactiveReasonExtended?: string;
  reservationStatus?: string;
  attachmentStatus?: string;
  featureRequirement?: VirtualMachineFeatureRequirement[];
}
export interface FaultToleranceConfigInfo extends DynamicData {
  role: number;
  instanceUuids: string[];
  configPaths: string[];
  orphaned?: boolean;
}
export interface FaultToleranceConfigSpec extends DynamicData {
  metaDataPath?: FaultToleranceMetaSpec;
  secondaryVmSpec?: FaultToleranceVMConfigSpec;
}
export interface FaultToleranceMetaSpec extends DynamicData {
  metaDataDatastore: Datastore;
}
export interface FaultTolerancePrimaryConfigInfo extends FaultToleranceConfigInfo {
  secondaries: VirtualMachine[];
}
export interface FaultToleranceSecondaryConfigInfo extends FaultToleranceConfigInfo {
  primaryVM: VirtualMachine;
}
export interface FaultToleranceSecondaryOpResult extends DynamicData {
  vm: VirtualMachine;
  powerOnAttempted: boolean;
  powerOnResult?: ClusterPowerOnVmResult;
}
export interface FaultToleranceVMConfigSpec extends DynamicData {
  vmConfig?: Datastore;
  disks?: FaultToleranceDiskSpec[];
}
export interface FaultToleranceDiskSpec extends DynamicData {
  disk: VirtualDevice;
  datastore: Datastore;
}
export interface VirtualMachineFeatureRequirement extends DynamicData {
  key: string;
  featureName: string;
  value: string;
}
export interface VirtualMachineFileInfo extends DynamicData {
  vmPathName?: string;
  snapshotDirectory?: string;
  suspendDirectory?: string;
  logDirectory?: string;
  ftMetadataDirectory?: string;
}
export interface VirtualMachineFileLayout extends DynamicData {
  configFile?: string[];
  logFile?: string[];
  disk?: VirtualMachineFileLayoutDiskLayout[];
  snapshot?: VirtualMachineFileLayoutSnapshotLayout[];
  swapFile?: string;
}
export interface VirtualMachineFileLayoutDiskLayout extends DynamicData {
  key: number;
  diskFile: string[];
}
export interface VirtualMachineFileLayoutSnapshotLayout extends DynamicData {
  key: VirtualMachineSnapshot;
  snapshotFile: string[];
}
export interface VirtualMachineFileLayoutEx extends DynamicData {
  file?: VirtualMachineFileLayoutExFileInfo[];
  disk?: VirtualMachineFileLayoutExDiskLayout[];
  snapshot?: VirtualMachineFileLayoutExSnapshotLayout[];
  timestamp: Date;
}
export interface VirtualMachineFileLayoutExDiskLayout extends DynamicData {
  key: number;
  chain?: VirtualMachineFileLayoutExDiskUnit[];
}
export interface VirtualMachineFileLayoutExDiskUnit extends DynamicData {
  fileKey: number[];
}
export interface VirtualMachineFileLayoutExFileInfo extends DynamicData {
  key: number;
  name: string;
  type: string;
  size: number;
  uniqueSize?: number;
  backingObjectId?: string;
  accessible?: boolean;
}
export interface VirtualMachineFileLayoutExSnapshotLayout extends DynamicData {
  key: VirtualMachineSnapshot;
  dataKey: number;
  memoryKey: number;
  disk?: VirtualMachineFileLayoutExDiskLayout[];
}
export interface VirtualMachineFlagInfo extends DynamicData {
  disableAcceleration?: boolean;
  enableLogging?: boolean;
  useToe?: boolean;
  runWithDebugInfo?: boolean;
  monitorType?: string;
  htSharing?: string;
  snapshotDisabled?: boolean;
  snapshotLocked?: boolean;
  diskUuidEnabled?: boolean;
  virtualMmuUsage?: string;
  virtualExecUsage?: string;
  snapshotPowerOffBehavior?: string;
  recordReplayEnabled?: boolean;
  faultToleranceType?: string;
  cbrcCacheEnabled?: boolean;
  vvtdEnabled?: boolean;
  vbsEnabled?: boolean;
}
export interface VirtualMachineForkConfigInfo extends DynamicData {
  parentEnabled?: boolean;
  childForkGroupId?: string;
  parentForkGroupId?: string;
  childType?: string;
}
export interface GuestInfo extends DynamicData {
  toolsStatus?: VirtualMachineToolsStatus;
  toolsVersionStatus?: string;
  toolsVersionStatus2?: string;
  toolsRunningStatus?: string;
  toolsVersion?: string;
  toolsInstallType?: string;
  guestId?: string;
  guestFamily?: string;
  guestFullName?: string;
  hostName?: string;
  ipAddress?: string;
  net?: GuestNicInfo[];
  ipStack?: GuestStackInfo[];
  disk?: GuestDiskInfo[];
  screen?: GuestScreenInfo;
  guestState: string;
  appHeartbeatStatus?: string;
  guestKernelCrashed?: boolean;
  appState?: string;
  guestOperationsReady?: boolean;
  interactiveGuestOperationsReady?: boolean;
  guestStateChangeSupported?: boolean;
  generationInfo?: GuestInfoNamespaceGenerationInfo[];
  hwVersion?: string;
}
export interface GuestDiskInfo extends DynamicData {
  diskPath?: string;
  capacity?: number;
  freeSpace?: number;
  filesystemType?: string;
  mappings?: GuestInfoVirtualDiskMapping[];
}
export interface GuestInfoNamespaceGenerationInfo extends DynamicData {
  key: string;
  generationNo: number;
}
export interface GuestNicInfo extends DynamicData {
  network?: string;
  ipAddress?: string[];
  macAddress?: string;
  connected: boolean;
  deviceConfigId: number;
  dnsConfig?: NetDnsConfigInfo;
  ipConfig?: NetIpConfigInfo;
  netBIOSConfig?: NetBIOSConfigInfo;
}
export interface GuestScreenInfo extends DynamicData {
  width: number;
  height: number;
}
export interface GuestStackInfo extends DynamicData {
  dnsConfig?: NetDnsConfigInfo;
  ipRouteConfig?: NetIpRouteConfigInfo;
  ipStackConfig?: KeyValue[];
  dhcpConfig?: NetDhcpConfigInfo;
}
export interface GuestInfoVirtualDiskMapping extends DynamicData {
  key: number;
}
export interface VirtualMachineGuestIntegrityInfo extends DynamicData {
  enabled?: boolean;
}
export interface VirtualMachineGuestMonitoringModeInfo extends DynamicData {
  gmmFile?: string;
  gmmAppliance?: string;
}
export interface GuestOsDescriptor extends DynamicData {
  id: string;
  family: string;
  fullName: string;
  supportedMaxCPUs: number;
  numSupportedPhysicalSockets: number;
  numSupportedCoresPerSocket: number;
  supportedMinMemMB: number;
  supportedMaxMemMB: number;
  recommendedMemMB: number;
  recommendedColorDepth: number;
  supportedDiskControllerList: string[];
  recommendedSCSIController?: string;
  recommendedDiskController: string;
  supportedNumDisks: number;
  recommendedDiskSizeMB: number;
  recommendedCdromController: string;
  supportedEthernetCard: string[];
  recommendedEthernetCard?: string;
  supportsSlaveDisk?: boolean;
  cpuFeatureMask?: HostCpuIdInfo[];
  smcRequired: boolean;
  supportsWakeOnLan: boolean;
  supportsVMI: boolean;
  supportsMemoryHotAdd: boolean;
  supportsCpuHotAdd: boolean;
  supportsCpuHotRemove: boolean;
  supportedFirmware: string[];
  recommendedFirmware: string;
  supportedUSBControllerList?: string[];
  recommendedUSBController?: string;
  supports3D: boolean;
  recommended3D: boolean;
  smcRecommended: boolean;
  ich7mRecommended: boolean;
  usbRecommended: boolean;
  supportLevel: string;
  supportedForCreate: boolean;
  vRAMSizeInKB: IntOption;
  numSupportedFloppyDevices: number;
  wakeOnLanEthernetCard?: string[];
  supportsPvscsiControllerForBoot: boolean;
  diskUuidEnabled: boolean;
  supportsHotPlugPCI: boolean;
  supportsSecureBoot?: boolean;
  defaultSecureBoot?: boolean;
  persistentMemorySupported?: boolean;
  supportedMinPersistentMemoryMB?: number;
  supportedMaxPersistentMemoryMB?: number;
  recommendedPersistentMemoryMB?: number;
  persistentMemoryHotAddSupported?: boolean;
  persistentMemoryHotRemoveSupported?: boolean;
  persistentMemoryColdGrowthSupported?: boolean;
  persistentMemoryColdGrowthGranularityMB?: number;
  persistentMemoryHotGrowthSupported?: boolean;
  persistentMemoryHotGrowthGranularityMB?: number;
  numRecommendedPhysicalSockets?: number;
  numRecommendedCoresPerSocket?: number;
  vvtdSupported?: BoolOption;
  vbsSupported?: BoolOption;
  vsgxSupported?: BoolOption;
  supportsTPM20?: boolean;
  vwdtSupported?: boolean;
}
export interface VirtualMachineGuestQuiesceSpec extends DynamicData {
  timeout?: number;
}
export interface VirtualMachineInstantCloneSpec extends DynamicData {
  name: string;
  location: VirtualMachineRelocateSpec;
  config?: OptionValue[];
  biosUuid?: string;
}
export interface VirtualMachineLegacyNetworkSwitchInfo extends DynamicData {
  name: string;
}
export interface VirtualMachineMessage extends DynamicData {
  id: string;
  argument?: any[];
  text?: string;
}
export interface VirtualMachineMetadataManagerVmMetadata extends DynamicData {
  vmId: string;
  metadata?: string;
}
export interface VirtualMachineMetadataManagerVmMetadataInput extends DynamicData {
  operation: string;
  vmMetadata: VirtualMachineMetadataManagerVmMetadata;
}
export interface VirtualMachineMetadataManagerVmMetadataOwner extends DynamicData {
  name: string;
}
export interface VirtualMachineMetadataManagerVmMetadataResult extends DynamicData {
  vmMetadata: VirtualMachineMetadataManagerVmMetadata;
  error?: MethodFault;
}
export interface VirtualMachineNetworkShaperInfo extends DynamicData {
  enabled?: boolean;
  peakBps?: number;
  averageBps?: number;
  burstSize?: number;
}
export interface VirtualMachineProfileDetails extends DynamicData {
  profile?: VirtualMachineProfileSpec[];
  diskProfileDetails?: VirtualMachineProfileDetailsDiskProfileDetails[];
}
export interface VirtualMachineProfileDetailsDiskProfileDetails extends DynamicData {
  diskId: number;
  profile?: VirtualMachineProfileSpec[];
}
export interface VirtualMachineProfileRawData extends DynamicData {
  extensionKey: string;
  objectData?: string;
}
export interface VirtualMachineProfileSpec extends DynamicData {
  
}
export interface VirtualMachinePropertyRelation extends DynamicData {
  key: DynamicProperty;
  relations?: DynamicProperty[];
}
export interface VirtualMachineQuestionInfo extends DynamicData {
  id: string;
  text: string;
  choice: ChoiceOption;
  message?: VirtualMachineMessage[];
}
export interface ReplicationConfigSpec extends DynamicData {
  generation: number;
  vmReplicationId: string;
  destination: string;
  port: number;
  rpo: number;
  quiesceGuestEnabled: boolean;
  paused: boolean;
  oppUpdatesEnabled: boolean;
  netCompressionEnabled?: boolean;
  netEncryptionEnabled?: boolean;
  encryptionDestination?: string;
  encryptionPort?: number;
  remoteCertificateThumbprint?: string;
  disk?: ReplicationInfoDiskSettings[];
}
export interface ReplicationInfoDiskSettings extends DynamicData {
  key: number;
  diskReplicationId: string;
}
export interface ScheduledHardwareUpgradeInfo extends DynamicData {
  upgradePolicy?: string;
  versionKey?: string;
  scheduledHardwareUpgradeStatus?: string;
  fault?: MethodFault;
}
export interface VirtualMachineSgxInfo extends DynamicData {
  epcSize: number;
  flcMode?: string;
  lePubKeyHash?: string;
}
export interface VirtualMachineSnapshotInfo extends DynamicData {
  currentSnapshot?: VirtualMachineSnapshot;
  rootSnapshotList: VirtualMachineSnapshotTree[];
}
export interface VirtualMachineSriovDevicePoolInfo extends DynamicData {
  key: string;
}
export interface VirtualMachineSriovNetworkDevicePoolInfo extends VirtualMachineSriovDevicePoolInfo {
  switchKey?: string;
  switchUuid?: string;
}
export interface VirtualMachineStorageInfo extends DynamicData {
  perDatastoreUsage?: VirtualMachineUsageOnDatastore[];
  timestamp: Date;
}
export interface VirtualMachineUsageOnDatastore extends DynamicData {
  datastore: Datastore;
  committed: number;
  uncommitted: number;
  unshared: number;
}
export interface VirtualMachineTargetInfo extends DynamicData {
  name: string;
  configurationTag?: string[];
}
export interface ToolsConfigInfo extends DynamicData {
  toolsVersion?: number;
  toolsInstallType?: string;
  afterPowerOn?: boolean;
  afterResume?: boolean;
  beforeGuestStandby?: boolean;
  beforeGuestShutdown?: boolean;
  beforeGuestReboot?: boolean;
  toolsUpgradePolicy?: string;
  pendingCustomization?: string;
  customizationKeyId?: CryptoKeyId;
  syncTimeWithHostAllowed?: boolean;
  syncTimeWithHost?: boolean;
  lastInstallInfo?: ToolsConfigInfoToolsLastInstallInfo;
}
export interface ToolsConfigInfoToolsLastInstallInfo extends DynamicData {
  counter: number;
  fault?: MethodFault;
}
export interface VirtualMachineUsbInfo extends VirtualMachineTargetInfo {
  description: string;
  vendor: number;
  product: number;
  physicalPath: string;
  family?: string[];
  speed?: string[];
  summary?: VirtualMachineSummary;
}
export interface UsbScanCodeSpec extends DynamicData {
  keyEvents: UsbScanCodeSpecKeyEvent[];
}
export interface UsbScanCodeSpecKeyEvent extends DynamicData {
  usbHidCode: number;
  modifiers?: UsbScanCodeSpecModifierType;
}
export interface UsbScanCodeSpecModifierType extends DynamicData {
  leftControl?: boolean;
  leftShift?: boolean;
  leftAlt?: boolean;
  leftGui?: boolean;
  rightControl?: boolean;
  rightShift?: boolean;
  rightAlt?: boolean;
  rightGui?: boolean;
}
export interface VirtualMachineVcpuConfig extends DynamicData {
  latencySensitivity?: LatencySensitivity;
}
export interface VirtualHardware extends DynamicData {
  numCPU: number;
  numCoresPerSocket?: number;
  memoryMB: number;
  virtualICH7MPresent?: boolean;
  virtualSMCPresent?: boolean;
  device?: VirtualDevice[];
}
export interface VirtualHardwareOption extends DynamicData {
  hwVersion: number;
  virtualDeviceOption: VirtualDeviceOption[];
  deviceListReadonly: boolean;
  numCPU: number[];
  numCoresPerSocket: IntOption;
  numCpuReadonly: boolean;
  memoryMB: LongOption;
  numPCIControllers: IntOption;
  numIDEControllers: IntOption;
  numUSBControllers: IntOption;
  numUSBXHCIControllers: IntOption;
  numSIOControllers: IntOption;
  numPS2Controllers: IntOption;
  licensingLimit?: string[];
  numSupportedWwnPorts?: IntOption;
  numSupportedWwnNodes?: IntOption;
  resourceConfigOption: ResourceConfigOption;
  numNVDIMMControllers?: IntOption;
  numTPMDevices?: IntOption;
  numWDTDevices?: IntOption;
  numPrecisionClockDevices?: IntOption;
  epcMemoryMB?: LongOption;
}
export interface VirtualMachineWindowsQuiesceSpec extends VirtualMachineGuestQuiesceSpec {
  vssBackupType?: number;
  vssBootableSystemState?: boolean;
  vssPartialFileSupport?: boolean;
  vssBackupContext?: string;
}
export interface CheckResult extends DynamicData {
  vm?: VirtualMachine;
  host?: HostSystem;
  warning?: MethodFault[];
  error?: MethodFault[];
}
export interface CustomizationAdapterMapping extends DynamicData {
  macAddress?: string;
  adapter: CustomizationIPSettings;
}
export interface CustomizationGlobalIPSettings extends DynamicData {
  dnsSuffixList?: string[];
  dnsServerList?: string[];
}
export interface CustomizationGuiRunOnce extends DynamicData {
  commandList: string[];
}
export interface CustomizationGuiUnattended extends DynamicData {
  password?: CustomizationPassword;
  timeZone: number;
  autoLogon: boolean;
  autoLogonCount: number;
}
export interface CustomizationIPSettings extends DynamicData {
  ip: CustomizationIpGenerator;
  subnetMask?: string;
  gateway?: string[];
  ipV6Spec?: CustomizationIPSettingsIpV6AddressSpec;
  dnsServerList?: string[];
  dnsDomain?: string;
  primaryWINS?: string;
  secondaryWINS?: string;
  netBIOS?: CustomizationNetBIOSMode;
}
export interface CustomizationIPSettingsIpV6AddressSpec extends DynamicData {
  ip: CustomizationIpV6Generator[];
  gateway?: string[];
}
export interface CustomizationIdentification extends DynamicData {
  joinWorkgroup?: string;
  joinDomain?: string;
  domainAdmin?: string;
  domainAdminPassword?: CustomizationPassword;
}
export interface CustomizationIdentitySettings extends DynamicData {
  
}
export interface CustomizationIpGenerator extends DynamicData {
  
}
export interface CustomizationIpV6Generator extends DynamicData {
  
}
export interface CustomizationLicenseFilePrintData extends DynamicData {
  autoMode: CustomizationLicenseDataMode;
  autoUsers?: number;
}
export interface CustomizationLinuxPrep extends CustomizationIdentitySettings {
  hostName: CustomizationName;
  domain: string;
  timeZone?: string;
  hwClockUTC?: boolean;
  scriptText?: string;
}
export interface CustomizationName extends DynamicData {
  
}
export interface CustomizationOptions extends DynamicData {
  
}
export interface CustomizationPassword extends DynamicData {
  value: string;
  plainText: boolean;
}
export interface CustomizationPrefixName extends CustomizationName {
  base: string;
}
export interface CustomizationSpec extends DynamicData {
  options?: CustomizationOptions;
  identity: CustomizationIdentitySettings;
  globalIPSettings: CustomizationGlobalIPSettings;
  nicSettingMap?: CustomizationAdapterMapping[];
  encryptionKey?: number[];
}
export interface CustomizationStatelessIpV6Generator extends CustomizationIpV6Generator {
  
}
export interface CustomizationSysprep extends CustomizationIdentitySettings {
  guiUnattended: CustomizationGuiUnattended;
  userData: CustomizationUserData;
  guiRunOnce?: CustomizationGuiRunOnce;
  identification: CustomizationIdentification;
  licenseFilePrintData?: CustomizationLicenseFilePrintData;
}
export interface CustomizationSysprepText extends CustomizationIdentitySettings {
  value: string;
}
export interface CustomizationUnknownIpGenerator extends CustomizationIpGenerator {
  
}
export interface CustomizationUnknownIpV6Generator extends CustomizationIpV6Generator {
  
}
export interface CustomizationUnknownName extends CustomizationName {
  
}
export interface CustomizationUserData extends DynamicData {
  fullName: string;
  orgName: string;
  computerName: CustomizationName;
  productId: string;
}
export interface CustomizationVirtualMachineName extends CustomizationName {
  
}
export interface CustomizationWinOptions extends CustomizationOptions {
  changeSID: boolean;
  deleteAccounts: boolean;
  reboot?: CustomizationSysprepRebootOption;
}
export interface HostDiskMappingInfo extends DynamicData {
  physicalPartition?: HostDiskMappingPartitionInfo;
  name: string;
  exclusive?: boolean;
}
export interface HostDiskMappingPartitionInfo extends DynamicData {
  name: string;
  fileSystem: string;
  capacityInKb: number;
}
export interface HostDiskMappingOption extends DynamicData {
  physicalPartition?: HostDiskMappingPartitionOption[];
  name: string;
}
export interface HostDiskMappingPartitionOption extends DynamicData {
  name: string;
  fileSystem: string;
  capacityInKb: number;
}
export interface VirtualDevice extends DynamicData {
  key: number;
  deviceInfo?: Description;
  backing?: VirtualDeviceBackingInfo;
  connectable?: VirtualDeviceConnectInfo;
  slotInfo?: VirtualDeviceBusSlotInfo;
  controllerKey?: number;
  unitNumber?: number;
}
export interface VirtualDeviceBackingInfo extends DynamicData {
  
}
export interface VirtualDeviceBusSlotInfo extends DynamicData {
  
}
export interface VirtualDeviceConnectInfo extends DynamicData {
  migrateConnect?: string;
  startConnected: boolean;
  allowGuestControl: boolean;
  connected: boolean;
  status?: string;
}
export interface VirtualDeviceDeviceBackingInfo extends VirtualDeviceBackingInfo {
  deviceName: string;
  useAutoDetect?: boolean;
}
export interface VirtualDeviceFileBackingInfo extends VirtualDeviceBackingInfo {
  fileName: string;
  datastore?: Datastore;
  backingObjectId?: string;
}
export interface VirtualDevicePciBusSlotInfo extends VirtualDeviceBusSlotInfo {
  pciSlotNumber: number;
}
export interface VirtualDevicePipeBackingInfo extends VirtualDeviceBackingInfo {
  pipeName: string;
}
export interface VirtualDeviceRemoteDeviceBackingInfo extends VirtualDeviceBackingInfo {
  deviceName: string;
  useAutoDetect?: boolean;
}
export interface VirtualDeviceURIBackingInfo extends VirtualDeviceBackingInfo {
  serviceURI: string;
  direction: string;
  proxyURI?: string;
}
export interface VirtualDeviceOption extends DynamicData {
  type: string;
  connectOption?: VirtualDeviceConnectOption;
  busSlotOption?: VirtualDeviceBusSlotOption;
  controllerType?: string;
  autoAssignController?: BoolOption;
  backingOption?: VirtualDeviceBackingOption[];
  defaultBackingOptionIndex?: number;
  licensingLimit?: string[];
  deprecated: boolean;
  plugAndPlay: boolean;
  hotRemoveSupported: boolean;
}
export interface VirtualDeviceBackingOption extends DynamicData {
  type: string;
}
export interface VirtualDeviceBusSlotOption extends DynamicData {
  type: string;
}
export interface VirtualDeviceConnectOption extends DynamicData {
  startConnected: BoolOption;
  allowGuestControl: BoolOption;
}
export interface VirtualDeviceDeviceBackingOption extends VirtualDeviceBackingOption {
  autoDetectAvailable: BoolOption;
}
export interface VirtualDeviceFileBackingOption extends VirtualDeviceBackingOption {
  fileNameExtensions?: ChoiceOption;
}
export interface VirtualDevicePipeBackingOption extends VirtualDeviceBackingOption {
  
}
export interface VirtualDeviceRemoteDeviceBackingOption extends VirtualDeviceBackingOption {
  autoDetectAvailable: BoolOption;
}
export interface VirtualDeviceURIBackingOption extends VirtualDeviceBackingOption {
  directions: ChoiceOption;
}
export interface VirtualDeviceConfigSpec extends DynamicData {
  operation?: VirtualDeviceConfigSpecOperation;
  fileOperation?: VirtualDeviceConfigSpecFileOperation;
  device: VirtualDevice;
  profile?: VirtualMachineProfileSpec[];
  backing?: VirtualDeviceConfigSpecBackingSpec;
}
export interface VirtualDeviceConfigSpecBackingSpec extends DynamicData {
  parent?: VirtualDeviceConfigSpecBackingSpec;
  crypto?: CryptoSpec;
}
export interface VirtualDisk extends VirtualDevice {
  capacityInKB: number;
  capacityInBytes?: number;
  shares?: SharesInfo;
  storageIOAllocation?: StorageIOAllocationInfo;
  diskObjectId?: string;
  vFlashCacheConfigInfo?: VirtualDiskVFlashCacheConfigInfo;
  iofilter?: string[];
  vDiskId?: ID;
  nativeUnmanagedLinkedClone?: boolean;
}
export interface VirtualDiskFlatVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  diskMode: string;
  split?: boolean;
  writeThrough?: boolean;
  contentId?: string;
  parent?: VirtualDiskFlatVer1BackingInfo;
}
export interface VirtualDiskFlatVer2BackingInfo extends VirtualDeviceFileBackingInfo {
  diskMode: string;
  split?: boolean;
  writeThrough?: boolean;
  thinProvisioned?: boolean;
  eagerlyScrub?: boolean;
  uuid?: string;
  contentId?: string;
  changeId?: string;
  parent?: VirtualDiskFlatVer2BackingInfo;
  deltaDiskFormat?: string;
  digestEnabled?: boolean;
  deltaGrainSize?: number;
  deltaDiskFormatVariant?: string;
  sharing?: string;
  keyId?: CryptoKeyId;
}
export interface VirtualDiskLocalPMemBackingInfo extends VirtualDeviceFileBackingInfo {
  diskMode: string;
  uuid?: string;
  volumeUUID?: string;
  contentId?: string;
}
export interface VirtualDiskPartitionedRawDiskVer2BackingInfo extends VirtualDiskRawDiskVer2BackingInfo {
  partition: number[];
}
export interface VirtualDiskRawDiskMappingVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  lunUuid?: string;
  deviceName?: string;
  compatibilityMode?: string;
  diskMode?: string;
  uuid?: string;
  contentId?: string;
  changeId?: string;
  parent?: VirtualDiskRawDiskMappingVer1BackingInfo;
  deltaDiskFormat?: string;
  deltaGrainSize?: number;
  sharing?: string;
}
export interface VirtualDiskRawDiskVer2BackingInfo extends VirtualDeviceDeviceBackingInfo {
  descriptorFileName: string;
  uuid?: string;
  changeId?: string;
  sharing?: string;
}
export interface VirtualDiskSeSparseBackingInfo extends VirtualDeviceFileBackingInfo {
  diskMode: string;
  writeThrough?: boolean;
  uuid?: string;
  contentId?: string;
  changeId?: string;
  parent?: VirtualDiskSeSparseBackingInfo;
  deltaDiskFormat?: string;
  digestEnabled?: boolean;
  grainSize?: number;
  keyId?: CryptoKeyId;
}
export interface VirtualDiskSparseVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  diskMode: string;
  split?: boolean;
  writeThrough?: boolean;
  spaceUsedInKB?: number;
  contentId?: string;
  parent?: VirtualDiskSparseVer1BackingInfo;
}
export interface VirtualDiskSparseVer2BackingInfo extends VirtualDeviceFileBackingInfo {
  diskMode: string;
  split?: boolean;
  writeThrough?: boolean;
  spaceUsedInKB?: number;
  uuid?: string;
  contentId?: string;
  changeId?: string;
  parent?: VirtualDiskSparseVer2BackingInfo;
  keyId?: CryptoKeyId;
}
export interface VirtualDiskVFlashCacheConfigInfo extends DynamicData {
  vFlashModule?: string;
  reservationInMB?: number;
  cacheConsistencyType?: string;
  cacheMode?: string;
  blockSizeInKB?: number;
}
export interface VirtualDiskId extends DynamicData {
  vm: VirtualMachine;
  diskId: number;
}
export interface VirtualDiskOption extends VirtualDeviceOption {
  capacityInKB: LongOption;
  ioAllocationOption: StorageIOAllocationOption;
  vFlashCacheConfigOption?: VirtualDiskOptionVFlashCacheConfigOption;
}
export interface VirtualDiskDeltaDiskFormatsSupported extends DynamicData {
  datastoreType: string;
  deltaDiskFormat: ChoiceOption;
}
export interface VirtualDiskFlatVer1BackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  split: BoolOption;
  writeThrough: BoolOption;
  growable: boolean;
}
export interface VirtualDiskFlatVer2BackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  split: BoolOption;
  writeThrough: BoolOption;
  growable: boolean;
  hotGrowable: boolean;
  uuid: boolean;
  thinProvisioned: BoolOption;
  eagerlyScrub: BoolOption;
  deltaDiskFormat: ChoiceOption;
  deltaDiskFormatsSupported: VirtualDiskDeltaDiskFormatsSupported[];
}
export interface VirtualDiskLocalPMemBackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  growable: boolean;
  hotGrowable: boolean;
  uuid: boolean;
}
export interface VirtualDiskPartitionedRawDiskVer2BackingOption extends VirtualDiskRawDiskVer2BackingOption {
  
}
export interface VirtualDiskRawDiskMappingVer1BackingOption extends VirtualDeviceDeviceBackingOption {
  descriptorFileNameExtensions?: ChoiceOption;
  compatibilityMode: ChoiceOption;
  diskMode: ChoiceOption;
  uuid: boolean;
}
export interface VirtualDiskRawDiskVer2BackingOption extends VirtualDeviceDeviceBackingOption {
  descriptorFileNameExtensions: ChoiceOption;
  uuid: boolean;
}
export interface VirtualDiskSeSparseBackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  writeThrough: BoolOption;
  growable: boolean;
  hotGrowable: boolean;
  uuid: boolean;
  deltaDiskFormatsSupported: VirtualDiskDeltaDiskFormatsSupported[];
}
export interface VirtualDiskSparseVer1BackingOption extends VirtualDeviceFileBackingOption {
  diskModes: ChoiceOption;
  split: BoolOption;
  writeThrough: BoolOption;
  growable: boolean;
}
export interface VirtualDiskSparseVer2BackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  split: BoolOption;
  writeThrough: BoolOption;
  growable: boolean;
  hotGrowable: boolean;
  uuid: boolean;
}
export interface VirtualDiskOptionVFlashCacheConfigOption extends DynamicData {
  cacheConsistencyType: ChoiceOption;
  cacheMode: ChoiceOption;
  reservationInMB: LongOption;
  blockSizeInKB: LongOption;
}
export interface VirtualDiskConfigSpec extends VirtualDeviceConfigSpec {
  diskMoveType?: string;
  migrateCache?: boolean;
}
export interface VirtualEthernetCard extends VirtualDevice {
  addressType?: string;
  macAddress?: string;
  wakeOnLanEnabled?: boolean;
  resourceAllocation?: VirtualEthernetCardResourceAllocation;
  externalId?: string;
  uptCompatibilityEnabled?: boolean;
}
export interface VirtualEthernetCardDistributedVirtualPortBackingInfo extends VirtualDeviceBackingInfo {
  port: DistributedVirtualSwitchPortConnection;
}
export interface VirtualEthernetCardLegacyNetworkBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualEthernetCardNetworkBackingInfo extends VirtualDeviceDeviceBackingInfo {
  network?: Network;
  inPassthroughMode?: boolean;
}
export interface VirtualEthernetCardOpaqueNetworkBackingInfo extends VirtualDeviceBackingInfo {
  opaqueNetworkId: string;
  opaqueNetworkType: string;
}
export interface VirtualEthernetCardResourceAllocation extends DynamicData {
  reservation?: number;
  share: SharesInfo;
  limit?: number;
}
export interface VirtualEthernetCardOption extends VirtualDeviceOption {
  supportedOUI: ChoiceOption;
  macType: ChoiceOption;
  wakeOnLanEnabled: BoolOption;
  vmDirectPathGen2Supported: boolean;
  uptCompatibilityEnabled?: BoolOption;
}
export interface VirtualEthernetCardDVPortBackingOption extends VirtualDeviceBackingOption {
  
}
export interface VirtualEthernetCardLegacyNetworkBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualEthernetCardNetworkBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualEthernetCardOpaqueNetworkBackingOption extends VirtualDeviceBackingOption {
  
}
export interface VirtualFloppy extends VirtualDevice {
  
}
export interface VirtualFloppyDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualFloppyImageBackingInfo extends VirtualDeviceFileBackingInfo {
  
}
export interface VirtualFloppyRemoteDeviceBackingInfo extends VirtualDeviceRemoteDeviceBackingInfo {
  
}
export interface VirtualFloppyOption extends VirtualDeviceOption {
  
}
export interface VirtualFloppyDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualFloppyImageBackingOption extends VirtualDeviceFileBackingOption {
  
}
export interface VirtualFloppyRemoteDeviceBackingOption extends VirtualDeviceRemoteDeviceBackingOption {
  
}
export interface VirtualKeyboard extends VirtualDevice {
  
}
export interface VirtualKeyboardOption extends VirtualDeviceOption {
  
}
export interface VirtualNVDIMM extends VirtualDevice {
  capacityInMB: number;
}
export interface VirtualNVDIMMBackingInfo extends VirtualDeviceFileBackingInfo {
  parent?: VirtualNVDIMMBackingInfo;
  changeId?: string;
}
export interface VirtualNVDIMMOption extends VirtualDeviceOption {
  capacityInMB: LongOption;
  growable: boolean;
  hotGrowable: boolean;
  granularityInMB: number;
}
export interface VirtualPCIPassthrough extends VirtualDevice {
  
}
export interface VirtualPCIPassthroughAllowedDevice extends DynamicData {
  vendorId: number;
  deviceId: number;
  subVendorId?: number;
  subDeviceId?: number;
  revisionId?: number;
}
export interface VirtualPCIPassthroughDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  id: string;
  deviceId: string;
  systemId: string;
  vendorId: number;
}
export interface VirtualPCIPassthroughDynamicBackingInfo extends VirtualDeviceDeviceBackingInfo {
  allowedDevice?: VirtualPCIPassthroughAllowedDevice[];
  customLabel?: string;
  assignedId?: string;
}
export interface VirtualPCIPassthroughPluginBackingInfo extends VirtualDeviceBackingInfo {
  
}
export interface VirtualPCIPassthroughVmiopBackingInfo extends VirtualPCIPassthroughPluginBackingInfo {
  vgpu?: string;
}
export interface VirtualPCIPassthroughOption extends VirtualDeviceOption {
  
}
export interface VirtualPCIPassthroughDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualPCIPassthroughDynamicBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualPCIPassthroughPluginBackingOption extends VirtualDeviceBackingOption {
  
}
export interface VirtualPCIPassthroughVmiopBackingOption extends VirtualPCIPassthroughPluginBackingOption {
  vgpu: StringOption;
  maxInstances: number;
}
export interface VirtualPCNet32 extends VirtualEthernetCard {
  
}
export interface VirtualPCNet32Option extends VirtualEthernetCardOption {
  supportsMorphing: boolean;
}
export interface VirtualParallelPort extends VirtualDevice {
  
}
export interface VirtualParallelPortDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualParallelPortFileBackingInfo extends VirtualDeviceFileBackingInfo {
  
}
export interface VirtualParallelPortOption extends VirtualDeviceOption {
  
}
export interface VirtualParallelPortDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualParallelPortFileBackingOption extends VirtualDeviceFileBackingOption {
  
}
export interface VirtualPointingDevice extends VirtualDevice {
  
}
export interface VirtualPointingDeviceDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  hostPointingDevice: string;
}
export interface VirtualPointingDeviceOption extends VirtualDeviceOption {
  
}
export interface VirtualPointingDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  hostPointingDevice: ChoiceOption;
}
export interface VirtualPrecisionClock extends VirtualDevice {
  
}
export interface VirtualPrecisionClockSystemClockBackingInfo extends VirtualDeviceBackingInfo {
  protocol?: string;
}
export interface VirtualPrecisionClockOption extends VirtualDeviceOption {
  
}
export interface VirtualPrecisionClockSystemClockBackingOption extends VirtualDeviceBackingOption {
  protocol: ChoiceOption;
}
export interface VirtualSCSIPassthrough extends VirtualDevice {
  
}
export interface VirtualSCSIPassthroughDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualSCSIPassthroughOption extends VirtualDeviceOption {
  
}
export interface VirtualSCSIPassthroughDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualSerialPort extends VirtualDevice {
  yieldOnPoll: boolean;
}
export interface VirtualSerialPortDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualSerialPortFileBackingInfo extends VirtualDeviceFileBackingInfo {
  
}
export interface VirtualSerialPortPipeBackingInfo extends VirtualDevicePipeBackingInfo {
  endpoint: string;
  noRxLoss?: boolean;
}
export interface VirtualSerialPortThinPrintBackingInfo extends VirtualDeviceBackingInfo {
  
}
export interface VirtualSerialPortURIBackingInfo extends VirtualDeviceURIBackingInfo {
  
}
export interface VirtualSerialPortOption extends VirtualDeviceOption {
  yieldOnPoll: BoolOption;
}
export interface VirtualSerialPortDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualSerialPortFileBackingOption extends VirtualDeviceFileBackingOption {
  
}
export interface VirtualSerialPortPipeBackingOption extends VirtualDevicePipeBackingOption {
  endpoint: ChoiceOption;
  noRxLoss: BoolOption;
}
export interface VirtualSerialPortThinPrintBackingOption extends VirtualDeviceBackingOption {
  
}
export interface VirtualSerialPortURIBackingOption extends VirtualDeviceURIBackingOption {
  
}
export interface VirtualSoundCard extends VirtualDevice {
  
}
export interface VirtualSoundCardDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualSoundCardOption extends VirtualDeviceOption {
  
}
export interface VirtualSoundCardDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualSriovEthernetCard extends VirtualEthernetCard {
  allowGuestOSMtuChange?: boolean;
  sriovBacking?: VirtualSriovEthernetCardSriovBackingInfo;
}
export interface VirtualSriovEthernetCardSriovBackingInfo extends VirtualDeviceBackingInfo {
  physicalFunctionBacking?: VirtualPCIPassthroughDeviceBackingInfo;
  virtualFunctionBacking?: VirtualPCIPassthroughDeviceBackingInfo;
  virtualFunctionIndex?: number;
}
export interface VirtualSriovEthernetCardOption extends VirtualEthernetCardOption {
  
}
export interface VirtualSriovEthernetCardSriovBackingOption extends VirtualDeviceBackingOption {
  
}
export interface VirtualTPM extends VirtualDevice {
  endorsementKeyCertificateSigningRequest?: Buffer[];
  endorsementKeyCertificate?: Buffer[];
}
export interface VirtualTPMOption extends VirtualDeviceOption {
  supportedFirmware?: string[];
}
export interface VirtualUSB extends VirtualDevice {
  connected: boolean;
  vendor?: number;
  product?: number;
  family?: string[];
  speed?: string[];
}
export interface VirtualUSBRemoteClientBackingInfo extends VirtualDeviceRemoteDeviceBackingInfo {
  hostname: string;
}
export interface VirtualUSBRemoteHostBackingInfo extends VirtualDeviceDeviceBackingInfo {
  hostname: string;
}
export interface VirtualUSBUSBBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualUSBOption extends VirtualDeviceOption {
  
}
export interface VirtualUSBRemoteClientBackingOption extends VirtualDeviceRemoteDeviceBackingOption {
  
}
export interface VirtualUSBRemoteHostBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualUSBUSBBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualMachineVMCIDevice extends VirtualDevice {
  id?: number;
  allowUnrestrictedCommunication?: boolean;
  filterEnable?: boolean;
  filterInfo?: VirtualMachineVMCIDeviceFilterInfo;
}
export interface VirtualMachineVMCIDeviceFilterInfo extends DynamicData {
  filters?: VirtualMachineVMCIDeviceFilterSpec[];
}
export interface VirtualMachineVMCIDeviceFilterSpec extends DynamicData {
  rank: number;
  action: string;
  protocol: string;
  direction: string;
  lowerDstPortBoundary?: number;
  upperDstPortBoundary?: number;
}
export interface VirtualMachineVMCIDeviceOption extends VirtualDeviceOption {
  allowUnrestrictedCommunication: BoolOption;
  filterSpecOption?: VirtualMachineVMCIDeviceOptionFilterSpecOption;
  filterSupported?: BoolOption;
}
export interface VirtualMachineVMCIDeviceOptionFilterSpecOption extends DynamicData {
  action: ChoiceOption;
  protocol: ChoiceOption;
  direction: ChoiceOption;
  lowerDstPortBoundary: LongOption;
  upperDstPortBoundary: LongOption;
}
export interface VirtualMachineVMIROM extends VirtualDevice {
  
}
export interface VirtualVMIROMOption extends VirtualDeviceOption {
  
}
export interface VirtualMachineVideoCard extends VirtualDevice {
  videoRamSizeInKB?: number;
  numDisplays?: number;
  useAutoDetect?: boolean;
  enable3DSupport?: boolean;
  use3dRenderer?: string;
  graphicsMemorySizeInKB?: number;
}
export interface VirtualVideoCardOption extends VirtualDeviceOption {
  videoRamSizeInKB?: LongOption;
  numDisplays?: IntOption;
  useAutoDetect?: BoolOption;
  support3D?: BoolOption;
  use3dRendererSupported?: BoolOption;
  graphicsMemorySizeInKB?: LongOption;
  graphicsMemorySizeSupported?: BoolOption;
}
export interface VirtualVmxnet extends VirtualEthernetCard {
  
}
export interface VirtualVmxnet2 extends VirtualVmxnet {
  
}
export interface VirtualVmxnet3 extends VirtualVmxnet {
  
}
export interface VirtualVmxnet3Vrdma extends VirtualVmxnet3 {
  deviceProtocol?: string;
}
export interface VirtualVmxnetOption extends VirtualEthernetCardOption {
  
}
export interface VirtualWDT extends VirtualDevice {
  runOnBoot: boolean;
  running: boolean;
}
export interface VirtualWDTOption extends VirtualDeviceOption {
  runOnBoot: BoolOption;
}
export interface GuestAliases extends DynamicData {
  base64Cert: string;
  aliases: GuestAuthAliasInfo[];
}
export interface GuestAuthAliasInfo extends DynamicData {
  subject: GuestAuthSubject;
  comment: string;
}
export interface GuestAuthAnySubject extends GuestAuthSubject {
  
}
export interface GuestAuthNamedSubject extends GuestAuthSubject {
  name: string;
}
export interface GuestAuthSubject extends DynamicData {
  
}
export interface GuestMappedAliases extends DynamicData {
  base64Cert: string;
  username: string;
  subjects: GuestAuthSubject[];
}
export interface GuestFileAttributes extends DynamicData {
  modificationTime?: Date;
  accessTime?: Date;
  symlinkTarget?: string;
}
export interface GuestFileInfo extends DynamicData {
  path: string;
  type: string;
  size: number;
  attributes: GuestFileAttributes;
}
export interface FileTransferInformation extends DynamicData {
  attributes: GuestFileAttributes;
  size: number;
  url: string;
}
export interface GuestListFileInfo extends DynamicData {
  files?: GuestFileInfo[];
  remaining: number;
}
export interface GuestPosixFileAttributes extends GuestFileAttributes {
  ownerId?: number;
  groupId?: number;
  permissions?: number;
}
export interface GuestWindowsFileAttributes extends GuestFileAttributes {
  hidden?: boolean;
  readOnly?: boolean;
  createTime?: Date;
}
export interface GuestAuthentication extends DynamicData {
  interactiveSession: boolean;
}
export interface NamePasswordAuthentication extends GuestAuthentication {
  username: string;
  password: string;
}
export interface GuestProcessInfo extends DynamicData {
  name: string;
  pid: number;
  owner: string;
  cmdLine: string;
  startTime: Date;
  endTime?: Date;
  exitCode?: number;
}
export interface GuestProgramSpec extends DynamicData {
  programPath: string;
  arguments: string;
  workingDirectory?: string;
  envVariables?: string[];
}
export interface GuestWindowsProgramSpec extends GuestProgramSpec {
  startMinimized: boolean;
}
export interface SAMLTokenAuthentication extends GuestAuthentication {
  token: string;
  username?: string;
}
export interface SSPIAuthentication extends GuestAuthentication {
  sspiToken: string;
}
export interface TicketedSessionAuthentication extends GuestAuthentication {
  ticket: string;
}
export interface GuestRegKeySpec extends DynamicData {
  keyName: GuestRegKeyNameSpec;
  classType: string;
  lastWritten: Date;
}
export interface GuestRegKeyNameSpec extends DynamicData {
  registryPath: string;
  wowBitness: string;
}
export interface GuestRegKeyRecordSpec extends DynamicData {
  key: GuestRegKeySpec;
  fault?: MethodFault;
}
export interface GuestRegValueSpec extends DynamicData {
  name: GuestRegValueNameSpec;
  data: GuestRegValueDataSpec;
}
export interface GuestRegValueBinarySpec extends GuestRegValueDataSpec {
  value?: Buffer;
}
export interface GuestRegValueDataSpec extends DynamicData {
  
}
export interface GuestRegValueDwordSpec extends GuestRegValueDataSpec {
  value: number;
}
export interface GuestRegValueExpandStringSpec extends GuestRegValueDataSpec {
  value?: string;
}
export interface GuestRegValueMultiStringSpec extends GuestRegValueDataSpec {
  value?: string[];
}
export interface GuestRegValueNameSpec extends DynamicData {
  keyName: GuestRegKeyNameSpec;
  name: string;
}
export interface GuestRegValueQwordSpec extends GuestRegValueDataSpec {
  value: number;
}
export interface GuestRegValueStringSpec extends GuestRegValueDataSpec {
  value?: string;
}
export interface DeviceGroupId extends DynamicData {
  id: string;
}
export interface FaultDomainId extends DynamicData {
  id: string;
}
export interface ReplicationGroupId extends DynamicData {
  faultDomainId: FaultDomainId;
  deviceGroupId: DeviceGroupId;
}
export interface ReplicationSpec extends DynamicData {
  replicationGroupId: ReplicationGroupId;
}
export interface VsanClusterConfigInfo extends DynamicData {
  enabled?: boolean;
  defaultConfig?: VsanClusterConfigInfoHostDefaultInfo;
}
export interface VsanClusterConfigInfoHostDefaultInfo extends DynamicData {
  uuid?: string;
  autoClaimStorage?: boolean;
  checksumEnabled?: boolean;
}
export interface VsanHostClusterStatus extends DynamicData {
  uuid?: string;
  nodeUuid?: string;
  health: string;
  nodeState: VsanHostClusterStatusState;
  memberUuid?: string[];
}
export interface VsanHostClusterStatusState extends DynamicData {
  state: string;
  completion?: VsanHostClusterStatusStateCompletionEstimate;
}
export interface VsanHostClusterStatusStateCompletionEstimate extends DynamicData {
  completeTime?: Date;
  percentComplete?: number;
}
export interface VsanHostConfigInfo extends DynamicData {
  enabled?: boolean;
  hostSystem?: HostSystem;
  clusterInfo?: VsanHostConfigInfoClusterInfo;
  storageInfo?: VsanHostConfigInfoStorageInfo;
  networkInfo?: VsanHostConfigInfoNetworkInfo;
  faultDomainInfo?: VsanHostFaultDomainInfo;
}
export interface VsanHostConfigInfoClusterInfo extends DynamicData {
  uuid?: string;
  nodeUuid?: string;
}
export interface VsanHostFaultDomainInfo extends DynamicData {
  name: string;
}
export interface VsanHostConfigInfoNetworkInfo extends DynamicData {
  port?: VsanHostConfigInfoNetworkInfoPortConfig[];
}
export interface VsanHostConfigInfoNetworkInfoPortConfig extends DynamicData {
  ipConfig?: VsanHostIpConfig;
  device: string;
}
export interface VsanHostConfigInfoStorageInfo extends DynamicData {
  autoClaimStorage?: boolean;
  diskMapping?: VsanHostDiskMapping[];
  diskMapInfo?: VsanHostDiskMapInfo[];
  checksumEnabled?: boolean;
}
export interface VsanHostDecommissionMode extends DynamicData {
  objectAction: string;
}
export interface VsanHostDiskMapInfo extends DynamicData {
  mapping: VsanHostDiskMapping;
  mounted: boolean;
}
export interface VsanHostDiskMapResult extends DynamicData {
  mapping: VsanHostDiskMapping;
  diskResult?: VsanHostDiskResult[];
  error?: MethodFault;
}
export interface VsanHostDiskMapping extends DynamicData {
  ssd: HostScsiDisk;
  nonSsd: HostScsiDisk[];
}
export interface VsanHostDiskResult extends DynamicData {
  disk: HostScsiDisk;
  state: string;
  vsanUuid?: string;
  error?: MethodFault;
  degraded?: boolean;
}
export interface VsanHostIpConfig extends DynamicData {
  upstreamIpAddress: string;
  downstreamIpAddress: string;
}
export interface VsanHostMembershipInfo extends DynamicData {
  nodeUuid: string;
  hostname: string;
}
export interface VsanHostVsanDiskInfo extends DynamicData {
  vsanUuid: string;
  formatVersion: number;
}
export interface VsanHostRuntimeInfo extends DynamicData {
  membershipList?: VsanHostMembershipInfo[];
  diskIssues?: VsanHostRuntimeInfoDiskIssue[];
  accessGenNo?: number;
}
export interface VsanHostRuntimeInfoDiskIssue extends DynamicData {
  diskId: string;
  issue: string;
}
export interface BaseConfigInfo extends DynamicData {
  id: ID;
  name: string;
  createTime: Date;
  keepAfterDeleteVm?: boolean;
  relocationDisabled?: boolean;
  nativeSnapshotSupported?: boolean;
  changedBlockTrackingEnabled?: boolean;
  backing: BaseConfigInfoBackingInfo;
  iofilter?: string[];
}
export interface BaseConfigInfoBackingInfo extends DynamicData {
  datastore: Datastore;
}
export interface BaseConfigInfoDiskFileBackingInfo extends BaseConfigInfoFileBackingInfo {
  provisioningType: string;
}
export interface BaseConfigInfoFileBackingInfo extends BaseConfigInfoBackingInfo {
  filePath: string;
  backingObjectId?: string;
  parent?: BaseConfigInfoFileBackingInfo;
  deltaSizeInMB?: number;
  keyId?: CryptoKeyId;
}
export interface BaseConfigInfoRawDiskMappingBackingInfo extends BaseConfigInfoFileBackingInfo {
  lunUuid: string;
  compatibilityMode: string;
}
export interface VslmCreateSpec extends DynamicData {
  name: string;
  keepAfterDeleteVm?: boolean;
  backingSpec: VslmCreateSpecBackingSpec;
  capacityInMB: number;
  profile?: VirtualMachineProfileSpec[];
  crypto?: CryptoSpec;
  metadata?: KeyValue[];
}
export interface VslmCreateSpecBackingSpec extends DynamicData {
  datastore: Datastore;
  path?: string;
}
export interface VslmCreateSpecDiskFileBackingSpec extends VslmCreateSpecBackingSpec {
  provisioningType?: string;
}
export interface VslmCreateSpecRawDiskMappingBackingSpec extends VslmCreateSpecBackingSpec {
  lunUuid: string;
  compatibilityMode: string;
}
export interface DiskCryptoSpec extends DynamicData {
  parent?: DiskCryptoSpec;
  crypto: CryptoSpec;
}
export interface ID extends DynamicData {
  id: string;
}
export interface vslmInfrastructureObjectPolicy extends DynamicData {
  name: string;
  backingObjectId: string;
  profileId: string;
  error?: MethodFault;
}
export interface vslmInfrastructureObjectPolicySpec extends DynamicData {
  datastore: Datastore;
  profile?: VirtualMachineProfileSpec[];
}
export interface VslmMigrateSpec extends DynamicData {
  backingSpec: VslmCreateSpecBackingSpec;
  profile?: VirtualMachineProfileSpec[];
  consolidate?: boolean;
  disksCrypto?: DiskCryptoSpec;
}
export interface VslmRelocateSpec extends VslmMigrateSpec {
  
}
export interface VStorageObjectStateInfo extends DynamicData {
  tentative?: boolean;
}
export interface VslmTagEntry extends DynamicData {
  tagName: string;
  parentCategoryName: string;
}
export interface VStorageObject extends DynamicData {
  config: VStorageObjectConfigInfo;
}
export interface VStorageObjectConfigInfo extends BaseConfigInfo {
  capacityInMB: number;
  consumptionType?: string[];
  consumerId?: ID[];
}
export interface VStorageObjectSnapshotDetails extends DynamicData {
  path?: string;
  changedBlockTrackingId?: string;
}
export interface VStorageObjectSnapshotInfo extends DynamicData {
  snapshots?: VStorageObjectSnapshotInfoVStorageObjectSnapshot[];
}
export interface VStorageObjectSnapshotInfoVStorageObjectSnapshot extends DynamicData {
  id?: ID;
  backingObjectId?: string;
  createTime: Date;
  description: string;
}
export interface RetrieveVStorageObjSpec extends DynamicData {
  id: ID;
  datastore: Datastore;
}
export interface VStorageObjectAssociations extends DynamicData {
  id: ID;
  vmDiskAssociations?: VStorageObjectAssociationsVmDiskAssociations[];
  fault?: MethodFault;
}
export interface VStorageObjectAssociationsVmDiskAssociations extends DynamicData {
  vmId: string;
  diskKey: number;
}
export interface EntityPrivilege extends DynamicData {
  entity: ManagedEntity;
  privAvailability: PrivilegeAvailability[];
}
export interface Permission extends DynamicData {
  entity?: ManagedEntity;
  principal: string;
  group: boolean;
  roleId: number;
  propagate: boolean;
}
export interface AuthorizationPrivilege extends DynamicData {
  privId: string;
  onParent: boolean;
  name: string;
  privGroupName: string;
}
export interface PrivilegeAvailability extends DynamicData {
  privId: string;
  isGranted: boolean;
}
export interface AuthorizationRole extends DynamicData {
  roleId: number;
  system: boolean;
  name: string;
  info: Description;
  privilege?: string[];
}
export interface UserPrivilegeResult extends DynamicData {
  entity: ManagedEntity;
  privileges?: string[];
}
export interface BoolPolicy extends InheritablePolicy {
  value?: boolean;
}
export interface EVCMode extends ElementDescription {
  guaranteedCPUFeatures?: HostCpuIdInfo[];
  featureCapability?: HostFeatureCapability[];
  featureMask?: HostFeatureMask[];
  featureRequirement?: VirtualMachineFeatureRequirement[];
  vendor: string;
  track: string[];
  vendorTier: number;
}
export interface ImportSpec extends DynamicData {
  entityConfig?: VAppEntityConfigInfo;
  instantiationOst?: OvfConsumerOstNode;
}
export interface IntExpression extends NegatableExpression {
  value?: number;
}
export interface IpAddress extends NegatableExpression {
  
}
export interface IpRange extends IpAddress {
  addressPrefix: string;
  prefixLength?: number;
}
export interface LicenseAssignmentManagerLicenseAssignment extends DynamicData {
  entityId: string;
  scope?: string;
  entityDisplayName?: string;
  assignedLicense: LicenseManagerLicenseInfo;
  properties?: KeyAnyValue[];
}
export interface MacAddress extends NegatableExpression {
  
}
export interface MacRange extends MacAddress {
  address: string;
  mask: string;
}
export interface NetworkSummary extends DynamicData {
  network?: Network;
  name: string;
  accessible: boolean;
  ipPoolName: string;
  ipPoolId?: number;
}
export interface OpaqueNetworkCapability extends DynamicData {
  networkReservationSupported: boolean;
}
export interface OpaqueNetworkSummary extends NetworkSummary {
  opaqueNetworkId: string;
  opaqueNetworkType: string;
}
export interface PosixUserSearchResult extends UserSearchResult {
  id: number;
  shellAccess?: boolean;
}
export interface ResourcePoolResourceUsage extends DynamicData {
  reservationUsed: number;
  reservationUsedForVm: number;
  unreservedForPool: number;
  unreservedForVm: number;
  overallUsage: number;
  maxUsage: number;
}
export interface ResourcePoolRuntimeInfo extends DynamicData {
  memory: ResourcePoolResourceUsage;
  cpu: ResourcePoolResourceUsage;
  overallStatus: ManagedEntityStatus;
  sharesScalable?: string;
}
export interface ResourcePoolSummary extends DynamicData {
  name: string;
  config: ResourceConfigSpec;
  runtime: ResourcePoolRuntimeInfo;
  quickStats?: ResourcePoolQuickStats;
  configuredMemoryMB?: number;
}
export interface ResourcePoolQuickStats extends DynamicData {
  overallCpuUsage?: number;
  overallCpuDemand?: number;
  guestMemoryUsage?: number;
  hostMemoryUsage?: number;
  distributedCpuEntitlement?: number;
  distributedMemoryEntitlement?: number;
  staticCpuEntitlement?: number;
  staticMemoryEntitlement?: number;
  privateMemory?: number;
  sharedMemory?: number;
  swappedMemory?: number;
  balloonedMemory?: number;
  overheadMemory?: number;
  consumedOverheadMemory?: number;
  compressedMemory?: number;
}
export interface SingleIp extends IpAddress {
  address: string;
}
export interface SingleMac extends MacAddress {
  address: string;
}
export interface TaskFilterSpec extends DynamicData {
  entity?: TaskFilterSpecByEntity;
  time?: TaskFilterSpecByTime;
  userName?: TaskFilterSpecByUsername;
  activationId?: string[];
  state?: TaskInfoState[];
  alarm?: Alarm;
  scheduledTask?: ScheduledTask;
  eventChainId?: number[];
  tag?: string[];
  parentTaskKey?: string[];
  rootTaskKey?: string[];
}
export interface TaskFilterSpecByEntity extends DynamicData {
  entity: ManagedEntity;
  recursion: TaskFilterSpecRecursionOption;
}
export interface TaskFilterSpecByTime extends DynamicData {
  timeType: TaskFilterSpecTimeOption;
  beginTime?: Date;
  endTime?: Date;
}
export interface TaskFilterSpecByUsername extends DynamicData {
  systemUser: boolean;
  userList?: string[];
}
export interface VirtualAppLinkInfo extends DynamicData {
  key: ManagedEntity;
  destroyWithParent?: boolean;
}
export interface VirtualAppSummary extends ResourcePoolSummary {
  product?: VAppProductInfo;
  vAppState?: VirtualAppVAppState;
  suspended?: boolean;
  installBootRequired?: boolean;
  instanceUuid?: string;
}
export interface DeviceBackedVirtualDiskSpec extends VirtualDiskSpec {
  device: string;
}
export interface FileBackedVirtualDiskSpec extends VirtualDiskSpec {
  capacityKb: number;
  profile?: VirtualMachineProfileSpec[];
  crypto?: CryptoSpec;
}
export interface SeSparseVirtualDiskSpec extends FileBackedVirtualDiskSpec {
  grainSizeKb?: number;
}
export interface VirtualDiskSpec extends DynamicData {
  diskType: string;
  adapterType: string;
}
export interface VirtualMachineConnection extends DynamicData {
  label: string;
  client: string;
  userName: string;
}
export interface DiskChangeInfo extends DynamicData {
  startOffset: number;
  length: number;
  changedArea?: DiskChangeExtent[];
}
export interface DiskChangeExtent extends DynamicData {
  start: number;
  length: number;
}
export interface VirtualMachineDisplayTopology extends DynamicData {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface VirtualMachineMksConnection extends VirtualMachineConnection {
  
}
export interface VirtualMachineMksTicket extends DynamicData {
  ticket: string;
  cfgFile: string;
  host?: string;
  port?: number;
  sslThumbprint?: string;
}
export interface StorageRequirement extends DynamicData {
  datastore: Datastore;
  freeSpaceRequiredInKb: number;
}
export interface VirtualMachineTicket extends DynamicData {
  ticket: string;
  cfgFile: string;
  host?: string;
  port?: number;
  sslThumbprint?: string;
  url?: string;
}
export interface VirtualMachineWipeResult extends DynamicData {
  diskId: number;
  shrinkableDiskSpace: number;
}
export interface AlarmFilterSpec extends DynamicData {
  status?: ManagedEntityStatus[];
  typeEntity?: string;
  typeTrigger?: string;
}
export interface AlarmInfo extends AlarmSpec {
  key: string;
  alarm: Alarm;
  entity: ManagedEntity;
  lastModifiedTime: Date;
  lastModifiedUser: string;
  creationEventId: number;
}
export interface AlarmState extends DynamicData {
  key: string;
  entity: ManagedEntity;
  alarm: Alarm;
  overallStatus: ManagedEntityStatus;
  time: Date;
  acknowledged?: boolean;
  acknowledgedByUser?: string;
  acknowledgedTime?: Date;
  eventKey?: number;
  disabled?: boolean;
}
export interface AlarmTriggeringAction extends AlarmAction {
  action: Action;
  transitionSpecs?: AlarmTriggeringActionTransitionSpec[];
  green2yellow: boolean;
  yellow2red: boolean;
  red2yellow: boolean;
  yellow2green: boolean;
}
export interface AlarmTriggeringActionTransitionSpec extends DynamicData {
  startState: ManagedEntityStatus;
  finalState: ManagedEntityStatus;
  repeats: boolean;
}
export interface EventAlarmExpression extends AlarmExpression {
  comparisons?: EventAlarmExpressionComparison[];
  eventType: string;
  eventTypeId?: string;
  objectType?: string;
  status?: ManagedEntityStatus;
}
export interface EventAlarmExpressionComparison extends DynamicData {
  attributeName: string;
  operator: string;
  value: string;
}
export interface ClusterDasAamHostInfo extends ClusterDasHostInfo {
  hostDasState?: ClusterDasAamNodeState[];
  primaryHosts?: string[];
}
export interface ClusterDasVmConfigSpec extends ArrayUpdateSpec {
  info?: ClusterDasVmConfigInfo;
}
export interface ClusterDpmHostConfigSpec extends ArrayUpdateSpec {
  info?: ClusterDpmHostConfigInfo;
}
export interface ClusterDrsVmConfigSpec extends ArrayUpdateSpec {
  info?: ClusterDrsVmConfigInfo;
}
export interface ClusterFailoverHostAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  hostStatus?: ClusterFailoverHostAdmissionControlInfoHostStatus[];
}
export interface ClusterFailoverHostAdmissionControlInfoHostStatus extends DynamicData {
  host: HostSystem;
  status: ManagedEntityStatus;
}
export interface ClusterFixedSizeSlotPolicy extends ClusterSlotPolicy {
  cpu: number;
  memory: number;
}
export interface ClusterGroupSpec extends ArrayUpdateSpec {
  info?: ClusterGroupInfo;
}
export interface PlacementSpec extends DynamicData {
  priority?: VirtualMachineMovePriority;
  vm?: VirtualMachine;
  configSpec?: VirtualMachineConfigSpec;
  relocateSpec?: VirtualMachineRelocateSpec;
  hosts?: HostSystem[];
  datastores?: Datastore[];
  storagePods?: StoragePod[];
  disallowPrerequisiteMoves?: boolean;
  rules?: ClusterRuleInfo[];
  key?: string;
  placementType?: string;
  cloneSpec?: VirtualMachineCloneSpec;
  cloneName?: string;
}
export interface ClusterRuleInfo extends DynamicData {
  key?: number;
  status?: ManagedEntityStatus;
  enabled?: boolean;
  name?: string;
  mandatory?: boolean;
  userCreated?: boolean;
  inCompliance?: boolean;
  ruleUuid?: string;
}
export interface ClusterRuleSpec extends ArrayUpdateSpec {
  info?: ClusterRuleInfo;
}
export interface ClusterVmHostRuleInfo extends ClusterRuleInfo {
  vmGroupName?: string;
  affineHostGroupName?: string;
  antiAffineHostGroupName?: string;
}
export interface ClusterVmOrchestrationSpec extends ArrayUpdateSpec {
  info?: ClusterVmOrchestrationInfo;
}
export interface DVPortgroupConfigInfo extends DynamicData {
  key: string;
  name: string;
  numPorts: number;
  distributedVirtualSwitch?: DistributedVirtualSwitch;
  defaultPortConfig?: DVPortSetting;
  description?: string;
  type: string;
  backingType?: string;
  policy: DVPortgroupPolicy;
  portNameFormat?: string;
  scope?: ManagedEntity[];
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  configVersion?: string;
  autoExpand?: boolean;
  vmVnicNetworkResourcePoolKey?: string;
  uplink?: boolean;
  transportZoneUuid?: string;
  transportZoneName?: string;
  logicalSwitchUuid?: string;
  segmentId?: string;
}
export interface DVPortgroupConfigSpec extends DynamicData {
  configVersion?: string;
  name?: string;
  numPorts?: number;
  portNameFormat?: string;
  defaultPortConfig?: DVPortSetting;
  description?: string;
  type?: string;
  backingType?: string;
  scope?: ManagedEntity[];
  policy?: DVPortgroupPolicy;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  autoExpand?: boolean;
  vmVnicNetworkResourcePoolKey?: string;
  transportZoneUuid?: string;
  transportZoneName?: string;
  logicalSwitchUuid?: string;
  segmentId?: string;
}
export interface DistributedVirtualPortgroupNsxPortgroupOperationResult extends DynamicData {
  portgroups?: DistributedVirtualPortgroup[];
  problems?: DistributedVirtualPortgroupProblem[];
}
export interface DVPortgroupPolicy extends DynamicData {
  blockOverrideAllowed: boolean;
  shapingOverrideAllowed: boolean;
  vendorConfigOverrideAllowed: boolean;
  livePortMovingAllowed: boolean;
  portConfigResetAtDisconnect: boolean;
  networkResourcePoolOverrideAllowed?: boolean;
  trafficFilterOverrideAllowed?: boolean;
}
export interface DistributedVirtualPortgroupProblem extends DynamicData {
  logicalSwitchUuid: string;
  fault: MethodFault;
}
export interface CryptoManagerKmipCertificateInfo extends DynamicData {
  subject: string;
  issuer: string;
  serialNumber: string;
  notBefore: Date;
  notAfter: Date;
  fingerprint: string;
  checkTime: Date;
  secondsSinceValid?: number;
  secondsBeforeExpire?: number;
}
export interface CryptoManagerKmipClusterStatus extends DynamicData {
  clusterId: KeyProviderId;
  overallStatus?: ManagedEntityStatus;
  managementType?: string;
  servers: CryptoManagerKmipServerStatus[];
  clientCertInfo?: CryptoManagerKmipCertificateInfo;
}
export interface CryptoManagerKmipCryptoKeyStatus extends DynamicData {
  keyId: CryptoKeyId;
  keyAvailable?: boolean;
  reason?: string;
  encryptedVMs?: VirtualMachine[];
  affectedHosts?: HostSystem[];
  referencedByTags?: string[];
}
export interface CryptoManagerKmipServerCertInfo extends DynamicData {
  certificate: string;
  certInfo?: CryptoManagerKmipCertificateInfo;
  clientTrustServer?: boolean;
}
export interface CryptoManagerKmipServerStatus extends DynamicData {
  name: string;
  status: ManagedEntityStatus;
  connectionStatus: string;
  certInfo?: CryptoManagerKmipCertificateInfo;
  clientTrustServer?: boolean;
  serverTrustClient?: boolean;
}
export interface KmipServerStatus extends DynamicData {
  clusterId: KeyProviderId;
  name: string;
  status: ManagedEntityStatus;
  description: string;
}
export interface AccountCreatedEvent extends HostEvent {
  spec: HostAccountSpec;
  group: boolean;
}
export interface AccountRemovedEvent extends HostEvent {
  account: string;
  group: boolean;
}
export interface AccountUpdatedEvent extends HostEvent {
  spec: HostAccountSpec;
  group: boolean;
  prevDescription?: string;
}
export interface AdminPasswordNotChangedEvent extends HostEvent {
  
}
export interface AlarmEvent extends Event {
  alarm: AlarmEventArgument;
}
export interface AlarmReconfiguredEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  configChanges?: ChangesInfoEventArgument;
}
export interface AlarmRemovedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
}
export interface AlarmScriptCompleteEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  script: string;
}
export interface AlarmScriptFailedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  script: string;
  reason: MethodFault;
}
export interface AlarmSnmpCompletedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
}
export interface AlarmSnmpFailedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  reason: MethodFault;
}
export interface AlarmStatusChangedEvent extends AlarmEvent {
  source: ManagedEntityEventArgument;
  entity: ManagedEntityEventArgument;
  from: string;
  to: string;
}
export interface AllVirtualMachinesLicensedEvent extends LicenseEvent {
  
}
export interface AlreadyAuthenticatedSessionEvent extends SessionEvent {
  
}
export interface AuthorizationEvent extends Event {
  
}
export interface BadUsernameSessionEvent extends SessionEvent {
  ipAddress: string;
}
export interface CanceledHostOperationEvent extends HostEvent {
  
}
export interface ClusterEvent extends Event {
  
}
export interface ClusterOvercommittedEvent extends ClusterEvent {
  
}
export interface ClusterReconfiguredEvent extends ClusterEvent {
  configChanges?: ChangesInfoEventArgument;
}
export interface ClusterStatusChangedEvent extends ClusterEvent {
  oldStatus: string;
  newStatus: string;
}
export interface CustomFieldEvent extends Event {
  
}
export interface CustomFieldValueChangedEvent extends CustomFieldEvent {
  entity: ManagedEntityEventArgument;
  fieldKey: number;
  name: string;
  value: string;
  prevState?: string;
}
export interface CustomizationEvent extends VmEvent {
  logLocation?: string;
}
export interface CustomizationFailed extends CustomizationEvent {
  reason?: string;
}
export interface CustomizationLinuxIdentityFailed extends CustomizationFailed {
  
}
export interface CustomizationNetworkSetupFailed extends CustomizationFailed {
  
}
export interface CustomizationStartedEvent extends CustomizationEvent {
  
}
export interface CustomizationSucceeded extends CustomizationEvent {
  
}
export interface CustomizationSysprepFailed extends CustomizationFailed {
  sysprepVersion: string;
  systemVersion: string;
}
export interface CustomizationUnknownFailure extends CustomizationFailed {
  
}
export interface DVPortgroupEvent extends Event {
  
}
export interface DVPortgroupReconfiguredEvent extends DVPortgroupEvent {
  configSpec: DVPortgroupConfigSpec;
  configChanges?: ChangesInfoEventArgument;
}
export interface DVPortgroupRenamedEvent extends DVPortgroupEvent {
  oldName: string;
  newName: string;
}
export interface DasAdmissionControlDisabledEvent extends ClusterEvent {
  
}
export interface DasAdmissionControlEnabledEvent extends ClusterEvent {
  
}
export interface DasAgentFoundEvent extends ClusterEvent {
  
}
export interface DasAgentUnavailableEvent extends ClusterEvent {
  
}
export interface DasClusterIsolatedEvent extends ClusterEvent {
  
}
export interface DasDisabledEvent extends ClusterEvent {
  
}
export interface DasEnabledEvent extends ClusterEvent {
  
}
export interface DasHostFailedEvent extends ClusterEvent {
  failedHost: HostEventArgument;
}
export interface DasHostIsolatedEvent extends ClusterEvent {
  isolatedHost: HostEventArgument;
}
export interface DatacenterEvent extends Event {
  
}
export interface DatacenterRenamedEvent extends DatacenterEvent {
  oldName: string;
  newName: string;
}
export interface DatastoreDiscoveredEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}
export interface DatastoreEvent extends Event {
  datastore?: DatastoreEventArgument;
}
export interface DatastoreFileEvent extends DatastoreEvent {
  targetFile: string;
  sourceOfOperation?: string;
  succeeded?: boolean;
}
export interface DatastoreFileMovedEvent extends DatastoreFileEvent {
  sourceDatastore: DatastoreEventArgument;
  sourceFile: string;
}
export interface DatastoreIORMReconfiguredEvent extends DatastoreEvent {
  
}
export interface DatastorePrincipalConfigured extends HostEvent {
  datastorePrincipal: string;
}
export interface DatastoreRemovedOnHostEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}
export interface DatastoreRenamedEvent extends DatastoreEvent {
  oldName: string;
  newName: string;
}
export interface DatastoreRenamedOnHostEvent extends HostEvent {
  oldName: string;
  newName: string;
}
export interface DrsDisabledEvent extends ClusterEvent {
  
}
export interface DrsEnabledEvent extends ClusterEvent {
  behavior: string;
}
export interface DrsInvocationFailedEvent extends ClusterEvent {
  
}
export interface DrsRecoveredFromFailureEvent extends ClusterEvent {
  
}
export interface DrsResourceConfigureFailedEvent extends HostEvent {
  reason: MethodFault;
}
export interface DrsResourceConfigureSyncedEvent extends HostEvent {
  
}
export interface DrsRuleComplianceEvent extends VmEvent {
  
}
export interface DrsRuleViolationEvent extends VmEvent {
  
}
export interface DrsSoftRuleViolationEvent extends VmEvent {
  
}
export interface DrsVmMigratedEvent extends VmMigratedEvent {
  
}
export interface DrsVmPoweredOnEvent extends VmPoweredOnEvent {
  
}
export interface DuplicateIpDetectedEvent extends HostEvent {
  duplicateIP: string;
  macAddress: string;
}
export interface DvpgImportEvent extends DVPortgroupEvent {
  importType: string;
}
export interface DvpgRestoreEvent extends DVPortgroupEvent {
  
}
export interface DvsEvent extends Event {
  
}
export interface DvsHealthStatusChangeEvent extends HostEvent {
  switchUuid: string;
  healthResult?: HostMemberHealthCheckResult;
}
export interface DvsHostBackInSyncEvent extends DvsEvent {
  hostBackInSync: HostEventArgument;
}
export interface DvsHostJoinedEvent extends DvsEvent {
  hostJoined: HostEventArgument;
}
export interface DvsHostLeftEvent extends DvsEvent {
  hostLeft: HostEventArgument;
}
export interface DvsHostStatusUpdated extends DvsEvent {
  hostMember: HostEventArgument;
  oldStatus?: string;
  newStatus?: string;
  oldStatusDetail?: string;
  newStatusDetail?: string;
}
export interface DvsHostWentOutOfSyncEvent extends DvsEvent {
  hostOutOfSync: DvsOutOfSyncHostArgument;
}
export interface DvsImportEvent extends DvsEvent {
  importType: string;
}
export interface DvsMergedEvent extends DvsEvent {
  sourceDvs: DvsEventArgument;
  destinationDvs: DvsEventArgument;
}
export interface DvsPortBlockedEvent extends DvsEvent {
  portKey: string;
  statusDetail?: string;
  runtimeInfo?: DVPortStatus;
  prevBlockState?: string;
}
export interface DvsPortConnectedEvent extends DvsEvent {
  portKey: string;
  connectee?: DistributedVirtualSwitchPortConnectee;
}
export interface DvsPortCreatedEvent extends DvsEvent {
  portKey: string[];
}
export interface DvsPortDeletedEvent extends DvsEvent {
  portKey: string[];
}
export interface DvsPortDisconnectedEvent extends DvsEvent {
  portKey: string;
  connectee?: DistributedVirtualSwitchPortConnectee;
}
export interface DvsPortEnteredPassthruEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
}
export interface DvsPortExitedPassthruEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
}
export interface DvsPortJoinPortgroupEvent extends DvsEvent {
  portKey: string;
  portgroupKey: string;
  portgroupName: string;
}
export interface DvsPortLeavePortgroupEvent extends DvsEvent {
  portKey: string;
  portgroupKey: string;
  portgroupName: string;
}
export interface DvsPortLinkDownEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
}
export interface DvsPortLinkUpEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
}
export interface DvsPortReconfiguredEvent extends DvsEvent {
  portKey: string[];
  configChanges?: ChangesInfoEventArgument[];
}
export interface DvsPortRuntimeChangeEvent extends DvsEvent {
  portKey: string;
  runtimeInfo: DVPortStatus;
}
export interface DvsPortUnblockedEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
  prevBlockState?: string;
}
export interface DvsPortVendorSpecificStateChangeEvent extends DvsEvent {
  portKey: string;
}
export interface DvsRenamedEvent extends DvsEvent {
  oldName: string;
  newName: string;
}
export interface DvsRestoreEvent extends DvsEvent {
  
}
export interface DvsUpgradeAvailableEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}
export interface DvsUpgradeInProgressEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}
export interface DvsUpgradeRejectedEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}
export interface DvsUpgradedEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}
export interface EnteredMaintenanceModeEvent extends HostEvent {
  
}
export interface EnteredStandbyModeEvent extends HostEvent {
  
}
export interface EnteringMaintenanceModeEvent extends HostEvent {
  
}
export interface EnteringStandbyModeEvent extends HostEvent {
  
}
export interface EntityEventArgument extends EventArgument {
  name: string;
}
export interface ErrorUpgradeEvent extends UpgradeEvent {
  
}
export interface ExitMaintenanceModeEvent extends HostEvent {
  
}
export interface ExitStandbyModeFailedEvent extends HostEvent {
  
}
export interface ExitedStandbyModeEvent extends HostEvent {
  
}
export interface ExitingStandbyModeEvent extends HostEvent {
  
}
export interface ExtendedEvent extends GeneralEvent {
  eventTypeId: string;
  managedObject: ManagedObject;
  data?: ExtendedEventPair[];
}
export interface ExtendedEventPair extends DynamicData {
  key: string;
  value: string;
}
export interface FailoverLevelRestored extends ClusterEvent {
  
}
export interface FolderEventArgument extends EntityEventArgument {
  folder: Folder;
}
export interface GhostDvsProxySwitchDetectedEvent extends HostEvent {
  switchUuid: string[];
}
export interface GhostDvsProxySwitchRemovedEvent extends HostEvent {
  switchUuid: string[];
}
export interface GlobalMessageChangedEvent extends SessionEvent {
  message: string;
  prevMessage?: string;
}
export interface HostAddFailedEvent extends HostEvent {
  hostname: string;
}
export interface HostAddedEvent extends HostEvent {
  
}
export interface HostAdminDisableEvent extends HostEvent {
  
}
export interface HostAdminEnableEvent extends HostEvent {
  
}
export interface HostCnxFailedAccountFailedEvent extends HostEvent {
  
}
export interface HostCnxFailedAlreadyManagedEvent extends HostEvent {
  serverName: string;
}
export interface HostCnxFailedBadCcagentEvent extends HostEvent {
  
}
export interface HostCnxFailedBadUsernameEvent extends HostEvent {
  
}
export interface HostCnxFailedBadVersionEvent extends HostEvent {
  
}
export interface HostCnxFailedCcagentUpgradeEvent extends HostEvent {
  
}
export interface HostCnxFailedEvent extends HostEvent {
  
}
export interface HostCnxFailedNetworkErrorEvent extends HostEvent {
  
}
export interface HostCnxFailedNoAccessEvent extends HostEvent {
  
}
export interface HostCnxFailedNoConnectionEvent extends HostEvent {
  
}
export interface HostCnxFailedNoLicenseEvent extends HostEvent {
  
}
export interface HostCnxFailedNotFoundEvent extends HostEvent {
  
}
export interface HostCnxFailedTimeoutEvent extends HostEvent {
  
}
export interface HostComplianceCheckedEvent extends HostEvent {
  profile: ProfileEventArgument;
}
export interface HostCompliantEvent extends HostEvent {
  
}
export interface HostConfigAppliedEvent extends HostEvent {
  
}
export interface HostConnectedEvent extends HostEvent {
  
}
export interface HostConnectionLostEvent extends HostEvent {
  
}
export interface HostDasDisabledEvent extends HostEvent {
  
}
export interface HostDasDisablingEvent extends HostEvent {
  
}
export interface HostDasEnabledEvent extends HostEvent {
  
}
export interface HostDasEnablingEvent extends HostEvent {
  
}
export interface HostDasErrorEvent extends HostEvent {
  message?: string;
  reason?: string;
}
export interface HostDasEvent extends HostEvent {
  
}
export interface HostDasOkEvent extends HostEvent {
  
}
export interface HostDisconnectedEvent extends HostEvent {
  reason?: string;
}
export interface HostEnableAdminFailedEvent extends HostEvent {
  permissions: Permission[];
}
export interface HostEventArgument extends EntityEventArgument {
  host: HostSystem;
}
export interface HostExtraNetworksEvent extends HostDasEvent {
  ips?: string;
}
export interface HostInventoryFullEvent extends LicenseEvent {
  capacity: number;
}
export interface HostIsolationIpPingFailedEvent extends HostDasEvent {
  isolationIp: string;
}
export interface HostLicenseExpiredEvent extends LicenseEvent {
  
}
export interface HostLocalPortCreatedEvent extends DvsEvent {
  hostLocalPort: DVSHostLocalPortInfo;
}
export interface HostMissingNetworksEvent extends HostDasEvent {
  ips?: string;
}
export interface HostMonitoringStateChangedEvent extends ClusterEvent {
  state: string;
  prevState?: string;
}
export interface HostNoAvailableNetworksEvent extends HostDasEvent {
  ips?: string;
}
export interface HostNoHAEnabledPortGroupsEvent extends HostDasEvent {
  
}
export interface HostNoRedundantManagementNetworkEvent extends HostDasEvent {
  
}
export interface HostNotInClusterEvent extends HostDasEvent {
  
}
export interface HostOvercommittedEvent extends ClusterOvercommittedEvent {
  
}
export interface HostPrimaryAgentNotShortNameEvent extends HostDasEvent {
  primaryAgent: string;
}
export interface HostShortNameInconsistentEvent extends HostDasEvent {
  shortName: string;
  shortName2: string;
}
export interface HostStatusChangedEvent extends ClusterStatusChangedEvent {
  
}
export interface IncorrectHostInformationEvent extends LicenseEvent {
  
}
export interface InfoUpgradeEvent extends UpgradeEvent {
  
}
export interface InsufficientFailoverResourcesEvent extends ClusterEvent {
  
}
export interface InvalidEditionEvent extends LicenseEvent {
  feature: string;
}
export interface ManagedEntityEventArgument extends EntityEventArgument {
  entity: ManagedEntity;
}
export interface MigrationEvent extends VmEvent {
  fault: MethodFault;
}
export interface MigrationHostErrorEvent extends MigrationEvent {
  dstHost: HostEventArgument;
}
export interface MigrationHostWarningEvent extends MigrationEvent {
  dstHost: HostEventArgument;
}
export interface MigrationResourceErrorEvent extends MigrationEvent {
  dstPool: ResourcePoolEventArgument;
  dstHost: HostEventArgument;
}
export interface MigrationResourceWarningEvent extends MigrationEvent {
  dstPool: ResourcePoolEventArgument;
  dstHost: HostEventArgument;
}
export interface MigrationWarningEvent extends MigrationEvent {
  
}
export interface MtuMatchEvent extends DvsHealthStatusChangeEvent {
  
}
export interface MtuMismatchEvent extends DvsHealthStatusChangeEvent {
  
}
export interface NetworkEventArgument extends EntityEventArgument {
  network: Network;
}
export interface NoAccessUserEvent extends SessionEvent {
  ipAddress: string;
}
export interface NoMaintenanceModeDrsRecommendationForVM extends VmEvent {
  
}
export interface NonVIWorkloadDetectedOnDatastoreEvent extends DatastoreEvent {
  
}
export interface NotEnoughResourcesToStartVmEvent extends VmEvent {
  reason: string;
}
export interface OutOfSyncDvsHost extends DvsEvent {
  hostOutOfSync: DvsOutOfSyncHostArgument[];
}
export interface PermissionEvent extends AuthorizationEvent {
  entity: ManagedEntityEventArgument;
  principal: string;
  group: boolean;
}
export interface PermissionRemovedEvent extends PermissionEvent {
  
}
export interface PermissionUpdatedEvent extends PermissionEvent {
  role: RoleEventArgument;
  propagate: boolean;
  prevRole?: RoleEventArgument;
  prevPropagate?: boolean;
}
export interface ProfileAssociatedEvent extends ProfileEvent {
  
}
export interface ProfileChangedEvent extends ProfileEvent {
  
}
export interface ProfileCreatedEvent extends ProfileEvent {
  
}
export interface ProfileDissociatedEvent extends ProfileEvent {
  
}
export interface RecoveryEvent extends DvsEvent {
  hostName: string;
  portKey: string;
  dvsUuid?: string;
  vnic?: string;
}
export interface ResourcePoolCreatedEvent extends ResourcePoolEvent {
  parent: ResourcePoolEventArgument;
}
export interface ResourcePoolDestroyedEvent extends ResourcePoolEvent {
  
}
export interface ResourcePoolEventArgument extends EntityEventArgument {
  resourcePool: ResourcePool;
}
export interface RoleEvent extends AuthorizationEvent {
  role: RoleEventArgument;
}
export interface RoleRemovedEvent extends RoleEvent {
  
}
export interface RoleUpdatedEvent extends RoleEvent {
  privilegeList?: string[];
  prevRoleName?: string;
  privilegesAdded?: string[];
  privilegesRemoved?: string[];
}
export interface RollbackEvent extends DvsEvent {
  hostName: string;
  methodName?: string;
}
export interface ScheduledTaskCompletedEvent extends ScheduledTaskEvent {
  
}
export interface ScheduledTaskCreatedEvent extends ScheduledTaskEvent {
  
}
export interface ScheduledTaskEmailCompletedEvent extends ScheduledTaskEvent {
  to: string;
}
export interface ScheduledTaskEmailFailedEvent extends ScheduledTaskEvent {
  to: string;
  reason: MethodFault;
}
export interface ScheduledTaskEventArgument extends EntityEventArgument {
  scheduledTask: ScheduledTask;
}
export interface ServerStartedSessionEvent extends SessionEvent {
  
}
export interface TeamingMatchEvent extends DvsHealthStatusChangeEvent {
  
}
export interface TeamingMisMatchEvent extends DvsHealthStatusChangeEvent {
  
}
export interface TemplateBeingUpgradedEvent extends TemplateUpgradeEvent {
  
}
export interface UplinkPortMtuNotSupportEvent extends DvsHealthStatusChangeEvent {
  
}
export interface UplinkPortMtuSupportEvent extends DvsHealthStatusChangeEvent {
  
}
export interface UplinkPortVlanTrunkedEvent extends DvsHealthStatusChangeEvent {
  
}
export interface UplinkPortVlanUntrunkedEvent extends DvsHealthStatusChangeEvent {
  
}
export interface VmAcquiredMksTicketEvent extends VmEvent {
  
}
export interface VmAcquiredTicketEvent extends VmEvent {
  ticketType: string;
}
export interface VmAutoRenameEvent extends VmEvent {
  oldName: string;
  newName: string;
}
export interface VmBeingCreatedEvent extends VmEvent {
  configSpec?: VirtualMachineConfigSpec;
}
export interface VmBeingDeployedEvent extends VmEvent {
  srcTemplate: VmEventArgument;
}
export interface VmBeingHotMigratedEvent extends VmEvent {
  destHost: HostEventArgument;
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
}
export interface VmBeingMigratedEvent extends VmEvent {
  destHost: HostEventArgument;
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
}
export interface VmBeingRelocatedEvent extends VmRelocateSpecEvent {
  destHost: HostEventArgument;
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
}
export interface VmCloneEvent extends VmEvent {
  
}
export interface VmCloneFailedEvent extends VmCloneEvent {
  destFolder: FolderEventArgument;
  destName: string;
  destHost: HostEventArgument;
  reason: MethodFault;
}
export interface VmClonedEvent extends VmCloneEvent {
  sourceVm: VmEventArgument;
}
export interface VmConfigMissingEvent extends VmEvent {
  
}
export interface VmConnectedEvent extends VmEvent {
  
}
export interface VmCreatedEvent extends VmEvent {
  
}
export interface VmDasBeingResetEvent extends VmEvent {
  reason?: string;
}
export interface VmDasBeingResetWithScreenshotEvent extends VmDasBeingResetEvent {
  screenshotFilePath: string;
}
export interface VmDasResetFailedEvent extends VmEvent {
  
}
export interface VmDasUpdateErrorEvent extends VmEvent {
  
}
export interface VmDasUpdateOkEvent extends VmEvent {
  
}
export interface VmDateRolledBackEvent extends VmEvent {
  
}
export interface VmDeployFailedEvent extends VmEvent {
  destDatastore: EntityEventArgument;
  reason: MethodFault;
}
export interface VmDeployedEvent extends VmEvent {
  srcTemplate: VmEventArgument;
}
export interface VmDisconnectedEvent extends VmEvent {
  
}
export interface VmDiscoveredEvent extends VmEvent {
  
}
export interface VmDiskFailedEvent extends VmEvent {
  disk: string;
  reason: MethodFault;
}
export interface VmEmigratingEvent extends VmEvent {
  
}
export interface VmEndRecordingEvent extends VmEvent {
  
}
export interface VmEndReplayingEvent extends VmEvent {
  
}
export interface VmEventArgument extends EntityEventArgument {
  vm: VirtualMachine;
}
export interface VmFaultToleranceStateChangedEvent extends VmEvent {
  oldState: VirtualMachineFaultToleranceState;
  newState: VirtualMachineFaultToleranceState;
}
export interface VmHealthMonitoringStateChangedEvent extends ClusterEvent {
  state: string;
  prevState?: string;
}
export interface VmPowerOffOnIsolationEvent extends VmPoweredOffEvent {
  isolatedHost: HostEventArgument;
}
export interface VmRelocateFailedEvent extends VmRelocateSpecEvent {
  destHost: HostEventArgument;
  reason: MethodFault;
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
}
export interface VmVnicPoolReservationViolationClearEvent extends DvsEvent {
  vmVnicResourcePoolKey: string;
  vmVnicResourcePoolName?: string;
}
export interface VmVnicPoolReservationViolationRaiseEvent extends DvsEvent {
  vmVnicResourcePoolKey: string;
  vmVnicResourcePoolName?: string;
}
export interface ActiveDirectoryFault extends VimFault {
  errorCode?: number;
}
export interface AlreadyExists extends VimFault {
  name?: string;
}
export interface AlreadyUpgraded extends VimFault {
  
}
export interface AnswerFileUpdateFailed extends VimFault {
  failure: AnswerFileUpdateFailure[];
}
export interface AnswerFileUpdateFailure extends DynamicData {
  userInputPath: ProfilePropertyPath;
  errMsg: LocalizableMessage;
}
export interface AuthMinimumAdminPermission extends VimFault {
  
}
export interface CannotAccessLocalSource extends VimFault {
  
}
export interface CannotAccessVmComponent extends VmConfigFault {
  
}
export interface CannotAccessVmConfig extends CannotAccessVmComponent {
  reason: MethodFault;
}
export interface CannotAccessVmDevice extends CannotAccessVmComponent {
  device: string;
  backing: string;
  connected: boolean;
}
export interface CannotAccessVmDisk extends CannotAccessVmDevice {
  fault: MethodFault;
}
export interface CannotChangeDrsBehaviorForFtSecondary extends VmFaultToleranceIssue {
  vm: VirtualMachine;
  vmName: string;
}
export interface CannotChangeHaSettingsForFtSecondary extends VmFaultToleranceIssue {
  vm: VirtualMachine;
  vmName: string;
}
export interface CannotChangeVsanClusterUuid extends VsanFault {
  
}
export interface CannotChangeVsanNodeUuid extends VsanFault {
  
}
export interface CannotComputeFTCompatibleHosts extends VmFaultToleranceIssue {
  vm: VirtualMachine;
  vmName: string;
}
export interface CannotDisableSnapshot extends VmConfigFault {
  
}
export interface CannotDisconnectHostWithFaultToleranceVm extends VimFault {
  hostName: string;
}
export interface CannotEnableVmcpForCluster extends VimFault {
  host?: HostSystem;
  hostName?: string;
  reason?: string;
}
export interface CannotMoveFaultToleranceVm extends VimFault {
  moveType: string;
  vmName: string;
}
export interface CannotMoveHostWithFaultToleranceVm extends VimFault {
  
}
export interface CannotMoveVsanEnabledHost extends VsanFault {
  
}
export interface CannotPlaceWithoutPrerequisiteMoves extends VimFault {
  
}
export interface CannotReconfigureVsanWhenHaEnabled extends VsanFault {
  
}
export interface CannotUseNetwork extends VmConfigFault {
  device: string;
  backing: string;
  connected: boolean;
  reason: string;
  network?: Network;
}
export interface ConcurrentAccess extends VimFault {
  
}
export interface CpuHotPlugNotSupported extends VmConfigFault {
  
}
export interface CustomizationFault extends VimFault {
  
}
export interface CustomizationPending extends CustomizationFault {
  
}
export interface DasConfigFault extends VimFault {
  reason?: string;
  output?: string;
  event?: Event[];
}
export interface DeltaDiskFormatNotSupported extends VmConfigFault {
  datastore?: Datastore[];
  deltaDiskFormat: string;
}
export interface DestinationVsanDisabled extends CannotMoveVsanEnabledHost {
  destinationCluster: string;
}
export interface DomainNotFound extends ActiveDirectoryFault {
  domainName: string;
}
export interface DrsDisabledOnVm extends VimFault {
  
}
export interface DuplicateName extends VimFault {
  name: string;
  object: ManagedObject;
}
export interface DuplicateVsanNetworkInterface extends VsanFault {
  device: string;
}
export interface DvsFault extends VimFault {
  
}
export interface DvsNotAuthorized extends DvsFault {
  sessionExtensionKey?: string;
  dvsExtensionKey?: string;
}
export interface DvsOperationBulkFault extends DvsFault {
  hostFault: DvsOperationBulkFaultFaultOnHost[];
}
export interface DvsOperationBulkFaultFaultOnHost extends DynamicData {
  host: HostSystem;
  fault: MethodFault;
}
export interface DvsScopeViolated extends DvsFault {
  scope: ManagedEntity[];
  entity: ManagedEntity;
}
export interface EVCConfigFault extends VimFault {
  faults?: MethodFault[];
}
export interface EVCModeIllegalByVendor extends EVCConfigFault {
  clusterCPUVendor: string;
  modeCPUVendor: string;
}
export interface EVCModeUnsupportedByHosts extends EVCConfigFault {
  evcMode?: string;
  host?: HostSystem[];
  hostName?: string[];
}
export interface EVCUnsupportedByHostHardware extends EVCConfigFault {
  host: HostSystem[];
  hostName: string[];
}
export interface EVCUnsupportedByHostSoftware extends EVCConfigFault {
  host: HostSystem[];
  hostName: string[];
}
export interface EightHostLimitViolated extends VmConfigFault {
  
}
export interface ExpiredAddonLicense extends ExpiredFeatureLicense {
  
}
export interface ExpiredEditionLicense extends ExpiredFeatureLicense {
  
}
export interface ExtendedFault extends VimFault {
  faultTypeId: string;
  data?: KeyValue[];
}
export interface FaultToleranceCannotEditMem extends VmConfigFault {
  vmName: string;
  vm: VirtualMachine;
}
export interface FaultToleranceNotLicensed extends VmFaultToleranceIssue {
  hostName?: string;
}
export interface FaultTolerancePrimaryPowerOnNotAttempted extends VmFaultToleranceIssue {
  secondaryVm: VirtualMachine;
  primaryVm: VirtualMachine;
}
export interface FaultToleranceVmNotDasProtected extends VimFault {
  vm: VirtualMachine;
  vmName: string;
}
export interface FcoeFault extends VimFault {
  
}
export interface FcoeFaultPnicHasNoPortSet extends FcoeFault {
  nicDevice: string;
}
export interface FileFault extends VimFault {
  file: string;
}
export interface FileLocked extends FileFault {
  
}
export interface FileNameTooLong extends FileFault {
  
}
export interface FileNotFound extends FileFault {
  
}
export interface FileNotWritable extends FileFault {
  
}
export interface FileTooLarge extends FileFault {
  datastore: string;
  fileSize: number;
  maxFileSize?: number;
}
export interface FtIssuesOnHost extends VmFaultToleranceIssue {
  host: HostSystem;
  hostName: string;
  errors?: MethodFault[];
}
export interface GenericDrsFault extends VimFault {
  hostFaults?: MethodFault[];
}
export interface GenericVmConfigFault extends VmConfigFault {
  reason: string;
}
export interface GuestOperationsFault extends VimFault {
  
}
export interface GuestOperationsUnavailable extends GuestOperationsFault {
  
}
export interface GuestPermissionDenied extends GuestOperationsFault {
  
}
export interface GuestProcessNotFound extends GuestOperationsFault {
  pid: number;
}
export interface GuestRegistryFault extends GuestOperationsFault {
  windowsSystemErrorCode: number;
}
export interface GuestRegistryKeyFault extends GuestRegistryFault {
  keyName: string;
}
export interface GuestRegistryKeyHasSubkeys extends GuestRegistryKeyFault {
  
}
export interface GuestRegistryKeyInvalid extends GuestRegistryKeyFault {
  
}
export interface GuestRegistryKeyParentVolatile extends GuestRegistryKeyFault {
  
}
export interface GuestRegistryValueFault extends GuestRegistryFault {
  keyName: string;
  valueName: string;
}
export interface GuestRegistryValueNotFound extends GuestRegistryValueFault {
  
}
export interface HeterogenousHostsBlockingEVC extends EVCConfigFault {
  
}
export interface HostConfigFault extends VimFault {
  
}
export interface HostConnectFault extends VimFault {
  
}
export interface HostHasComponentFailure extends VimFault {
  hostName: string;
  componentType: string;
  componentName: string;
}
export interface HostInDomain extends HostConfigFault {
  
}
export interface HostIncompatibleForFaultTolerance extends VmFaultToleranceIssue {
  hostName?: string;
  reason?: string;
}
export interface HostIncompatibleForRecordReplay extends VimFault {
  hostName?: string;
  reason?: string;
}
export interface HostPowerOpFailed extends VimFault {
  
}
export interface HostSpecificationOperationFailed extends VimFault {
  host: HostSystem;
}
export interface HttpFault extends VimFault {
  statusCode: number;
  statusMessage: string;
}
export interface IORMNotSupportedHostOnDatastore extends VimFault {
  datastore: Datastore;
  datastoreName: string;
  host?: HostSystem[];
}
export interface ImportHostAddFailure extends DvsFault {
  hostIp: string[];
}
export interface ImportOperationBulkFault extends DvsFault {
  importFaults: ImportOperationBulkFaultFaultOnImport[];
}
export interface ImportOperationBulkFaultFaultOnImport extends DynamicData {
  entityType?: string;
  key?: string;
  fault: MethodFault;
}
export interface InaccessibleVFlashSource extends VimFault {
  hostName: string;
}
export interface IncompatibleHostForFtSecondary extends VmFaultToleranceIssue {
  host: HostSystem;
  error?: MethodFault[];
}
export interface IncorrectFileType extends FileFault {
  
}
export interface InsufficientResourcesFault extends VimFault {
  
}
export interface InsufficientStandbyResource extends InsufficientResourcesFault {
  
}
export interface InsufficientStorageIops extends VimFault {
  unreservedIops: number;
  requestedIops: number;
  datastoreName: string;
}
export interface InsufficientStorageSpace extends InsufficientResourcesFault {
  
}
export interface InsufficientVFlashResourcesFault extends InsufficientResourcesFault {
  freeSpaceInMB?: number;
  freeSpace: number;
  requestedSpaceInMB?: number;
  requestedSpace: number;
}
export interface InvalidAffinitySettingFault extends VimFault {
  
}
export interface InvalidBmcRole extends VimFault {
  
}
export interface InvalidCAMServer extends ActiveDirectoryFault {
  camServer: string;
}
export interface InvalidDatastore extends VimFault {
  datastore?: Datastore;
  name?: string;
}
export interface InvalidDatastorePath extends InvalidDatastore {
  datastorePath: string;
}
export interface InvalidEvent extends VimFault {
  
}
export interface InvalidFolder extends VimFault {
  target: ManagedEntity;
}
export interface InvalidFormat extends VmConfigFault {
  
}
export interface InvalidGuestLogin extends GuestOperationsFault {
  
}
export interface InvalidHostName extends HostConfigFault {
  
}
export interface InvalidIpfixConfig extends DvsFault {
  property?: string;
}
export interface InvalidIpmiLoginInfo extends VimFault {
  
}
export interface InvalidIpmiMacAddress extends VimFault {
  userProvidedMacAddress: string;
  observedMacAddress: string;
}
export interface InvalidLicense extends VimFault {
  licenseContent: string;
}
export interface InvalidLocale extends VimFault {
  
}
export interface InvalidLogin extends VimFault {
  
}
export interface InvalidName extends VimFault {
  name: string;
  entity?: ManagedEntity;
}
export interface InvalidOperationOnSecondaryVm extends VmFaultToleranceIssue {
  instanceUuid: string;
}
export interface InvalidPrivilege extends VimFault {
  privilege: string;
}
export interface InvalidResourcePoolStructureFault extends InsufficientResourcesFault {
  
}
export interface InvalidSnapshotFormat extends InvalidFormat {
  
}
export interface InvalidState extends VimFault {
  
}
export interface InvalidVmConfig extends VmConfigFault {
  property?: string;
}
export interface InvalidVmState extends InvalidState {
  vm: VirtualMachine;
}
export interface IpHostnameGeneratorError extends CustomizationFault {
  
}
export interface IscsiFault extends VimFault {
  
}
export interface IscsiFaultInvalidVnic extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultPnicInUse extends IscsiFault {
  pnicDevice: string;
}
export interface IscsiFaultVnicAlreadyBound extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicHasActivePaths extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicHasMultipleUplinks extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicHasNoUplinks extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicHasWrongUplink extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicInUse extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicIsLastPath extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicNotBound extends IscsiFault {
  vnicDevice: string;
}
export interface IscsiFaultVnicNotFound extends IscsiFault {
  vnicDevice: string;
}
export interface KeyNotFound extends VimFault {
  key: string;
}
export interface LargeRDMNotSupportedOnDatastore extends VmConfigFault {
  device: string;
  datastore: Datastore;
  datastoreName: string;
}
export interface LicenseEntityNotFound extends VimFault {
  entityId: string;
}
export interface LicenseServerUnavailable extends VimFault {
  licenseServer: string;
}
export interface LimitExceeded extends VimFault {
  property?: string;
  limit?: number;
}
export interface LinuxVolumeNotClean extends CustomizationFault {
  
}
export interface LogBundlingFailed extends VimFault {
  
}
export interface MemoryHotPlugNotSupported extends VmConfigFault {
  
}
export interface MigrationFault extends VimFault {
  
}
export interface MigrationFeatureNotSupported extends MigrationFault {
  atSourceHost: boolean;
  failedHostName: string;
  failedHost: HostSystem;
}
export interface MigrationNotReady extends MigrationFault {
  reason: string;
}
export interface MismatchedBundle extends VimFault {
  bundleUuid: string;
  hostUuid: string;
  bundleBuildNumber: number;
  hostBuildNumber: number;
}
export interface MismatchedNetworkPolicies extends MigrationFault {
  device: string;
  backing: string;
  connected: boolean;
}
export interface MismatchedVMotionNetworkNames extends MigrationFault {
  sourceNetwork: string;
  destNetwork: string;
}
export interface MissingBmcSupport extends VimFault {
  
}
export interface MissingLinuxCustResources extends CustomizationFault {
  
}
export interface MissingWindowsCustResources extends CustomizationFault {
  
}
export interface MksConnectionLimitReached extends InvalidState {
  connectionLimit: number;
}
export interface MountError extends CustomizationFault {
  vm: VirtualMachine;
  diskIndex: number;
}
export interface MultipleCertificatesVerifyFault extends HostConnectFault {
  thumbprintData: MultipleCertificatesVerifyFaultThumbprintData[];
}
export interface MultipleCertificatesVerifyFaultThumbprintData extends DynamicData {
  port: number;
  thumbprint: string;
}
export interface NamespaceFull extends VimFault {
  name: string;
  currentMaxSize: number;
  requiredSize?: number;
}
export interface NamespaceLimitReached extends VimFault {
  limit?: number;
}
export interface NamespaceWriteProtected extends VimFault {
  name: string;
}
export interface NasConfigFault extends HostConfigFault {
  name: string;
}
export interface NasConnectionLimitReached extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
}
export interface NasSessionCredentialConflict extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
  userName: string;
}
export interface NasVolumeNotMounted extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
}
export interface NetworkCopyFault extends FileFault {
  
}
export interface NetworkDisruptedAndConfigRolledBack extends VimFault {
  host: string;
}
export interface NetworkInaccessible extends NasConfigFault {
  
}
export interface NetworksMayNotBeTheSame extends MigrationFault {
  name?: string;
}
export interface NicSettingMismatch extends CustomizationFault {
  numberOfNicsInSpec: number;
  numberOfNicsInVM: number;
}
export interface NoActiveHostInCluster extends InvalidState {
  computeResource: ComputeResource;
}
export interface NoClientCertificate extends VimFault {
  
}
export interface NoCompatibleDatastore extends VimFault {
  
}
export interface NoCompatibleHardAffinityHost extends VmConfigFault {
  vmName: string;
}
export interface NoCompatibleHost extends VimFault {
  host?: HostSystem[];
  error?: MethodFault[];
}
export interface NoCompatibleHostWithAccessToDevice extends NoCompatibleHost {
  
}
export interface NoCompatibleSoftAffinityHost extends VmConfigFault {
  vmName: string;
}
export interface NoConnectedDatastore extends VimFault {
  
}
export interface NoDiskFound extends VimFault {
  
}
export interface NoDiskSpace extends FileFault {
  datastore: string;
}
export interface NoDisksToCustomize extends CustomizationFault {
  
}
export interface NoGateway extends HostConfigFault {
  
}
export interface NoGuestHeartbeat extends MigrationFault {
  
}
export interface NoHost extends HostConnectFault {
  name?: string;
}
export interface NoHostSuitableForFtSecondary extends VmFaultToleranceIssue {
  vm: VirtualMachine;
  vmName: string;
}
export interface NoPeerHostFound extends HostPowerOpFailed {
  
}
export interface NoPermissionOnAD extends ActiveDirectoryFault {
  
}
export interface NoPermissionOnHost extends HostConnectFault {
  
}
export interface NoPermissionOnNasVolume extends NasConfigFault {
  userName?: string;
}
export interface NoSubjectName extends VimFault {
  
}
export interface NoVirtualNic extends HostConfigFault {
  
}
export interface NonADUserRequired extends ActiveDirectoryFault {
  
}
export interface NonHomeRDMVMotionNotSupported extends MigrationFeatureNotSupported {
  device: string;
}
export interface NotADirectory extends FileFault {
  
}
export interface NotAFile extends FileFault {
  
}
export interface NotFound extends VimFault {
  
}
export interface NotSupportedDeviceForFT extends VmFaultToleranceIssue {
  host: HostSystem;
  hostName?: string;
  vm: VirtualMachine;
  vmName?: string;
  deviceType: string;
  deviceLabel?: string;
}
export interface NotSupportedHost extends HostConnectFault {
  productName?: string;
  productVersion?: string;
}
export interface NotSupportedHostForChecksum extends VimFault {
  
}
export interface NotSupportedHostForVFlash extends NotSupportedHost {
  hostName: string;
}
export interface NotSupportedHostForVmcp extends NotSupportedHost {
  hostName: string;
}
export interface NotSupportedHostForVmemFile extends NotSupportedHost {
  hostName: string;
}
export interface NotSupportedHostForVsan extends NotSupportedHost {
  hostName: string;
}
export interface NotSupportedHostInCluster extends NotSupportedHost {
  
}
export interface NotSupportedHostInDvs extends NotSupportedHost {
  switchProductSpec: DistributedVirtualSwitchProductSpec;
}
export interface NotSupportedHostInHACluster extends NotSupportedHost {
  hostName: string;
  build: string;
}
export interface NumVirtualCpusExceedsLimit extends InsufficientResourcesFault {
  maxSupportedVcpus: number;
}
export interface NumVirtualCpusIncompatible extends VmConfigFault {
  reason: string;
  numCpu: number;
}
export interface OperationDisabledByGuest extends GuestOperationsFault {
  
}
export interface OperationNotSupportedByGuest extends GuestOperationsFault {
  
}
export interface OutOfBounds extends VimFault {
  argumentName: string;
}
export interface OvfConsumerPowerOnFault extends InvalidState {
  extensionKey: string;
  extensionName: string;
  description: string;
}
export interface OvfConsumerValidationFault extends VmConfigFault {
  extensionKey: string;
  extensionName: string;
  message: string;
}
export interface OvfFault extends VimFault {
  
}
export interface OvfImport extends OvfFault {
  
}
export interface OvfImportFailed extends OvfImport {
  
}
export interface OvfInvalidPackage extends OvfFault {
  lineNumber: number;
}
export interface OvfMappedOsId extends OvfImport {
  ovfId: number;
  ovfDescription: string;
  targetDescription: string;
}
export interface OvfMissingHardware extends OvfImport {
  name: string;
  resourceType: number;
}
export interface OvfNetworkMappingNotSupported extends OvfImport {
  
}
export interface OvfProperty extends OvfInvalidPackage {
  type: string;
  value: string;
}
export interface OvfPropertyNetwork extends OvfProperty {
  
}
export interface OvfPropertyQualifier extends OvfProperty {
  qualifier: string;
}
export interface OvfPropertyQualifierDuplicate extends OvfProperty {
  qualifier: string;
}
export interface OvfPropertyQualifierIgnored extends OvfProperty {
  qualifier: string;
}
export interface OvfPropertyType extends OvfProperty {
  
}
export interface OvfPropertyValue extends OvfProperty {
  
}
export interface OvfSystemFault extends OvfFault {
  
}
export interface OvfToXmlUnsupportedElement extends OvfSystemFault {
  name?: string;
}
export interface OvfUnknownDevice extends OvfSystemFault {
  device?: VirtualDevice;
  vmName: string;
}
export interface OvfUnknownEntity extends OvfSystemFault {
  lineNumber: number;
}
export interface OvfUnsupportedDeviceBackingInfo extends OvfSystemFault {
  elementName?: string;
  instanceId?: string;
  deviceName: string;
  backingName?: string;
}
export interface OvfUnsupportedDeviceBackingOption extends OvfSystemFault {
  elementName?: string;
  instanceId?: string;
  deviceName: string;
  backingName?: string;
}
export interface OvfUnsupportedDiskProvisioning extends OvfImport {
  diskProvisioning: string;
  supportedDiskProvisioning: string;
}
export interface OvfUnsupportedPackage extends OvfFault {
  lineNumber?: number;
}
export interface OvfUnsupportedSubType extends OvfUnsupportedPackage {
  elementName: string;
  instanceId: string;
  deviceType: number;
  deviceSubType: string;
}
export interface OvfUnsupportedType extends OvfUnsupportedPackage {
  name: string;
  instanceId: string;
  deviceType: number;
}
export interface OvfWrongNamespace extends OvfInvalidPackage {
  namespaceName: string;
}
export interface OvfXmlFormat extends OvfInvalidPackage {
  description: string;
}
export interface PasswordExpired extends InvalidLogin {
  
}
export interface PatchBinariesNotFound extends VimFault {
  patchID: string;
  binary?: string[];
}
export interface PatchMetadataInvalid extends VimFault {
  patchID: string;
  metaData?: string[];
}
export interface PatchMetadataNotFound extends PatchMetadataInvalid {
  
}
export interface PatchNotApplicable extends VimFault {
  patchID: string;
}
export interface PatchSuperseded extends PatchNotApplicable {
  supersede?: string[];
}
export interface PlatformConfigFault extends HostConfigFault {
  text: string;
}
export interface PowerOnFtSecondaryFailed extends VmFaultToleranceIssue {
  vm: VirtualMachine;
  vmName: string;
  hostSelectionBy: FtIssuesOnHostHostSelectionType;
  hostErrors?: MethodFault[];
  rootCause: MethodFault;
}
export interface ProfileUpdateFailed extends VimFault {
  failure: ProfileUpdateFailedUpdateFailure[];
  warnings?: ProfileUpdateFailedUpdateFailure[];
}
export interface ProfileUpdateFailedUpdateFailure extends DynamicData {
  profilePath: ProfilePropertyPath;
  errMsg: LocalizableMessage;
}
export interface QuarantineModeFault extends VmConfigFault {
  vmName: string;
  faultType: string;
}
export interface QuestionPending extends InvalidState {
  text: string;
}
export interface RDMConversionNotSupported extends MigrationFault {
  device: string;
}
export interface RDMNotPreserved extends MigrationFault {
  device: string;
}
export interface RDMNotSupportedOnDatastore extends VmConfigFault {
  device: string;
  datastore: Datastore;
  datastoreName: string;
}
export interface RDMPointsToInaccessibleDisk extends CannotAccessVmDisk {
  
}
export interface ReadHostResourcePoolTreeFailed extends HostConnectFault {
  
}
export interface ReadOnlyDisksWithLegacyDestination extends MigrationFault {
  roDiskCount: number;
  timeoutDanger: boolean;
}
export interface RebootRequired extends VimFault {
  patch?: string;
}
export interface RecordReplayDisabled extends VimFault {
  
}
export interface RemoveFailed extends VimFault {
  
}
export interface ReplicationFault extends VimFault {
  
}
export interface ReplicationIncompatibleWithFT extends ReplicationFault {
  
}
export interface ReplicationInvalidOptions extends ReplicationFault {
  options: string;
  entity?: ManagedEntity;
}
export interface ReplicationNotSupportedOnHost extends ReplicationFault {
  
}
export interface ReplicationVmFault extends ReplicationFault {
  reason: string;
  state?: string;
  instanceId?: string;
  vm: VirtualMachine;
}
export interface ReplicationVmInProgressFault extends ReplicationVmFault {
  requestedActivity: string;
  inProgressActivity: string;
}
export interface ResourceInUse extends VimFault {
  type?: string;
  name?: string;
}
export interface ResourceNotAvailable extends VimFault {
  containerType?: string;
  containerName?: string;
  type?: string;
}
export interface RollbackFailure extends DvsFault {
  entityName: string;
  entityType: string;
}
export interface RuleViolation extends VmConfigFault {
  host?: HostSystem;
  rule: ClusterRuleInfo;
}
export interface SSLDisabledFault extends HostConnectFault {
  
}
export interface SSLVerifyFault extends HostConnectFault {
  selfSigned: boolean;
  thumbprint: string;
}
export interface SSPIChallenge extends VimFault {
  base64Token: string;
}
export interface SecondaryVmAlreadyDisabled extends VmFaultToleranceIssue {
  instanceUuid: string;
}
export interface SecondaryVmAlreadyEnabled extends VmFaultToleranceIssue {
  instanceUuid: string;
}
export interface SecondaryVmAlreadyRegistered extends VmFaultToleranceIssue {
  instanceUuid: string;
}
export interface SecondaryVmNotRegistered extends VmFaultToleranceIssue {
  instanceUuid: string;
}
export interface ShrinkDiskFault extends VimFault {
  diskId?: number;
}
export interface SnapshotCopyNotSupported extends MigrationFault {
  
}
export interface SnapshotFault extends VimFault {
  
}
export interface SnapshotIncompatibleDeviceInVm extends SnapshotFault {
  fault: MethodFault;
}
export interface SnapshotLocked extends SnapshotFault {
  
}
export interface SnapshotMoveFromNonHomeNotSupported extends SnapshotCopyNotSupported {
  
}
export interface SnapshotMoveNotSupported extends SnapshotCopyNotSupported {
  
}
export interface SnapshotMoveToNonHomeNotSupported extends SnapshotCopyNotSupported {
  
}
export interface SnapshotNoChange extends SnapshotFault {
  
}
export interface SnapshotRevertIssue extends MigrationFault {
  snapshotName?: string;
  event?: Event[];
  errors: boolean;
}
export interface SoftRuleVioCorrectionDisallowed extends VmConfigFault {
  vmName: string;
}
export interface SoftRuleVioCorrectionImpact extends VmConfigFault {
  vmName: string;
}
export interface SsdDiskNotAvailable extends VimFault {
  devicePath: string;
}
export interface StorageDrsCannotMoveDiskInMultiWriterMode extends VimFault {
  
}
export interface StorageDrsCannotMoveFTVm extends VimFault {
  
}
export interface StorageDrsCannotMoveIndependentDisk extends VimFault {
  
}
export interface StorageDrsCannotMoveManuallyPlacedSwapFile extends VimFault {
  
}
export interface StorageDrsCannotMoveManuallyPlacedVm extends VimFault {
  
}
export interface StorageDrsCannotMoveSharedDisk extends VimFault {
  
}
export interface StorageDrsCannotMoveTemplate extends VimFault {
  
}
export interface StorageDrsCannotMoveVmInUserFolder extends VimFault {
  
}
export interface StorageDrsCannotMoveVmWithMountedCDROM extends VimFault {
  
}
export interface StorageDrsCannotMoveVmWithNoFilesInLayout extends VimFault {
  
}
export interface StorageDrsDatacentersCannotShareDatastore extends VimFault {
  
}
export interface StorageDrsDisabledOnVm extends VimFault {
  
}
export interface StorageDrsHbrDiskNotMovable extends VimFault {
  nonMovableDiskIds: string;
}
export interface StorageDrsHmsMoveInProgress extends VimFault {
  
}
export interface StorageDrsHmsUnreachable extends VimFault {
  
}
export interface StorageDrsIolbDisabledInternally extends VimFault {
  
}
export interface StorageDrsRelocateDisabled extends VimFault {
  
}
export interface StorageDrsStaleHmsCollection extends VimFault {
  
}
export interface StorageDrsUnableToMoveFiles extends VimFault {
  
}
export interface StorageVMotionNotSupported extends MigrationFeatureNotSupported {
  
}
export interface SuspendedRelocateNotSupported extends MigrationFault {
  
}
export interface SwapDatastoreUnset extends VimFault {
  
}
export interface SwapPlacementOverrideNotSupported extends InvalidVmConfig {
  
}
export interface SwitchIpUnset extends DvsFault {
  
}
export interface SwitchNotInUpgradeMode extends DvsFault {
  
}
export interface TaskInProgress extends VimFault {
  task: Task;
}
export interface Timedout extends VimFault {
  
}
export interface TooManyConcurrentNativeClones extends FileFault {
  
}
export interface TooManyConsecutiveOverrides extends VimFault {
  
}
export interface TooManyDevices extends InvalidVmConfig {
  
}
export interface TooManyDisksOnLegacyHost extends MigrationFault {
  diskCount: number;
  timeoutDanger: boolean;
}
export interface TooManyGuestLogons extends GuestOperationsFault {
  
}
export interface TooManyHosts extends HostConnectFault {
  
}
export interface TooManyNativeCloneLevels extends FileFault {
  
}
export interface TooManyNativeClonesOnFile extends FileFault {
  
}
export interface TooManySnapshotLevels extends SnapshotFault {
  
}
export interface ToolsAlreadyUpgraded extends VmToolsUpgradeFault {
  
}
export interface ToolsAutoUpgradeNotSupported extends VmToolsUpgradeFault {
  
}
export interface ToolsImageCopyFailed extends VmToolsUpgradeFault {
  
}
export interface ToolsImageNotAvailable extends VmToolsUpgradeFault {
  
}
export interface ToolsImageSignatureCheckFailed extends VmToolsUpgradeFault {
  
}
export interface ToolsInstallationInProgress extends MigrationFault {
  
}
export interface ToolsUnavailable extends VimFault {
  
}
export interface ToolsUpgradeCancelled extends VmToolsUpgradeFault {
  
}
export interface UncommittedUndoableDisk extends MigrationFault {
  
}
export interface UncustomizableGuest extends CustomizationFault {
  uncustomizableGuestOS: string;
}
export interface UnexpectedCustomizationFault extends CustomizationFault {
  
}
export interface UnrecognizedHost extends VimFault {
  hostName: string;
}
export interface UnsharedSwapVMotionNotSupported extends MigrationFeatureNotSupported {
  
}
export interface UnsupportedDatastore extends VmConfigFault {
  datastore?: Datastore;
}
export interface UnsupportedGuest extends InvalidVmConfig {
  unsupportedGuestOS: string;
}
export interface UnsupportedVimApiVersion extends VimFault {
  version?: string;
}
export interface UnsupportedVmxLocation extends VmConfigFault {
  
}
export interface UserNotFound extends VimFault {
  principal: string;
  unresolved: boolean;
}
export interface VAppConfigFault extends VimFault {
  
}
export interface VAppNotRunning extends VmConfigFault {
  
}
export interface VAppPropertyFault extends VmConfigFault {
  id: string;
  category: string;
  label: string;
  type: string;
  value: string;
}
export interface VAppTaskInProgress extends TaskInProgress {
  
}
export interface VFlashCacheHotConfigNotSupported extends VmConfigFault {
  
}
export interface VFlashModuleNotSupported extends VmConfigFault {
  vmName: string;
  moduleName: string;
  reason: string;
  hostName: string;
}
export interface VFlashModuleVersionIncompatible extends VimFault {
  moduleName: string;
  vmRequestModuleVersion: string;
  hostMinSupportedVerson: string;
  hostModuleVersion: string;
}
export interface VMotionAcrossNetworkNotSupported extends MigrationFeatureNotSupported {
  
}
export interface VMotionInterfaceIssue extends MigrationFault {
  atSourceHost: boolean;
  failedHost: string;
  failedHostEntity?: HostSystem;
}
export interface VMotionLinkCapacityLow extends VMotionInterfaceIssue {
  network: string;
}
export interface VMotionLinkDown extends VMotionInterfaceIssue {
  network: string;
}
export interface VMotionNotConfigured extends VMotionInterfaceIssue {
  
}
export interface VMotionNotLicensed extends VMotionInterfaceIssue {
  
}
export interface VMotionNotSupported extends VMotionInterfaceIssue {
  
}
export interface VMotionProtocolIncompatible extends MigrationFault {
  
}
export interface VirtualHardwareCompatibilityIssue extends VmConfigFault {
  
}
export interface VirtualHardwareVersionNotSupported extends VirtualHardwareCompatibilityIssue {
  hostName: string;
  host: HostSystem;
}
export interface VmAlreadyExistsInDatacenter extends InvalidFolder {
  host: HostSystem;
  hostname: string;
  vm: VirtualMachine[];
}
export interface VmFaultToleranceConfigIssue extends VmFaultToleranceIssue {
  reason?: string;
  entityName?: string;
  entity?: ManagedEntity;
}
export interface VmFaultToleranceConfigIssueWrapper extends VmFaultToleranceIssue {
  entityName?: string;
  entity?: ManagedEntity;
  error?: MethodFault;
}
export interface VmFaultToleranceInvalidFileBacking extends VmFaultToleranceIssue {
  backingType?: string;
  backingFilename?: string;
}
export interface VmFaultToleranceTooManyFtVcpusOnHost extends InsufficientResourcesFault {
  hostName?: string;
  maxNumFtVcpus: number;
}
export interface VmFaultToleranceTooManyVMsOnHost extends InsufficientResourcesFault {
  hostName?: string;
  maxNumFtVms: number;
}
export interface VmPowerOnDisabled extends InvalidState {
  
}
export interface VmSmpFaultToleranceTooManyVMsOnHost extends InsufficientResourcesFault {
  hostName?: string;
  maxNumSmpFtVms: number;
}
export interface VmWwnConflict extends InvalidVmConfig {
  vm?: VirtualMachine;
  host?: HostSystem;
  name?: string;
  wwn?: number;
}
export interface VmfsMountFault extends HostConfigFault {
  uuid: string;
}
export interface VmotionInterfaceNotEnabled extends HostPowerOpFailed {
  
}
export interface VolumeEditorError extends CustomizationFault {
  
}
export interface VsanClusterUuidMismatch extends CannotMoveVsanEnabledHost {
  hostClusterUuid: string;
  destinationClusterUuid: string;
}
export interface VsanDiskFault extends VsanFault {
  device?: string;
}
export interface VsanIncompatibleDiskMapping extends VsanDiskFault {
  
}
export interface VspanDestPortConflict extends DvsFault {
  vspanSessionKey1: string;
  vspanSessionKey2: string;
  portKey: string;
}
export interface VspanPortConflict extends DvsFault {
  vspanSessionKey1: string;
  vspanSessionKey2: string;
  portKey: string;
}
export interface VspanPortMoveFault extends DvsFault {
  srcPortgroupName: string;
  destPortgroupName: string;
  portKey: string;
}
export interface VspanPortPromiscChangeFault extends DvsFault {
  portKey: string;
}
export interface VspanPortgroupPromiscChangeFault extends DvsFault {
  portgroupName: string;
}
export interface VspanPortgroupTypeChangeFault extends DvsFault {
  portgroupName: string;
}
export interface VspanPromiscuousPortNotSupported extends DvsFault {
  vspanSessionKey: string;
  portKey: string;
}
export interface VspanSameSessionPortConflict extends DvsFault {
  vspanSessionKey: string;
  portKey: string;
}
export interface WakeOnLanNotSupported extends VirtualHardwareCompatibilityIssue {
  
}
export interface WakeOnLanNotSupportedByVmotionNIC extends HostPowerOpFailed {
  
}
export interface WillLoseHAProtection extends MigrationFault {
  resolution: string;
}
export interface WillModifyConfigCpuRequirements extends MigrationFault {
  
}
export interface WillResetSnapshotDirectory extends MigrationFault {
  
}
export interface HostActiveDirectoryInfo extends HostDirectoryStoreInfo {
  joinedDomain?: string;
  trustedDomain?: string[];
  domainMembershipStatus?: string;
  smartCardAuthenticationEnabled?: boolean;
}
export interface HostBlockAdapterTargetTransport extends HostTargetTransport {
  
}
export interface HostBlockHba extends HostHostBusAdapter {
  
}
export interface HostBootDeviceInfo extends DynamicData {
  bootDevices?: HostBootDevice[];
  currentBootDeviceKey?: string;
}
export interface HostConfigSpec extends DynamicData {
  nasDatastore?: HostNasVolumeConfig[];
  network?: HostNetworkConfig;
  nicTypeSelection?: HostVirtualNicManagerNicTypeSelection[];
  service?: HostServiceConfig[];
  firewall?: HostFirewallConfig;
  option?: OptionValue[];
  datastorePrincipal?: string;
  datastorePrincipalPasswd?: string;
  datetime?: HostDateTimeConfig;
  storageDevice?: HostStorageDeviceInfo;
  license?: HostLicenseSpec;
  security?: HostSecuritySpec;
  userAccount?: HostAccountSpec[];
  usergroupAccount?: HostAccountSpec[];
  memory?: HostMemorySpec;
  activeDirectory?: HostActiveDirectory[];
  genericConfig?: KeyAnyValue[];
  graphicsConfig?: HostGraphicsConfig;
  assignableHardwareConfig?: HostAssignableHardwareConfig;
}
export interface HostConnectSpec extends DynamicData {
  hostName?: string;
  port?: number;
  sslThumbprint?: string;
  userName?: string;
  password?: string;
  vmFolder?: Folder;
  force: boolean;
  vimAccountName?: string;
  vimAccountPassword?: string;
  managementIp?: string;
  lockdownMode?: HostLockdownMode;
  hostGateway?: HostGatewaySpec;
}
export interface HostDatastoreSystemCapabilities extends DynamicData {
  nfsMountCreationRequired: boolean;
  nfsMountCreationSupported: boolean;
  localDatastoreSupported: boolean;
  vmfsExtentExpansionSupported: boolean;
}
export interface HostDatastoreSystemDatastoreResult extends DynamicData {
  key: Datastore;
  fault?: MethodFault;
}
export interface HostDatastoreSystemVvolDatastoreSpec extends DynamicData {
  name: string;
  scId: string;
}
export interface HostDateTimeInfo extends DynamicData {
  timeZone: HostDateTimeSystemTimeZone;
  systemClockProtocol?: string;
  ntpConfig?: HostNtpConfig;
}
export interface HostFibreChannelHba extends HostHostBusAdapter {
  portWorldWideName: number;
  nodeWorldWideName: number;
  portType: FibreChannelPortType;
  speed: number;
}
export interface HostFibreChannelOverEthernetHba extends HostFibreChannelHba {
  underlyingNic: string;
  linkInfo: HostFibreChannelOverEthernetHbaLinkInfo;
  isSoftwareFcoe: boolean;
  markedForRemoval: boolean;
}
export interface HostFibreChannelOverEthernetHbaLinkInfo extends DynamicData {
  vnportMac: string;
  fcfMac: string;
  vlanId: number;
}
export interface HostFibreChannelTargetTransport extends HostTargetTransport {
  portWorldWideName: number;
  nodeWorldWideName: number;
}
export interface HostFirewallConfig extends DynamicData {
  rule?: HostFirewallConfigRuleSetConfig[];
  defaultBlockingPolicy: HostFirewallDefaultPolicy;
}
export interface HostFirewallConfigRuleSetConfig extends DynamicData {
  rulesetId: string;
  enabled: boolean;
  allowedHosts?: HostFirewallRulesetIpList;
}
export interface HostInternetScsiHba extends HostHostBusAdapter {
  isSoftwareBased: boolean;
  canBeDisabled?: boolean;
  networkBindingSupport?: HostInternetScsiHbaNetworkBindingSupportType;
  discoveryCapabilities: HostInternetScsiHbaDiscoveryCapabilities;
  discoveryProperties: HostInternetScsiHbaDiscoveryProperties;
  authenticationCapabilities: HostInternetScsiHbaAuthenticationCapabilities;
  authenticationProperties: HostInternetScsiHbaAuthenticationProperties;
  digestCapabilities?: HostInternetScsiHbaDigestCapabilities;
  digestProperties?: HostInternetScsiHbaDigestProperties;
  ipCapabilities: HostInternetScsiHbaIPCapabilities;
  ipProperties: HostInternetScsiHbaIPProperties;
  supportedAdvancedOptions?: OptionDef[];
  advancedOptions?: HostInternetScsiHbaParamValue[];
  iScsiName: string;
  iScsiAlias?: string;
  configuredSendTarget?: HostInternetScsiHbaSendTarget[];
  configuredStaticTarget?: HostInternetScsiHbaStaticTarget[];
  maxSpeedMb?: number;
  currentSpeedMb?: number;
}
export interface HostInternetScsiHbaAuthenticationCapabilities extends DynamicData {
  chapAuthSettable: boolean;
  krb5AuthSettable: boolean;
  srpAuthSettable: boolean;
  spkmAuthSettable: boolean;
  mutualChapSettable?: boolean;
  targetChapSettable?: boolean;
  targetMutualChapSettable?: boolean;
}
export interface HostInternetScsiHbaAuthenticationProperties extends DynamicData {
  chapAuthEnabled: boolean;
  chapName?: string;
  chapSecret?: string;
  chapAuthenticationType?: string;
  chapInherited?: boolean;
  mutualChapName?: string;
  mutualChapSecret?: string;
  mutualChapAuthenticationType?: string;
  mutualChapInherited?: boolean;
}
export interface HostInternetScsiHbaDigestCapabilities extends DynamicData {
  headerDigestSettable?: boolean;
  dataDigestSettable?: boolean;
  targetHeaderDigestSettable?: boolean;
  targetDataDigestSettable?: boolean;
}
export interface HostInternetScsiHbaDigestProperties extends DynamicData {
  headerDigestType?: string;
  headerDigestInherited?: boolean;
  dataDigestType?: string;
  dataDigestInherited?: boolean;
}
export interface HostInternetScsiHbaDiscoveryCapabilities extends DynamicData {
  iSnsDiscoverySettable: boolean;
  slpDiscoverySettable: boolean;
  staticTargetDiscoverySettable: boolean;
  sendTargetsDiscoverySettable: boolean;
}
export interface HostInternetScsiHbaDiscoveryProperties extends DynamicData {
  iSnsDiscoveryEnabled: boolean;
  iSnsDiscoveryMethod?: string;
  iSnsHost?: string;
  slpDiscoveryEnabled: boolean;
  slpDiscoveryMethod?: string;
  slpHost?: string;
  staticTargetDiscoveryEnabled: boolean;
  sendTargetsDiscoveryEnabled: boolean;
}
export interface HostInternetScsiHbaIPCapabilities extends DynamicData {
  addressSettable: boolean;
  ipConfigurationMethodSettable: boolean;
  subnetMaskSettable: boolean;
  defaultGatewaySettable: boolean;
  primaryDnsServerAddressSettable: boolean;
  alternateDnsServerAddressSettable: boolean;
  ipv6Supported?: boolean;
  arpRedirectSettable?: boolean;
  mtuSettable?: boolean;
  hostNameAsTargetAddress?: boolean;
  nameAliasSettable?: boolean;
  ipv4EnableSettable?: boolean;
  ipv6EnableSettable?: boolean;
  ipv6PrefixLengthSettable?: boolean;
  ipv6PrefixLength?: number;
  ipv6DhcpConfigurationSettable?: boolean;
  ipv6LinkLocalAutoConfigurationSettable?: boolean;
  ipv6RouterAdvertisementConfigurationSettable?: boolean;
  ipv6DefaultGatewaySettable?: boolean;
  ipv6MaxStaticAddressesSupported?: number;
}
export interface HostInternetScsiHbaIPProperties extends DynamicData {
  mac?: string;
  address?: string;
  dhcpConfigurationEnabled: boolean;
  subnetMask?: string;
  defaultGateway?: string;
  primaryDnsServerAddress?: string;
  alternateDnsServerAddress?: string;
  ipv6Address?: string;
  ipv6SubnetMask?: string;
  ipv6DefaultGateway?: string;
  arpRedirectEnabled?: boolean;
  mtu?: number;
  jumboFramesEnabled?: boolean;
  ipv4Enabled?: boolean;
  ipv6Enabled?: boolean;
  ipv6properties?: HostInternetScsiHbaIPv6Properties;
}
export interface HostInternetScsiHbaIPv6Properties extends DynamicData {
  iscsiIpv6Address?: HostInternetScsiHbaIscsiIpv6Address[];
  ipv6DhcpConfigurationEnabled?: boolean;
  ipv6LinkLocalAutoConfigurationEnabled?: boolean;
  ipv6RouterAdvertisementConfigurationEnabled?: boolean;
  ipv6DefaultGateway?: string;
}
export interface HostInternetScsiHbaIscsiIpv6Address extends DynamicData {
  address: string;
  prefixLength: number;
  origin: string;
  operation?: string;
}
export interface HostInternetScsiHbaParamValue extends OptionValue {
  isInherited?: boolean;
}
export interface HostInternetScsiHbaSendTarget extends DynamicData {
  address: string;
  port?: number;
  authenticationProperties?: HostInternetScsiHbaAuthenticationProperties;
  digestProperties?: HostInternetScsiHbaDigestProperties;
  supportedAdvancedOptions?: OptionDef[];
  advancedOptions?: HostInternetScsiHbaParamValue[];
  parent?: string;
}
export interface HostInternetScsiHbaStaticTarget extends DynamicData {
  address: string;
  port?: number;
  iScsiName: string;
  discoveryMethod?: string;
  authenticationProperties?: HostInternetScsiHbaAuthenticationProperties;
  digestProperties?: HostInternetScsiHbaDigestProperties;
  supportedAdvancedOptions?: OptionDef[];
  advancedOptions?: HostInternetScsiHbaParamValue[];
  parent?: string;
}
export interface HostInternetScsiHbaTargetSet extends DynamicData {
  staticTargets?: HostInternetScsiHbaStaticTarget[];
  sendTargets?: HostInternetScsiHbaSendTarget[];
}
export interface HostInternetScsiTargetTransport extends HostTargetTransport {
  iScsiName: string;
  iScsiAlias: string;
  address?: string[];
}
export interface HostNetworkConfig extends DynamicData {
  vswitch?: HostVirtualSwitchConfig[];
  proxySwitch?: HostProxySwitchConfig[];
  portgroup?: HostPortGroupConfig[];
  pnic?: PhysicalNicConfig[];
  vnic?: HostVirtualNicConfig[];
  consoleVnic?: HostVirtualNicConfig[];
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  consoleIpRouteConfig?: HostIpRouteConfig;
  routeTableConfig?: HostIpRouteTableConfig;
  dhcp?: HostDhcpServiceConfig[];
  nat?: HostNatServiceConfig[];
  ipV6Enabled?: boolean;
  netStackSpec?: HostNetworkConfigNetStackSpec[];
}
export interface HostNetworkConfigNetStackSpec extends DynamicData {
  netStackInstance: HostNetStackInstance;
  operation?: string;
}
export interface HostNetworkConfigResult extends DynamicData {
  vnicDevice?: string[];
  consoleVnicDevice?: string[];
}
export interface HostNvmeConnectSpec extends HostNvmeSpec {
  subnqn: string;
  controllerId?: number;
  adminQueueSize?: number;
  keepAliveTimeout?: number;
}
export interface HostNvmeDiscoverSpec extends HostNvmeSpec {
  autoConnect?: boolean;
}
export interface HostNvmeOpaqueTransportParameters extends HostNvmeTransportParameters {
  trtype: string;
  traddr: string;
  adrfam: string;
  trsvcid: string;
  tsas: Buffer;
}
export interface HostNvmeOverFibreChannelParameters extends HostNvmeTransportParameters {
  nodeWorldWideName: number;
  portWorldWideName: number;
}
export interface HostNvmeOverRdmaParameters extends HostNvmeTransportParameters {
  address: string;
  addressFamily?: string;
  portNumber?: number;
}
export interface HostOpaqueNetworkInfo extends DynamicData {
  opaqueNetworkId: string;
  opaqueNetworkName: string;
  opaqueNetworkType: string;
  pnicZone?: string[];
  capability?: OpaqueNetworkCapability;
  extraConfig?: OptionValue[];
}
export interface HostParallelScsiTargetTransport extends HostTargetTransport {
  
}
export interface HostPcieTargetTransport extends HostTargetTransport {
  
}
export interface HostRdmaTargetTransport extends HostTargetTransport {
  
}
export interface HostScsiDisk extends ScsiLun {
  capacity: HostDiskDimensionsLba;
  devicePath: string;
  ssd?: boolean;
  localDisk?: boolean;
  physicalLocation?: string[];
  emulatedDIXDIFEnabled?: boolean;
  vsanDiskInfo?: VsanHostVsanDiskInfo;
  scsiDiskType?: string;
}
export interface HostScsiDiskPartition extends DynamicData {
  diskName: string;
  partition: number;
}
export interface HostSecuritySpec extends DynamicData {
  adminPassword?: string;
  removePermission?: Permission[];
  addPermission?: Permission[];
}
export interface HostSerialAttachedTargetTransport extends HostTargetTransport {
  
}
export interface HostListSummary extends DynamicData {
  host?: HostSystem;
  hardware?: HostHardwareSummary;
  runtime?: HostRuntimeInfo;
  config: HostConfigSummary;
  quickStats: HostListSummaryQuickStats;
  overallStatus: ManagedEntityStatus;
  rebootRequired: boolean;
  customValue?: CustomFieldValue[];
  managementServerIp?: string;
  maxEVCModeKey?: string;
  currentEVCModeKey?: string;
  currentEVCGraphicsModeKey?: string;
  gateway?: HostListSummaryGatewaySummary;
  tpmAttestation?: HostTpmAttestationInfo;
  trustAuthorityAttestationInfos?: HostTrustAuthorityAttestationInfo[];
}
export interface HostConfigSummary extends DynamicData {
  name: string;
  port: number;
  sslThumbprint?: string;
  product?: AboutInfo;
  vmotionEnabled: boolean;
  faultToleranceEnabled: boolean;
  featureVersion?: HostFeatureVersionInfo[];
  agentVmDatastore?: Datastore;
  agentVmNetwork?: Network;
}
export interface HostListSummaryGatewaySummary extends DynamicData {
  gatewayType: string;
  gatewayId: string;
}
export interface HostHardwareSummary extends DynamicData {
  vendor: string;
  model: string;
  uuid: string;
  otherIdentifyingInfo?: HostSystemIdentificationInfo[];
  memorySize: number;
  cpuModel: string;
  cpuMhz: number;
  numCpuPkgs: number;
  numCpuCores: number;
  numCpuThreads: number;
  numNics: number;
  numHBAs: number;
}
export interface HostListSummaryQuickStats extends DynamicData {
  overallCpuUsage?: number;
  overallMemoryUsage?: number;
  distributedCpuFairness?: number;
  distributedMemoryFairness?: number;
  availablePMemCapacity?: number;
  uptime?: number;
}
export interface HostTpmBootSecurityOptionEventDetails extends HostTpmEventDetails {
  bootSecurityOption: string;
}
export interface HostTpmCommandEventDetails extends HostTpmEventDetails {
  commandLine: string;
}
export interface HostUnresolvedVmfsExtent extends DynamicData {
  device: HostScsiDiskPartition;
  devicePath: string;
  vmfsUuid: string;
  isHeadExtent: boolean;
  ordinal: number;
  startBlock: number;
  endBlock: number;
  reason: string;
}
export interface HostVFlashManagerVFlashCacheConfigInfo extends DynamicData {
  vFlashModuleConfigOption?: HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption[];
  defaultVFlashModule?: string;
  swapCacheReservationInGB?: number;
}
export interface HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption extends DynamicData {
  vFlashModule: string;
  vFlashModuleVersion: string;
  minSupportedModuleVersion: string;
  cacheConsistencyType: ChoiceOption;
  cacheMode: ChoiceOption;
  blockSizeInKBOption: LongOption;
  reservationInMBOption: LongOption;
  maxDiskSizeInKB: number;
}
export interface HostVFlashManagerVFlashCacheConfigSpec extends DynamicData {
  defaultVFlashModule: string;
  swapCacheReservationInGB: number;
}
export interface HostVFlashManagerVFlashConfigInfo extends DynamicData {
  vFlashResourceConfigInfo?: HostVFlashManagerVFlashResourceConfigInfo;
  vFlashCacheConfigInfo?: HostVFlashManagerVFlashCacheConfigInfo;
}
export interface HostVFlashManagerVFlashResourceConfigInfo extends DynamicData {
  vffs?: HostVffsVolume;
  capacity: number;
}
export interface HostVFlashManagerVFlashResourceConfigSpec extends DynamicData {
  vffsUuid: string;
}
export interface HostVFlashManagerVFlashResourceRunTimeInfo extends DynamicData {
  usage: number;
  capacity: number;
  accessible: boolean;
  capacityForVmCache: number;
  freeForVmCache: number;
}
export interface HostVMotionInfo extends DynamicData {
  netConfig?: HostVMotionNetConfig;
  ipConfig?: HostIpConfig;
}
export interface HostVffsVolume extends HostFileSystemVolume {
  majorVersion: number;
  version: string;
  uuid: string;
  extent: HostScsiDiskPartition[];
}
export interface HostVffsSpec extends DynamicData {
  devicePath: string;
  partition?: HostDiskPartitionSpec;
  majorVersion: number;
  volumeName: string;
}
export interface VmfsDatastoreExpandSpec extends VmfsDatastoreSpec {
  partition: HostDiskPartitionSpec;
  extent: HostScsiDiskPartition;
}
export interface VmfsDatastoreExtendSpec extends VmfsDatastoreSpec {
  partition: HostDiskPartitionSpec;
  extent: HostScsiDiskPartition[];
}
export interface HostVmfsVolume extends HostFileSystemVolume {
  blockSizeMb: number;
  blockSize?: number;
  unmapGranularity?: number;
  unmapPriority?: string;
  unmapBandwidthSpec?: VmfsUnmapBandwidthSpec;
  maxBlocks: number;
  majorVersion: number;
  version: string;
  uuid: string;
  extent: HostScsiDiskPartition[];
  vmfsUpgradable: boolean;
  forceMountedInfo?: HostForceMountedInfo;
  ssd?: boolean;
  local?: boolean;
  scsiDiskType?: string;
}
export interface VmfsConfigOption extends DynamicData {
  blockSizeOption: number;
  unmapGranularityOption?: number[];
  unmapBandwidthFixedValue?: LongOption;
  unmapBandwidthDynamicMin?: LongOption;
  unmapBandwidthDynamicMax?: LongOption;
  unmapBandwidthIncrement?: number;
}
export interface HostVmfsSpec extends DynamicData {
  extent: HostScsiDiskPartition;
  blockSizeMb?: number;
  majorVersion: number;
  volumeName: string;
  blockSize?: number;
  unmapGranularity?: number;
  unmapPriority?: string;
  unmapBandwidthSpec?: VmfsUnmapBandwidthSpec;
}
export interface VmfsUnmapBandwidthSpec extends DynamicData {
  policy: string;
  fixedValue: number;
  dynamicMin: number;
  dynamicMax: number;
}
export interface BoolOption extends OptionType {
  supported: boolean;
  defaultValue: boolean;
}
export interface ChoiceOption extends OptionType {
  choiceInfo: ElementDescription[];
  defaultIndex?: number;
}
export interface FloatOption extends OptionType {
  min: number;
  max: number;
  defaultValue: number;
}
export interface IntOption extends OptionType {
  min: number;
  max: number;
  defaultValue: number;
}
export interface LongOption extends OptionType {
  min: number;
  max: number;
  defaultValue: number;
}
export interface ProfileCompositeExpression extends ProfileExpression {
  operator: string;
  expressionName: string[];
}
export interface CompositePolicyOption extends PolicyOption {
  option?: PolicyOption[];
}
export interface ProfileCompositePolicyOptionMetadata extends ProfilePolicyOptionMetadata {
  option: string[];
}
export interface DvsHostVNicProfile extends DvsVNicProfile {
  
}
export interface DvsServiceConsoleVNicProfile extends DvsVNicProfile {
  
}
export interface HostPortGroupProfile extends PortGroupProfile {
  ipConfig: IpAddressProfile;
}
export interface HostProfileCompleteConfigSpec extends HostProfileConfigSpec {
  applyProfile?: HostApplyProfile;
  customComplyProfile?: ComplianceProfile;
  disabledExpressionListChanged: boolean;
  disabledExpressionList?: string[];
  validatorHost?: HostSystem;
  validating?: boolean;
  hostConfig?: HostProfileConfigInfo;
}
export interface HostProfileConfigInfo extends ProfileConfigInfo {
  applyProfile?: HostApplyProfile;
  defaultComplyProfile?: ComplianceProfile;
  defaultComplyLocator?: ComplianceLocator[];
  customComplyProfile?: ComplianceProfile;
  disabledExpressionList?: string[];
  description?: ProfileDescription;
}
export interface HostProfileConfigSpec extends ProfileCreateSpec {
  
}
export interface HostProfileHostBasedConfigSpec extends HostProfileConfigSpec {
  host: HostSystem;
  useHostProfileEngine?: boolean;
}
export interface HostProfileSerializedHostProfileSpec extends ProfileSerializedCreateSpec {
  validatorHost?: HostSystem;
  validating?: boolean;
}
export interface HostProfileValidationFailureInfo extends DynamicData {
  name: string;
  annotation: string;
  updateType: string;
  host?: HostSystem;
  applyProfile?: HostApplyProfile;
  failures?: ProfileUpdateFailedUpdateFailure[];
  faults?: MethodFault[];
}
export interface NetStackInstanceProfile extends ApplyProfile {
  key: string;
  dnsConfig: NetworkProfileDnsConfigProfile;
  ipRouteConfig: IpRouteProfile;
}
export interface AnswerFileCreateSpec extends DynamicData {
  validating?: boolean;
}
export interface AnswerFileOptionsCreateSpec extends AnswerFileCreateSpec {
  userInput?: ProfileDeferredPolicyOptionParameter[];
}
export interface AnswerFileSerializedCreateSpec extends AnswerFileCreateSpec {
  answerFileConfigString: string;
}
export interface ApplyHostProfileConfigurationResult extends DynamicData {
  startTime: Date;
  completeTime: Date;
  host: HostSystem;
  status: string;
  errors?: MethodFault[];
}
export interface ApplyHostProfileConfigurationSpec extends ProfileExecuteResult {
  host: HostSystem;
  taskListRequirement?: string[];
  taskDescription?: LocalizableMessage[];
  rebootStateless?: boolean;
  rebootHost?: boolean;
  faultData?: MethodFault;
}
export interface HostProfileManagerCompositionResult extends DynamicData {
  errors?: LocalizableMessage[];
  results?: HostProfileManagerCompositionResultResultElement[];
}
export interface HostProfileManagerCompositionResultResultElement extends DynamicData {
  target: Profile;
  status: string;
  errors?: LocalizableMessage[];
}
export interface HostProfileManagerCompositionValidationResult extends DynamicData {
  results?: HostProfileManagerCompositionValidationResultResultElement[];
  errors?: LocalizableMessage[];
}
export interface HostProfileManagerCompositionValidationResultResultElement extends DynamicData {
  target: Profile;
  status: string;
  errors?: LocalizableMessage[];
  sourceDiffForToBeMerged?: HostApplyProfile;
  targetDiffForToBeMerged?: HostApplyProfile;
  toBeAdded?: HostApplyProfile;
  toBeDeleted?: HostApplyProfile;
  toBeDisabled?: HostApplyProfile;
  toBeEnabled?: HostApplyProfile;
  toBeReenableCC?: HostApplyProfile;
}
export interface HostProfileManagerConfigTaskList extends DynamicData {
  configSpec?: HostConfigSpec;
  taskDescription?: LocalizableMessage[];
  taskListRequirement?: string[];
}
export interface HostProfilesEntityCustomizations extends DynamicData {
  
}
export interface HostProfileManagerHostToConfigSpecMap extends DynamicData {
  host: HostSystem;
  configSpec: AnswerFileCreateSpec;
}
export interface StructuredCustomizations extends HostProfilesEntityCustomizations {
  entity: ManagedEntity;
  customizations?: AnswerFile;
}
export interface AfterStartupTaskScheduler extends TaskScheduler {
  minute: number;
}
export interface OnceTaskScheduler extends TaskScheduler {
  runAt?: Date;
}
export interface RecurrentTaskScheduler extends TaskScheduler {
  interval: number;
}
export interface ScheduledTaskInfo extends ScheduledTaskSpec {
  scheduledTask: ScheduledTask;
  entity: ManagedEntity;
  lastModifiedTime: Date;
  lastModifiedUser: string;
  nextRunTime?: Date;
  prevRunTime?: Date;
  state: TaskInfoState;
  error?: MethodFault;
  result?: any;
  progress?: number;
  activeTask?: Task;
  taskObject: ManagedObject;
}
export interface StorageDrsPodSelectionSpec extends DynamicData {
  initialVmConfig?: VmPodConfigForPlacement[];
  storagePod?: StoragePod;
}
export interface PodDiskLocator extends DynamicData {
  diskId: number;
  diskMoveType?: string;
  diskBackingInfo?: VirtualDeviceBackingInfo;
  profile?: VirtualMachineProfileSpec[];
}
export interface VmPodConfigForPlacement extends DynamicData {
  storagePod: StoragePod;
  disk?: PodDiskLocator[];
  vmConfig?: StorageDrsVmConfigInfo;
  interVmRule?: ClusterRuleInfo[];
}
export interface StoragePlacementSpec extends DynamicData {
  type: string;
  priority?: VirtualMachineMovePriority;
  vm?: VirtualMachine;
  podSelectionSpec: StorageDrsPodSelectionSpec;
  cloneSpec?: VirtualMachineCloneSpec;
  cloneName?: string;
  configSpec?: VirtualMachineConfigSpec;
  relocateSpec?: VirtualMachineRelocateSpec;
  resourcePool?: ResourcePool;
  host?: HostSystem;
  folder?: Folder;
  disallowPrerequisiteMoves?: boolean;
  resourceLeaseDurationSec?: number;
}
export interface VirtualDiskAntiAffinityRuleSpec extends ClusterRuleInfo {
  diskId: number[];
}
export interface VirtualDiskRuleSpec extends ClusterRuleInfo {
  diskRuleType: string;
  diskId?: number[];
}
export interface VAppConfigInfo extends VmConfigInfo {
  entityConfig?: VAppEntityConfigInfo[];
  annotation: string;
  instanceUuid?: string;
  managedBy?: ManagedByInfo;
}
export interface VAppConfigSpec extends VmConfigSpec {
  entityConfig?: VAppEntityConfigInfo[];
  annotation?: string;
  instanceUuid?: string;
  managedBy?: ManagedByInfo;
}
export interface VirtualAppImportSpec extends ImportSpec {
  name: string;
  vAppConfigSpec: VAppConfigSpec;
  resourcePoolSpec: ResourceConfigSpec;
  child?: ImportSpec[];
}
export interface VirtualMachineCdromInfo extends VirtualMachineTargetInfo {
  description?: string;
}
export interface ConfigTarget extends DynamicData {
  numCpus: number;
  numCpuCores: number;
  numNumaNodes: number;
  maxCpusPerHost?: number;
  smcPresent: boolean;
  datastore?: VirtualMachineDatastoreInfo[];
  network?: VirtualMachineNetworkInfo[];
  opaqueNetwork?: OpaqueNetworkTargetInfo[];
  distributedVirtualPortgroup?: DistributedVirtualPortgroupInfo[];
  distributedVirtualSwitch?: DistributedVirtualSwitchInfo[];
  cdRom?: VirtualMachineCdromInfo[];
  serial?: VirtualMachineSerialInfo[];
  parallel?: VirtualMachineParallelInfo[];
  sound?: VirtualMachineSoundInfo[];
  usb?: VirtualMachineUsbInfo[];
  floppy?: VirtualMachineFloppyInfo[];
  legacyNetworkInfo?: VirtualMachineLegacyNetworkSwitchInfo[];
  scsiPassthrough?: VirtualMachineScsiPassthroughInfo[];
  scsiDisk?: VirtualMachineScsiDiskDeviceInfo[];
  ideDisk?: VirtualMachineIdeDiskDeviceInfo[];
  maxMemMBOptimalPerf: number;
  supportedMaxMemMB?: number;
  resourcePool?: ResourcePoolRuntimeInfo;
  autoVmotion?: boolean;
  pciPassthrough?: VirtualMachinePciPassthroughInfo[];
  sriov?: VirtualMachineSriovInfo[];
  vFlashModule?: VirtualMachineVFlashModuleInfo[];
  sharedGpuPassthroughTypes?: VirtualMachinePciSharedGpuPassthroughInfo[];
  availablePersistentMemoryReservationMB?: number;
  dynamicPassthrough?: VirtualMachineDynamicPassthroughInfo[];
  sgxTargetInfo?: VirtualMachineSgxTargetInfo;
  precisionClockInfo?: VirtualMachinePrecisionClockInfo[];
  sevSupported?: boolean;
}
export interface VirtualMachineDefaultProfileSpec extends VirtualMachineProfileSpec {
  
}
export interface VirtualMachineDefinedProfileSpec extends VirtualMachineProfileSpec {
  profileId: string;
  replicationSpec?: ReplicationSpec;
  profileData?: VirtualMachineProfileRawData;
  profileParams?: KeyValue[];
}
export interface VirtualMachineDiskDeviceInfo extends VirtualMachineTargetInfo {
  capacity?: number;
  vm?: VirtualMachine[];
}
export interface VirtualMachineDynamicPassthroughInfo extends VirtualMachineTargetInfo {
  vendorName: string;
  deviceName: string;
  customLabel?: string;
  vendorId: number;
  deviceId: number;
}
export interface VirtualMachineEmptyProfileSpec extends VirtualMachineProfileSpec {
  
}
export interface VirtualMachineFloppyInfo extends VirtualMachineTargetInfo {
  
}
export interface VirtualMachineIdeDiskDeviceInfo extends VirtualMachineDiskDeviceInfo {
  partitionTable?: VirtualMachineIdeDiskDevicePartitionInfo[];
}
export interface VirtualMachineIdeDiskDevicePartitionInfo extends DynamicData {
  id: number;
  capacity: number;
}
export interface VirtualMachineNetworkInfo extends VirtualMachineTargetInfo {
  network: NetworkSummary;
  vswitch?: string;
}
export interface OpaqueNetworkTargetInfo extends VirtualMachineTargetInfo {
  network: OpaqueNetworkSummary;
  networkReservationSupported?: boolean;
}
export interface VirtualMachineParallelInfo extends VirtualMachineTargetInfo {
  
}
export interface VirtualMachinePciPassthroughInfo extends VirtualMachineTargetInfo {
  pciDevice: HostPciDevice;
  systemId: string;
}
export interface VirtualMachinePciSharedGpuPassthroughInfo extends VirtualMachineTargetInfo {
  vgpu: string;
}
export interface VirtualMachinePrecisionClockInfo extends VirtualMachineTargetInfo {
  systemClockProtocol?: string;
}
export interface VirtualMachineRelocateSpec extends DynamicData {
  service?: ServiceLocator;
  folder?: Folder;
  datastore?: Datastore;
  diskMoveType?: string;
  pool?: ResourcePool;
  host?: HostSystem;
  disk?: VirtualMachineRelocateSpecDiskLocator[];
  transform?: VirtualMachineRelocateTransformation;
  deviceChange?: VirtualDeviceConfigSpec[];
  profile?: VirtualMachineProfileSpec[];
  cryptoSpec?: CryptoSpec;
}
export interface VirtualMachineRelocateSpecDiskLocator extends DynamicData {
  diskId: number;
  datastore: Datastore;
  diskMoveType?: string;
  diskBackingInfo?: VirtualDeviceBackingInfo;
  profile?: VirtualMachineProfileSpec[];
  backing?: VirtualMachineRelocateSpecDiskLocatorBackingSpec;
}
export interface VirtualMachineRelocateSpecDiskLocatorBackingSpec extends DynamicData {
  parent?: VirtualMachineRelocateSpecDiskLocatorBackingSpec;
  crypto?: CryptoSpec;
}
export interface VirtualMachineRuntimeInfo extends DynamicData {
  device?: VirtualMachineDeviceRuntimeInfo[];
  host?: HostSystem;
  connectionState: VirtualMachineConnectionState;
  powerState: VirtualMachinePowerState;
  faultToleranceState: VirtualMachineFaultToleranceState;
  dasVmProtection?: VirtualMachineRuntimeInfoDasProtectionState;
  toolsInstallerMounted: boolean;
  suspendTime?: Date;
  bootTime?: Date;
  suspendInterval?: number;
  question?: VirtualMachineQuestionInfo;
  memoryOverhead?: number;
  maxCpuUsage?: number;
  maxMemoryUsage?: number;
  numMksConnections: number;
  recordReplayState: VirtualMachineRecordReplayState;
  cleanPowerOff?: boolean;
  needSecondaryReason?: string;
  onlineStandby: boolean;
  minRequiredEVCModeKey?: string;
  consolidationNeeded: boolean;
  offlineFeatureRequirement?: VirtualMachineFeatureRequirement[];
  featureRequirement?: VirtualMachineFeatureRequirement[];
  featureMask?: HostFeatureMask[];
  vFlashCacheAllocation?: number;
  paused?: boolean;
  snapshotInBackground?: boolean;
  quiescedForkParent?: boolean;
  instantCloneFrozen?: boolean;
  cryptoState?: string;
}
export interface VirtualMachineRuntimeInfoDasProtectionState extends DynamicData {
  dasProtected: boolean;
}
export interface VirtualMachineScsiDiskDeviceInfo extends VirtualMachineDiskDeviceInfo {
  disk?: HostScsiDisk;
  transportHint?: string;
  lunNumber?: number;
}
export interface VirtualMachineScsiPassthroughInfo extends VirtualMachineTargetInfo {
  scsiClass: string;
  vendor: string;
  physicalUnitNumber: number;
}
export interface VirtualMachineSerialInfo extends VirtualMachineTargetInfo {
  
}
export interface VirtualMachineSgxTargetInfo extends VirtualMachineTargetInfo {
  maxEpcSize: number;
  flcModes?: string[];
  lePubKeyHashes?: string[];
}
export interface VirtualMachineSnapshotTree extends DynamicData {
  snapshot: VirtualMachineSnapshot;
  vm: VirtualMachine;
  name: string;
  description: string;
  id: number;
  createTime: Date;
  state: VirtualMachinePowerState;
  quiesced: boolean;
  backupManifest?: string;
  childSnapshotList?: VirtualMachineSnapshotTree[];
  replaySupported?: boolean;
}
export interface VirtualMachineSoundInfo extends VirtualMachineTargetInfo {
  
}
export interface VirtualMachineSriovInfo extends VirtualMachinePciPassthroughInfo {
  virtualFunction: boolean;
  pnic?: string;
  devicePool?: VirtualMachineSriovDevicePoolInfo;
}
export interface VirtualMachineSummary extends DynamicData {
  vm?: VirtualMachine;
  runtime: VirtualMachineRuntimeInfo;
  guest?: VirtualMachineGuestSummary;
  config: VirtualMachineConfigSummary;
  storage?: VirtualMachineStorageSummary;
  quickStats: VirtualMachineQuickStats;
  overallStatus: ManagedEntityStatus;
  customValue?: CustomFieldValue[];
}
export interface VirtualMachineConfigSummary extends DynamicData {
  name: string;
  template: boolean;
  vmPathName: string;
  memorySizeMB?: number;
  cpuReservation?: number;
  memoryReservation?: number;
  numCpu?: number;
  numEthernetCards?: number;
  numVirtualDisks?: number;
  uuid?: string;
  instanceUuid?: string;
  guestId?: string;
  guestFullName?: string;
  annotation?: string;
  product?: VAppProductInfo;
  installBootRequired?: boolean;
  ftInfo?: FaultToleranceConfigInfo;
  managedBy?: ManagedByInfo;
  tpmPresent?: boolean;
  numVmiopBackings?: number;
  hwVersion?: string;
}
export interface VirtualMachineGuestSummary extends DynamicData {
  guestId?: string;
  guestFullName?: string;
  toolsStatus?: VirtualMachineToolsStatus;
  toolsVersionStatus?: string;
  toolsVersionStatus2?: string;
  toolsRunningStatus?: string;
  hostName?: string;
  ipAddress?: string;
  hwVersion?: string;
}
export interface VirtualMachineQuickStats extends DynamicData {
  overallCpuUsage?: number;
  overallCpuDemand?: number;
  overallCpuReadiness?: number;
  guestMemoryUsage?: number;
  hostMemoryUsage?: number;
  guestHeartbeatStatus: ManagedEntityStatus;
  distributedCpuEntitlement?: number;
  distributedMemoryEntitlement?: number;
  staticCpuEntitlement?: number;
  staticMemoryEntitlement?: number;
  grantedMemory?: number;
  privateMemory?: number;
  sharedMemory?: number;
  swappedMemory?: number;
  balloonedMemory?: number;
  consumedOverheadMemory?: number;
  ftLogBandwidth?: number;
  ftSecondaryLatency?: number;
  ftLatencyStatus?: ManagedEntityStatus;
  compressedMemory?: number;
  uptimeSeconds?: number;
  ssdSwappedMemory?: number;
}
export interface VirtualMachineStorageSummary extends DynamicData {
  committed: number;
  uncommitted: number;
  unshared: number;
  timestamp: Date;
}
export interface VirtualMachineVFlashModuleInfo extends VirtualMachineTargetInfo {
  vFlashModule: HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption;
}
export interface VirtualMachineImportSpec extends ImportSpec {
  configSpec: VirtualMachineConfigSpec;
  resPoolEntity?: ResourcePool;
}
export interface CustomizationAutoIpV6Generator extends CustomizationIpV6Generator {
  
}
export interface CustomizationCustomIpGenerator extends CustomizationIpGenerator {
  argument?: string;
}
export interface CustomizationCustomIpV6Generator extends CustomizationIpV6Generator {
  argument?: string;
}
export interface CustomizationCustomName extends CustomizationName {
  argument?: string;
}
export interface CustomizationDhcpIpGenerator extends CustomizationIpGenerator {
  
}
export interface CustomizationDhcpIpV6Generator extends CustomizationIpV6Generator {
  
}
export interface CustomizationFixedIp extends CustomizationIpGenerator {
  ipAddress: string;
}
export interface CustomizationFixedIpV6 extends CustomizationIpV6Generator {
  ipAddress: string;
  subnetMask: number;
}
export interface CustomizationFixedName extends CustomizationName {
  name: string;
}
export interface CustomizationLinuxOptions extends CustomizationOptions {
  
}
export interface VirtualCdrom extends VirtualDevice {
  
}
export interface VirtualCdromAtapiBackingInfo extends VirtualDeviceDeviceBackingInfo {
  
}
export interface VirtualCdromIsoBackingInfo extends VirtualDeviceFileBackingInfo {
  
}
export interface VirtualCdromPassthroughBackingInfo extends VirtualDeviceDeviceBackingInfo {
  exclusive: boolean;
}
export interface VirtualCdromRemoteAtapiBackingInfo extends VirtualDeviceRemoteDeviceBackingInfo {
  
}
export interface VirtualCdromRemotePassthroughBackingInfo extends VirtualDeviceRemoteDeviceBackingInfo {
  exclusive: boolean;
}
export interface VirtualCdromOption extends VirtualDeviceOption {
  
}
export interface VirtualCdromAtapiBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualCdromIsoBackingOption extends VirtualDeviceFileBackingOption {
  
}
export interface VirtualCdromPassthroughBackingOption extends VirtualDeviceDeviceBackingOption {
  exclusive: BoolOption;
}
export interface VirtualCdromRemoteAtapiBackingOption extends VirtualDeviceDeviceBackingOption {
  
}
export interface VirtualCdromRemotePassthroughBackingOption extends VirtualDeviceRemoteDeviceBackingOption {
  exclusive: BoolOption;
}
export interface VirtualController extends VirtualDevice {
  busNumber: number;
  device?: number[];
}
export interface VirtualControllerOption extends VirtualDeviceOption {
  devices: IntOption;
  supportedDevice?: string[];
}
export interface VirtualE1000 extends VirtualEthernetCard {
  
}
export interface VirtualE1000Option extends VirtualEthernetCardOption {
  
}
export interface VirtualE1000e extends VirtualEthernetCard {
  
}
export interface VirtualE1000eOption extends VirtualEthernetCardOption {
  
}
export interface VirtualEnsoniq1371 extends VirtualSoundCard {
  
}
export interface VirtualEnsoniq1371Option extends VirtualSoundCardOption {
  
}
export interface VirtualHdAudioCard extends VirtualSoundCard {
  
}
export interface VirtualHdAudioCardOption extends VirtualSoundCardOption {
  
}
export interface VirtualIDEController extends VirtualController {
  
}
export interface VirtualIDEControllerOption extends VirtualControllerOption {
  numIDEDisks: IntOption;
  numIDECdroms: IntOption;
}
export interface VirtualNVDIMMController extends VirtualController {
  
}
export interface VirtualNVDIMMControllerOption extends VirtualControllerOption {
  numNVDIMMControllers: IntOption;
}
export interface VirtualNVMEController extends VirtualController {
  
}
export interface VirtualNVMEControllerOption extends VirtualControllerOption {
  numNVMEDisks: IntOption;
}
export interface VirtualPCIController extends VirtualController {
  
}
export interface VirtualPCIControllerOption extends VirtualControllerOption {
  numSCSIControllers: IntOption;
  numEthernetCards: IntOption;
  numVideoCards: IntOption;
  numSoundCards: IntOption;
  numVmiRoms: IntOption;
  numVmciDevices: IntOption;
  numPCIPassthroughDevices: IntOption;
  numSasSCSIControllers: IntOption;
  numVmxnet3EthernetCards: IntOption;
  numParaVirtualSCSIControllers: IntOption;
  numSATAControllers: IntOption;
  numNVMEControllers?: IntOption;
  numVmxnet3VrdmaEthernetCards?: IntOption;
}
export interface VirtualPS2Controller extends VirtualController {
  
}
export interface VirtualPS2ControllerOption extends VirtualControllerOption {
  numKeyboards: IntOption;
  numPointingDevices: IntOption;
}
export interface VirtualSATAController extends VirtualController {
  
}
export interface VirtualSATAControllerOption extends VirtualControllerOption {
  numSATADisks: IntOption;
  numSATACdroms: IntOption;
}
export interface VirtualSCSIController extends VirtualController {
  hotAddRemove?: boolean;
  sharedBus: VirtualSCSISharing;
  scsiCtlrUnitNumber?: number;
}
export interface VirtualSCSIControllerOption extends VirtualControllerOption {
  numSCSIDisks: IntOption;
  numSCSICdroms: IntOption;
  numSCSIPassthrough: IntOption;
  sharing: VirtualSCSISharing[];
  defaultSharedIndex: number;
  hotAddRemove: BoolOption;
  scsiCtlrUnitNumber: number;
}
export interface VirtualSIOController extends VirtualController {
  
}
export interface VirtualSIOControllerOption extends VirtualControllerOption {
  numFloppyDrives: IntOption;
  numSerialPorts: IntOption;
  numParallelPorts: IntOption;
}
export interface VirtualSoundBlaster16 extends VirtualSoundCard {
  
}
export interface VirtualSoundBlaster16Option extends VirtualSoundCardOption {
  
}
export interface VirtualUSBController extends VirtualController {
  autoConnectDevices?: boolean;
  ehciEnabled?: boolean;
}
export interface VirtualUSBControllerPciBusSlotInfo extends VirtualDevicePciBusSlotInfo {
  ehciPciSlotNumber?: number;
}
export interface VirtualUSBControllerOption extends VirtualControllerOption {
  autoConnectDevices: BoolOption;
  ehciSupported: BoolOption;
  supportedSpeeds: string[];
}
export interface VirtualUSBXHCIController extends VirtualController {
  autoConnectDevices?: boolean;
}
export interface VirtualUSBXHCIControllerOption extends VirtualControllerOption {
  autoConnectDevices: BoolOption;
  supportedSpeeds: string[];
}
export interface VirtualVmxnet2Option extends VirtualVmxnetOption {
  
}
export interface VirtualVmxnet3Option extends VirtualVmxnetOption {
  
}
export interface VirtualVmxnet3VrdmaOption extends VirtualVmxnet3Option {
  deviceProtocol?: ChoiceOption;
}
export interface VslmCloneSpec extends VslmMigrateSpec {
  name: string;
  keepAfterDeleteVm?: boolean;
  metadata?: KeyValue[];
}
export interface ComputeResourceConfigInfo extends DynamicData {
  vmSwapPlacement: string;
  spbmEnabled?: boolean;
  defaultHardwareVersionKey?: string;
}
export interface ComputeResourceConfigSpec extends DynamicData {
  vmSwapPlacement?: string;
  spbmEnabled?: boolean;
  defaultHardwareVersionKey?: string;
  desiredSoftwareSpec?: DesiredSoftwareSpec;
}
export interface ComputeResourceHostSPBMLicenseInfo extends DynamicData {
  host: HostSystem;
  licenseState: ComputeResourceHostSPBMLicenseInfoHostSPBMLicenseState;
}
export interface ComputeResourceSummary extends DynamicData {
  totalCpu: number;
  totalMemory: number;
  numCpuCores: number;
  numCpuThreads: number;
  effectiveCpu: number;
  effectiveMemory: number;
  numHosts: number;
  numEffectiveHosts: number;
  overallStatus: ManagedEntityStatus;
}
export interface DatacenterBasicConnectInfo extends DynamicData {
  hostname?: string;
  error?: MethodFault;
  serverIp?: string;
  numVm?: number;
  numPoweredOnVm?: number;
  hostProductInfo?: AboutInfo;
  hardwareVendor?: string;
  hardwareModel?: string;
}
export interface DatacenterConfigInfo extends DynamicData {
  defaultHardwareVersionKey?: string;
}
export interface DatacenterConfigSpec extends DynamicData {
  defaultHardwareVersionKey?: string;
}
export interface DatastoreCapability extends DynamicData {
  directoryHierarchySupported: boolean;
  rawDiskMappingsSupported: boolean;
  perFileThinProvisioningSupported: boolean;
  storageIORMSupported: boolean;
  nativeSnapshotSupported: boolean;
  topLevelDirectoryCreateSupported?: boolean;
  seSparseSupported?: boolean;
  vmfsSparseSupported?: boolean;
  vsanSparseSupported?: boolean;
  upitSupported?: boolean;
  vmdkExpandSupported?: boolean;
  clusteredVmdkSupported?: boolean;
}
export interface DatastoreHostMount extends DynamicData {
  key: HostSystem;
  mountInfo: HostMountInfo;
}
export interface DatastoreInfo extends DynamicData {
  name: string;
  url: string;
  freeSpace: number;
  maxFileSize: number;
  maxVirtualDiskCapacity?: number;
  maxMemoryFileSize: number;
  timestamp?: Date;
  containerId?: string;
  aliasOf?: string;
}
export interface DatastoreMountPathDatastorePair extends DynamicData {
  oldMountPath: string;
  datastore: Datastore;
}
export interface DatastoreSummary extends DynamicData {
  datastore?: Datastore;
  name: string;
  url: string;
  capacity: number;
  freeSpace: number;
  uncommitted?: number;
  accessible: boolean;
  multipleHostAccess?: boolean;
  type: string;
  maintenanceMode?: string;
}
export interface DatastoreVVolContainerFailoverPair extends DynamicData {
  srcContainer?: string;
  tgtContainer: string;
  vvolMapping?: KeyValue[];
}
export interface DVSBackupRestoreCapability extends DynamicData {
  backupRestoreSupported: boolean;
}
export interface DVSCapability extends DynamicData {
  dvsOperationSupported?: boolean;
  dvPortGroupOperationSupported?: boolean;
  dvPortOperationSupported?: boolean;
  compatibleHostComponentProductInfo?: DistributedVirtualSwitchHostProductSpec[];
  featuresSupported?: DVSFeatureCapability;
}
export interface DVSConfigInfo extends DynamicData {
  uuid: string;
  name: string;
  numStandalonePorts: number;
  numPorts: number;
  maxPorts: number;
  uplinkPortPolicy: DVSUplinkPortPolicy;
  uplinkPortgroup?: DistributedVirtualPortgroup[];
  defaultPortConfig: DVPortSetting;
  host?: DistributedVirtualSwitchHostMember[];
  productInfo: DistributedVirtualSwitchProductSpec;
  targetInfo?: DistributedVirtualSwitchProductSpec;
  extensionKey?: string;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  policy?: DVSPolicy;
  description?: string;
  configVersion: string;
  contact: DVSContactInfo;
  switchIpAddress?: string;
  createTime: Date;
  networkResourceManagementEnabled: boolean;
  defaultProxySwitchMaxNumPorts?: number;
  healthCheckConfig?: DVSHealthCheckConfig[];
  infrastructureTrafficResourceConfig?: DvsHostInfrastructureTrafficResource[];
  netResourcePoolTrafficResourceConfig?: DvsHostInfrastructureTrafficResource[];
  networkResourceControlVersion?: string;
  vmVnicNetworkResourcePool?: DVSVmVnicNetworkResourcePool[];
  pnicCapacityRatioForReservation?: number;
}
export interface DVSConfigSpec extends DynamicData {
  configVersion?: string;
  name?: string;
  numStandalonePorts?: number;
  maxPorts?: number;
  uplinkPortPolicy?: DVSUplinkPortPolicy;
  uplinkPortgroup?: DistributedVirtualPortgroup[];
  defaultPortConfig?: DVPortSetting;
  host?: DistributedVirtualSwitchHostMemberConfigSpec[];
  extensionKey?: string;
  description?: string;
  policy?: DVSPolicy;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  contact?: DVSContactInfo;
  switchIpAddress?: string;
  defaultProxySwitchMaxNumPorts?: number;
  infrastructureTrafficResourceConfig?: DvsHostInfrastructureTrafficResource[];
  netResourcePoolTrafficResourceConfig?: DvsHostInfrastructureTrafficResource[];
  networkResourceControlVersion?: string;
}
export interface DVSContactInfo extends DynamicData {
  name?: string;
  contact?: string;
}
export interface DVSCreateSpec extends DynamicData {
  configSpec: DVSConfigSpec;
  productInfo?: DistributedVirtualSwitchProductSpec;
  capability?: DVSCapability;
}
export interface DVSFeatureCapability extends DynamicData {
  networkResourceManagementSupported: boolean;
  vmDirectPathGen2Supported: boolean;
  nicTeamingPolicy?: string[];
  networkResourcePoolHighShareValue?: number;
  networkResourceManagementCapability?: DVSNetworkResourceManagementCapability;
  healthCheckCapability?: DVSHealthCheckCapability;
  rollbackCapability?: DVSRollbackCapability;
  backupRestoreCapability?: DVSBackupRestoreCapability;
  networkFilterSupported?: boolean;
  macLearningSupported?: boolean;
}
export interface DVSHealthCheckConfig extends DynamicData {
  enable?: boolean;
  interval?: number;
}
export interface DVSHealthCheckCapability extends DynamicData {
  
}
export interface DvsHostInfrastructureTrafficResource extends DynamicData {
  key: string;
  description?: string;
  allocationInfo: DvsHostInfrastructureTrafficResourceAllocation;
}
export interface DvsHostInfrastructureTrafficResourceAllocation extends DynamicData {
  limit?: number;
  shares?: SharesInfo;
  reservation?: number;
}
export interface DVSNameArrayUplinkPortPolicy extends DVSUplinkPortPolicy {
  uplinkPortName: string[];
}
export interface DVSNetworkResourceManagementCapability extends DynamicData {
  networkResourceManagementSupported: boolean;
  networkResourcePoolHighShareValue: number;
  qosSupported: boolean;
  userDefinedNetworkResourcePoolsSupported: boolean;
  networkResourceControlVersion3Supported?: boolean;
  userDefinedInfraTrafficPoolSupported?: boolean;
}
export interface DvsResourceRuntimeInfo extends DynamicData {
  capacity?: number;
  usage?: number;
  available?: number;
  allocatedResource?: DvsVnicAllocatedResource[];
  vmVnicNetworkResourcePoolRuntime?: DvsVmVnicNetworkResourcePoolRuntimeInfo[];
}
export interface DVSRollbackCapability extends DynamicData {
  rollbackSupported: boolean;
}
export interface DVSRuntimeInfo extends DynamicData {
  hostMemberRuntime?: HostMemberRuntimeInfo[];
  resourceRuntimeInfo?: DvsResourceRuntimeInfo;
}
export interface DVSSummary extends DynamicData {
  name: string;
  uuid: string;
  numPorts: number;
  productInfo?: DistributedVirtualSwitchProductSpec;
  hostMember?: HostSystem[];
  vm?: VirtualMachine[];
  host?: HostSystem[];
  portgroupName?: string[];
  description?: string;
  contact?: DVSContactInfo;
  numHosts?: number;
}
export interface DVSPolicy extends DynamicData {
  autoPreInstallAllowed?: boolean;
  autoUpgradeAllowed?: boolean;
  partialUpgradeAllowed?: boolean;
}
export interface DVSUplinkPortPolicy extends DynamicData {
  
}
export interface FolderBatchAddHostsToClusterResult extends DynamicData {
  hostsAddedToCluster?: HostSystem[];
  hostsFailedInventoryAdd?: FolderFailedHostResult[];
  hostsFailedMoveToCluster?: FolderFailedHostResult[];
}
export interface FolderBatchAddStandaloneHostsResult extends DynamicData {
  addedHosts?: HostSystem[];
  hostsFailedInventoryAdd?: FolderFailedHostResult[];
}
export interface FolderFailedHostResult extends DynamicData {
  hostName?: string;
  host?: HostSystem;
  context: LocalizableMessage;
  fault: MethodFault;
}
export interface FolderNewHostSpec extends DynamicData {
  hostCnxSpec: HostConnectSpec;
  esxLicense?: string;
}
export interface HealthUpdate extends DynamicData {
  entity: ManagedEntity;
  healthUpdateInfoId: string;
  id: string;
  status: ManagedEntityStatus;
  remediation: string;
}
export interface HostSystemComplianceCheckState extends DynamicData {
  state: string;
  checkTime: Date;
}
export interface HostSystemReconnectSpec extends DynamicData {
  syncState?: boolean;
}
export interface HostSystemRemediationState extends DynamicData {
  state: string;
  operationTime: Date;
}
export interface HostVMotionCompatibility extends DynamicData {
  host: HostSystem;
  compatibility?: string[];
}
export interface ProductComponentInfo extends DynamicData {
  id: string;
  name: string;
  version: string;
  release: number;
}
export interface StoragePodSummary extends DynamicData {
  name: string;
  capacity: number;
  freeSpace: number;
}
export interface VasaProviderContainerSpec extends DynamicData {
  vasaProviderInfo?: VimVasaProviderInfo[];
  scId: string;
  deleted: boolean;
}
export interface ClusterAffinityRuleSpec extends ClusterRuleInfo {
  vm: VirtualMachine[];
}
export interface ClusterAntiAffinityRuleSpec extends ClusterRuleInfo {
  vm: VirtualMachine[];
}
export interface ClusterConfigInfoEx extends ComputeResourceConfigInfo {
  dasConfig: ClusterDasConfigInfo;
  dasVmConfig?: ClusterDasVmConfigInfo[];
  drsConfig: ClusterDrsConfigInfo;
  drsVmConfig?: ClusterDrsVmConfigInfo[];
  rule?: ClusterRuleInfo[];
  orchestration?: ClusterOrchestrationInfo;
  vmOrchestration?: ClusterVmOrchestrationInfo[];
  dpmConfigInfo?: ClusterDpmConfigInfo;
  dpmHostConfig?: ClusterDpmHostConfigInfo[];
  vsanConfigInfo?: VsanClusterConfigInfo;
  vsanHostConfig?: VsanHostConfigInfo[];
  group?: ClusterGroupInfo[];
  infraUpdateHaConfig?: ClusterInfraUpdateHaConfigInfo;
  proactiveDrsConfig?: ClusterProactiveDrsConfigInfo;
  cryptoConfig?: ClusterCryptoConfigInfo;
}
export interface ClusterConfigSpecEx extends ComputeResourceConfigSpec {
  dasConfig?: ClusterDasConfigInfo;
  dasVmConfigSpec?: ClusterDasVmConfigSpec[];
  drsConfig?: ClusterDrsConfigInfo;
  drsVmConfigSpec?: ClusterDrsVmConfigSpec[];
  rulesSpec?: ClusterRuleSpec[];
  orchestration?: ClusterOrchestrationInfo;
  vmOrchestrationSpec?: ClusterVmOrchestrationSpec[];
  dpmConfig?: ClusterDpmConfigInfo;
  dpmHostConfigSpec?: ClusterDpmHostConfigSpec[];
  vsanConfig?: VsanClusterConfigInfo;
  vsanHostConfigSpec?: VsanHostConfigInfo[];
  groupSpec?: ClusterGroupSpec[];
  infraUpdateHaConfig?: ClusterInfraUpdateHaConfigInfo;
  proactiveDrsConfig?: ClusterProactiveDrsConfigInfo;
  inHciWorkflow?: boolean;
  cryptoConfig?: ClusterCryptoConfigInfo;
}
export interface ClusterDependencyRuleInfo extends ClusterRuleInfo {
  vmGroup: string;
  dependsOnVmGroup: string;
}
export interface DistributedVirtualSwitchManagerCompatibilityResult extends DynamicData {
  host: HostSystem;
  error?: MethodFault[];
}
export interface DVSManagerDvsConfigTarget extends DynamicData {
  distributedVirtualPortgroup?: DistributedVirtualPortgroupInfo[];
  distributedVirtualSwitch?: DistributedVirtualSwitchInfo[];
}
export interface DistributedVirtualSwitchManagerDvsProductSpec extends DynamicData {
  newSwitchProductSpec?: DistributedVirtualSwitchProductSpec;
  distributedVirtualSwitch?: DistributedVirtualSwitch;
}
export interface DistributedVirtualSwitchManagerHostArrayFilter extends DistributedVirtualSwitchManagerHostDvsFilterSpec {
  host: HostSystem[];
}
export interface DistributedVirtualSwitchManagerHostContainer extends DynamicData {
  container: ManagedEntity;
  recursive: boolean;
}
export interface DistributedVirtualSwitchManagerHostContainerFilter extends DistributedVirtualSwitchManagerHostDvsFilterSpec {
  hostContainer: DistributedVirtualSwitchManagerHostContainer;
}
export interface DistributedVirtualSwitchManagerHostDvsFilterSpec extends DynamicData {
  inclusive: boolean;
}
export interface DistributedVirtualSwitchManagerHostDvsMembershipFilter extends DistributedVirtualSwitchManagerHostDvsFilterSpec {
  distributedVirtualSwitch: DistributedVirtualSwitch;
}
export interface DistributedVirtualSwitchManagerImportResult extends DynamicData {
  distributedVirtualSwitch?: DistributedVirtualSwitch[];
  distributedVirtualPortgroup?: DistributedVirtualPortgroup[];
  importFault?: ImportOperationBulkFaultFaultOnImport[];
}
export interface VMwareDVSConfigInfo extends DVSConfigInfo {
  vspanSession?: VMwareVspanSession[];
  pvlanConfig?: VMwareDVSPvlanMapEntry[];
  maxMtu: number;
  linkDiscoveryProtocolConfig?: LinkDiscoveryProtocolConfig;
  ipfixConfig?: VMwareIpfixConfig;
  lacpGroupConfig?: VMwareDvsLacpGroupConfig[];
  lacpApiVersion?: string;
  multicastFilteringMode?: string;
}
export interface VMwareDVSConfigSpec extends DVSConfigSpec {
  pvlanConfigSpec?: VMwareDVSPvlanConfigSpec[];
  vspanConfigSpec?: VMwareDVSVspanConfigSpec[];
  maxMtu?: number;
  linkDiscoveryProtocolConfig?: LinkDiscoveryProtocolConfig;
  ipfixConfig?: VMwareIpfixConfig;
  lacpApiVersion?: string;
  multicastFilteringMode?: string;
}
export interface DVSFailureCriteria extends InheritablePolicy {
  checkSpeed?: StringPolicy;
  speed?: IntPolicy;
  checkDuplex?: BoolPolicy;
  fullDuplex?: BoolPolicy;
  checkErrorPercent?: BoolPolicy;
  percentage?: IntPolicy;
  checkBeacon?: BoolPolicy;
}
export interface VMwareDVSFeatureCapability extends DVSFeatureCapability {
  vspanSupported?: boolean;
  lldpSupported?: boolean;
  ipfixSupported?: boolean;
  ipfixCapability?: VMwareDvsIpfixCapability;
  multicastSnoopingSupported?: boolean;
  vspanCapability?: VMwareDVSVspanCapability;
  lacpCapability?: VMwareDvsLacpCapability;
  nsxSupported?: boolean;
}
export interface VMwareIpfixConfig extends DynamicData {
  collectorIpAddress?: string;
  collectorPort?: number;
  observationDomainId?: number;
  activeFlowTimeout: number;
  idleFlowTimeout: number;
  samplingRate: number;
  internalFlowsOnly: boolean;
}
export interface VMwareDvsIpfixCapability extends DynamicData {
  ipfixSupported?: boolean;
  ipv6ForIpfixSupported?: boolean;
  observationDomainIdSupported?: boolean;
}
export interface VMwareDvsLacpCapability extends DynamicData {
  lacpSupported?: boolean;
  multiLacpGroupSupported?: boolean;
}
export interface VMwareDvsLacpGroupConfig extends DynamicData {
  key?: string;
  name?: string;
  mode?: string;
  uplinkNum?: number;
  loadbalanceAlgorithm?: string;
  vlan?: VMwareDvsLagVlanConfig;
  ipfix?: VMwareDvsLagIpfixConfig;
  uplinkName?: string[];
  uplinkPortKey?: string[];
}
export interface VMwareDvsLacpGroupSpec extends DynamicData {
  lacpGroupConfig: VMwareDvsLacpGroupConfig;
  operation: string;
}
export interface VMwareDvsLagIpfixConfig extends DynamicData {
  ipfixEnabled?: boolean;
}
export interface VMwareDvsLagVlanConfig extends DynamicData {
  vlanId?: NumericRange[];
}
export interface DVSMacLearningPolicy extends InheritablePolicy {
  enabled: boolean;
  allowUnicastFlooding?: boolean;
  limit?: number;
  limitPolicy?: string;
}
export interface DVSMacManagementPolicy extends InheritablePolicy {
  allowPromiscuous?: boolean;
  macChanges?: boolean;
  forgedTransmits?: boolean;
  macLearningPolicy?: DVSMacLearningPolicy;
}
export interface VMwareDVSMtuHealthCheckResult extends HostMemberUplinkHealthCheckResult {
  mtuMismatch: boolean;
  vlanSupportSwitchMtu?: NumericRange[];
  vlanNotSupportSwitchMtu?: NumericRange[];
}
export interface VMwareDVSPvlanConfigSpec extends DynamicData {
  pvlanEntry: VMwareDVSPvlanMapEntry;
  operation: string;
}
export interface VMwareDVSPvlanMapEntry extends DynamicData {
  primaryVlanId: number;
  secondaryVlanId: number;
  pvlanType: string;
}
export interface VmwareDistributedVirtualSwitchPvlanSpec extends VmwareDistributedVirtualSwitchVlanSpec {
  pvlanId: number;
}
export interface DVSSecurityPolicy extends InheritablePolicy {
  allowPromiscuous?: BoolPolicy;
  macChanges?: BoolPolicy;
  forgedTransmits?: BoolPolicy;
}
export interface VMwareDVSTeamingHealthCheckConfig extends VMwareDVSHealthCheckConfig {
  
}
export interface VMwareDVSTeamingHealthCheckResult extends HostMemberHealthCheckResult {
  teamingStatus: string;
}
export interface VmwareDistributedVirtualSwitchTrunkVlanSpec extends VmwareDistributedVirtualSwitchVlanSpec {
  vlanId?: NumericRange[];
}
export interface VMwareUplinkLacpPolicy extends InheritablePolicy {
  enable?: BoolPolicy;
  mode?: StringPolicy;
}
export interface VMwareUplinkPortOrderPolicy extends InheritablePolicy {
  activeUplinkPort?: string[];
  standbyUplinkPort?: string[];
}
export interface VmwareUplinkPortTeamingPolicy extends InheritablePolicy {
  policy?: StringPolicy;
  reversePolicy?: BoolPolicy;
  notifySwitches?: BoolPolicy;
  rollingOrder?: BoolPolicy;
  failureCriteria?: DVSFailureCriteria;
  uplinkPortOrder?: VMwareUplinkPortOrderPolicy;
}
export interface VMwareDVSPortgroupPolicy extends DVPortgroupPolicy {
  vlanOverrideAllowed: boolean;
  uplinkTeamingOverrideAllowed: boolean;
  securityPolicyOverrideAllowed: boolean;
  ipfixOverrideAllowed?: boolean;
  macManagementOverrideAllowed?: boolean;
}
export interface VMwareDVSVlanHealthCheckResult extends HostMemberUplinkHealthCheckResult {
  trunkedVlan?: NumericRange[];
  untrunkedVlan?: NumericRange[];
}
export interface VmwareDistributedVirtualSwitchVlanIdSpec extends VmwareDistributedVirtualSwitchVlanSpec {
  vlanId: number;
}
export interface VMwareDVSVlanMtuHealthCheckConfig extends VMwareDVSHealthCheckConfig {
  
}
export interface VmwareDistributedVirtualSwitchVlanSpec extends InheritablePolicy {
  
}
export interface VMwareDVSHealthCheckConfig extends DVSHealthCheckConfig {
  
}
export interface VMwareDVSHealthCheckCapability extends DVSHealthCheckCapability {
  vlanMtuSupported: boolean;
  teamingSupported: boolean;
}
export interface VMwareDVSPortSetting extends DVPortSetting {
  vlan?: VmwareDistributedVirtualSwitchVlanSpec;
  qosTag?: IntPolicy;
  uplinkTeamingPolicy?: VmwareUplinkPortTeamingPolicy;
  securityPolicy?: DVSSecurityPolicy;
  ipfixEnabled?: BoolPolicy;
  txUplink?: BoolPolicy;
  lacpPolicy?: VMwareUplinkLacpPolicy;
  macManagementPolicy?: DVSMacManagementPolicy;
  VNI?: IntPolicy;
}
export interface VMwareDVSVspanConfigSpec extends DynamicData {
  vspanSession: VMwareVspanSession;
  operation: string;
}
export interface VMwareDVSVspanCapability extends DynamicData {
  mixedDestSupported: boolean;
  dvportSupported: boolean;
  remoteSourceSupported: boolean;
  remoteDestSupported: boolean;
  encapRemoteSourceSupported: boolean;
  erspanProtocolSupported?: boolean;
  mirrorNetstackSupported?: boolean;
}
export interface VMwareVspanPort extends DynamicData {
  portKey?: string[];
  uplinkPortName?: string[];
  wildcardPortConnecteeType?: string[];
  vlans?: number[];
  ipAddress?: string[];
}
export interface VMwareVspanSession extends DynamicData {
  key?: string;
  name?: string;
  description?: string;
  enabled: boolean;
  sourcePortTransmitted?: VMwareVspanPort;
  sourcePortReceived?: VMwareVspanPort;
  destinationPort?: VMwareVspanPort;
  encapsulationVlanId?: number;
  stripOriginalVlan: boolean;
  mirroredPacketLength?: number;
  normalTrafficAllowed: boolean;
  sessionType?: string;
  samplingRate?: number;
  encapType?: string;
  erspanId?: number;
  erspanCOS?: number;
  erspanGraNanosec?: boolean;
  netstack?: string;
}
export interface AlarmAcknowledgedEvent extends AlarmEvent {
  source: ManagedEntityEventArgument;
  entity: ManagedEntityEventArgument;
}
export interface AlarmActionTriggeredEvent extends AlarmEvent {
  source: ManagedEntityEventArgument;
  entity: ManagedEntityEventArgument;
}
export interface AlarmClearedEvent extends AlarmEvent {
  source: ManagedEntityEventArgument;
  entity: ManagedEntityEventArgument;
  from: string;
}
export interface AlarmCreatedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
}
export interface AlarmEmailCompletedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  to: string;
}
export interface AlarmEmailFailedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  to: string;
  reason: MethodFault;
}
export interface AlarmEventArgument extends EntityEventArgument {
  alarm: Alarm;
}
export interface ClusterComplianceCheckedEvent extends ClusterEvent {
  profile: ProfileEventArgument;
}
export interface ClusterCreatedEvent extends ClusterEvent {
  parent: FolderEventArgument;
}
export interface ClusterDestroyedEvent extends ClusterEvent {
  
}
export interface ComputeResourceEventArgument extends EntityEventArgument {
  computeResource: ComputeResource;
}
export interface CustomFieldDefEvent extends CustomFieldEvent {
  fieldKey: number;
  name: string;
}
export interface CustomFieldDefRemovedEvent extends CustomFieldDefEvent {
  
}
export interface CustomFieldDefRenamedEvent extends CustomFieldDefEvent {
  newName: string;
}
export interface DVPortgroupCreatedEvent extends DVPortgroupEvent {
  
}
export interface DVPortgroupDestroyedEvent extends DVPortgroupEvent {
  
}
export interface DatacenterCreatedEvent extends DatacenterEvent {
  parent: FolderEventArgument;
}
export interface DatacenterEventArgument extends EntityEventArgument {
  datacenter: Datacenter;
}
export interface DatastoreCapacityIncreasedEvent extends DatastoreEvent {
  oldCapacity: number;
  newCapacity: number;
}
export interface DatastoreDestroyedEvent extends DatastoreEvent {
  
}
export interface DatastoreDuplicatedEvent extends DatastoreEvent {
  
}
export interface DatastoreEventArgument extends EntityEventArgument {
  datastore: Datastore;
}
export interface DatastoreFileCopiedEvent extends DatastoreFileEvent {
  sourceDatastore: DatastoreEventArgument;
  sourceFile: string;
}
export interface DatastoreFileDeletedEvent extends DatastoreFileEvent {
  
}
export interface DrsEnteredStandbyModeEvent extends EnteredStandbyModeEvent {
  
}
export interface DrsEnteringStandbyModeEvent extends EnteringStandbyModeEvent {
  
}
export interface DrsExitStandbyModeFailedEvent extends ExitStandbyModeFailedEvent {
  
}
export interface DrsExitedStandbyModeEvent extends ExitedStandbyModeEvent {
  
}
export interface DrsExitingStandbyModeEvent extends ExitingStandbyModeEvent {
  
}
export interface DvsCreatedEvent extends DvsEvent {
  parent: FolderEventArgument;
}
export interface DvsDestroyedEvent extends DvsEvent {
  
}
export interface DvsEventArgument extends EntityEventArgument {
  dvs: DistributedVirtualSwitch;
}
export interface DvsReconfiguredEvent extends DvsEvent {
  configSpec: DVSConfigSpec;
  configChanges?: ChangesInfoEventArgument;
}
export interface MigrationErrorEvent extends MigrationEvent {
  
}
export interface PermissionAddedEvent extends PermissionEvent {
  role: RoleEventArgument;
  propagate: boolean;
}
export interface RoleAddedEvent extends RoleEvent {
  privilegeList?: string[];
}
export interface VmBeingClonedEvent extends VmCloneEvent {
  destFolder: FolderEventArgument;
  destName: string;
  destHost: HostEventArgument;
}
export interface VmBeingClonedNoFolderEvent extends VmCloneEvent {
  destName: string;
  destHost: HostEventArgument;
}
export interface ActiveVMsBlockingEVC extends EVCConfigFault {
  evcMode?: string;
  host?: HostSystem[];
  hostName?: string[];
}
export interface AdminDisabled extends HostConfigFault {
  
}
export interface AdminNotDisabled extends HostConfigFault {
  
}
export interface AffinityConfigured extends MigrationFault {
  configuredAffinity: string[];
}
export interface AgentInstallFailed extends HostConnectFault {
  reason?: string;
  statusCode?: number;
  installerOutput?: string;
}
export interface AlreadyBeingManaged extends HostConnectFault {
  ipAddress: string;
}
export interface AlreadyConnected extends HostConnectFault {
  name: string;
}
export interface ApplicationQuiesceFault extends SnapshotFault {
  
}
export interface BackupBlobReadFailure extends DvsFault {
  entityName: string;
  entityType: string;
  fault: MethodFault;
}
export interface BackupBlobWriteFailure extends DvsFault {
  entityName: string;
  entityType: string;
  fault: MethodFault;
}
export interface BlockedByFirewall extends HostConfigFault {
  
}
export interface CAMServerRefusedConnection extends InvalidCAMServer {
  
}
export interface CannotAccessFile extends FileFault {
  
}
export interface CannotAccessNetwork extends CannotAccessVmDevice {
  network?: Network;
}
export interface CannotAddHostWithFTVmAsStandalone extends HostConnectFault {
  
}
export interface CannotAddHostWithFTVmToDifferentCluster extends HostConnectFault {
  
}
export interface CannotAddHostWithFTVmToNonHACluster extends HostConnectFault {
  
}
export interface CannotCreateFile extends FileFault {
  
}
export interface CannotDecryptPasswords extends CustomizationFault {
  
}
export interface CannotDeleteFile extends FileFault {
  
}
export interface CannotModifyConfigCpuRequirements extends MigrationFault {
  
}
export interface CannotMoveVmWithDeltaDisk extends MigrationFault {
  device: string;
}
export interface CannotMoveVmWithNativeDeltaDisk extends MigrationFault {
  
}
export interface CannotPowerOffVmInCluster extends InvalidState {
  operation: string;
  vm: VirtualMachine;
  vmName: string;
}
export interface ClockSkew extends HostConfigFault {
  
}
export interface CloneFromSnapshotNotSupported extends MigrationFault {
  
}
export interface CollectorAddressUnset extends DvsFault {
  
}
export interface ConflictingConfiguration extends DvsFault {
  configInConflict: ConflictingConfigurationConfig[];
}
export interface ConflictingConfigurationConfig extends DynamicData {
  entity?: ManagedEntity;
  propertyPath: string;
}
export interface CpuIncompatible extends VirtualHardwareCompatibilityIssue {
  level: number;
  registerName: string;
  registerBits?: string;
  desiredBits?: string;
  host?: HostSystem;
}
export interface CpuIncompatible1ECX extends CpuIncompatible {
  sse3: boolean;
  pclmulqdq: boolean;
  ssse3: boolean;
  sse41: boolean;
  sse42: boolean;
  aes: boolean;
  other: boolean;
  otherOnly: boolean;
}
export interface CpuIncompatible81EDX extends CpuIncompatible {
  nx: boolean;
  ffxsr: boolean;
  rdtscp: boolean;
  lm: boolean;
  other: boolean;
  otherOnly: boolean;
}
export interface DatacenterMismatch extends MigrationFault {
  invalidArgument: DatacenterMismatchArgument[];
  expectedDatacenter: Datacenter;
}
export interface DatacenterMismatchArgument extends DynamicData {
  entity: ManagedEntity;
  inputDatacenter?: Datacenter;
}
export interface DatastoreNotWritableOnHost extends InvalidDatastore {
  host: HostSystem;
}
export interface DestinationSwitchFull extends CannotAccessNetwork {
  
}
export interface DeviceNotSupported extends VirtualHardwareCompatibilityIssue {
  device: string;
  reason?: string;
}
export interface DigestNotSupported extends DeviceNotSupported {
  
}
export interface DirectoryNotEmpty extends FileFault {
  
}
export interface DisableAdminNotSupported extends HostConfigFault {
  
}
export interface DisallowedMigrationDeviceAttached extends MigrationFault {
  fault: MethodFault;
}
export interface DisconnectedHostsBlockingEVC extends EVCConfigFault {
  
}
export interface DiskHasPartitions extends VsanDiskFault {
  
}
export interface DiskIsLastRemainingNonSSD extends VsanDiskFault {
  
}
export interface DiskIsNonLocal extends VsanDiskFault {
  
}
export interface DiskIsUSB extends VsanDiskFault {
  
}
export interface DiskMoveTypeNotSupported extends MigrationFault {
  
}
export interface DiskNotSupported extends VirtualHardwareCompatibilityIssue {
  disk: number;
}
export interface DiskTooSmall extends VsanDiskFault {
  
}
export interface DrsVmotionIncompatibleFault extends VirtualHardwareCompatibilityIssue {
  host: HostSystem;
}
export interface DuplicateDisks extends VsanDiskFault {
  
}
export interface DvsApplyOperationFault extends DvsFault {
  objectFault: DvsApplyOperationFaultFaultOnObject[];
}
export interface DvsApplyOperationFaultFaultOnObject extends DynamicData {
  objectId: string;
  type: string;
  fault: MethodFault;
}
export interface EVCAdmissionFailed extends NotSupportedHostInCluster {
  faults?: MethodFault[];
}
export interface EVCAdmissionFailedCPUFeaturesForMode extends EVCAdmissionFailed {
  currentEVCModeKey: string;
}
export interface EVCAdmissionFailedCPUModel extends EVCAdmissionFailed {
  
}
export interface EVCAdmissionFailedCPUModelForMode extends EVCAdmissionFailed {
  currentEVCModeKey: string;
}
export interface EVCAdmissionFailedCPUVendor extends EVCAdmissionFailed {
  clusterCPUVendor: string;
  hostCPUVendor: string;
}
export interface EVCAdmissionFailedCPUVendorUnknown extends EVCAdmissionFailed {
  
}
export interface EVCAdmissionFailedHostDisconnected extends EVCAdmissionFailed {
  
}
export interface EVCAdmissionFailedHostSoftware extends EVCAdmissionFailed {
  
}
export interface EVCAdmissionFailedHostSoftwareForMode extends EVCAdmissionFailed {
  
}
export interface EVCAdmissionFailedVmActive extends EVCAdmissionFailed {
  
}
export interface EncryptionKeyRequired extends InvalidState {
  requiredKey?: CryptoKeyId[];
}
export interface FailToEnableSPBM extends NotEnoughLicenses {
  cs: ComputeResource;
  csName: string;
  hostLicenseStates: ComputeResourceHostSPBMLicenseInfo[];
}
export interface FaultToleranceAntiAffinityViolated extends MigrationFault {
  hostName: string;
  host: HostSystem;
}
export interface FaultToleranceCpuIncompatible extends CpuIncompatible {
  model: boolean;
  family: boolean;
  stepping: boolean;
}
export interface FaultToleranceNeedsThickDisk extends MigrationFault {
  vmName: string;
}
export interface FaultToleranceNotSameBuild extends MigrationFault {
  build: string;
}
export interface FeatureRequirementsNotMet extends VirtualHardwareCompatibilityIssue {
  featureRequirement?: VirtualMachineFeatureRequirement[];
  vm?: VirtualMachine;
  host?: HostSystem;
}
export interface FileAlreadyExists extends FileFault {
  
}
export interface FileBackedPortNotSupported extends DeviceNotSupported {
  
}
export interface FilesystemQuiesceFault extends SnapshotFault {
  
}
export interface FilterInUse extends ResourceInUse {
  disk?: VirtualDiskId[];
}
export interface FullStorageVMotionNotSupported extends MigrationFeatureNotSupported {
  
}
export interface GatewayConnectFault extends HostConnectFault {
  gatewayType: string;
  gatewayId: string;
  gatewayInfo: string;
  details?: LocalizableMessage;
}
export interface GatewayNotFound extends GatewayConnectFault {
  
}
export interface GatewayNotReachable extends GatewayConnectFault {
  
}
export interface GatewayOperationRefused extends GatewayConnectFault {
  
}
export interface GatewayToHostConnectFault extends GatewayConnectFault {
  hostname: string;
  port?: number;
}
export interface GatewayToHostTrustVerifyFault extends GatewayToHostConnectFault {
  verificationToken: string;
  propertiesToVerify: KeyValue[];
}
export interface GuestAuthenticationChallenge extends GuestOperationsFault {
  serverChallenge: GuestAuthentication;
  sessionID: number;
}
export interface GuestComponentsOutOfDate extends GuestOperationsFault {
  
}
export interface GuestMultipleMappings extends GuestOperationsFault {
  
}
export interface GuestRegistryKeyAlreadyExists extends GuestRegistryKeyFault {
  
}
export interface HAErrorsAtDest extends MigrationFault {
  
}
export interface HostConfigFailed extends HostConfigFault {
  failure: MethodFault[];
}
export interface HotSnapshotMoveNotSupported extends SnapshotCopyNotSupported {
  
}
export interface IDEDiskNotSupported extends DiskNotSupported {
  
}
export interface InaccessibleDatastore extends InvalidDatastore {
  detail?: string;
}
export interface InaccessibleFTMetadataDatastore extends InaccessibleDatastore {
  
}
export interface IncompatibleDefaultDevice extends MigrationFault {
  device: string;
}
export interface IncompatibleHostForVmReplication extends ReplicationFault {
  vmName: string;
  hostName: string;
  reason: string;
}
export interface IndependentDiskVMotionNotSupported extends MigrationFeatureNotSupported {
  
}
export interface InsufficientAgentVmsDeployed extends InsufficientResourcesFault {
  hostName: string;
  requiredNumAgentVms: number;
  currentNumAgentVms: number;
}
export interface InsufficientCpuResourcesFault extends InsufficientResourcesFault {
  unreserved: number;
  requested: number;
}
export interface InsufficientDisks extends VsanDiskFault {
  
}
export interface InsufficientFailoverResourcesFault extends InsufficientResourcesFault {
  
}
export interface InsufficientGraphicsResourcesFault extends InsufficientResourcesFault {
  
}
export interface InsufficientHostCapacityFault extends InsufficientResourcesFault {
  host?: HostSystem;
}
export interface InsufficientHostCpuCapacityFault extends InsufficientHostCapacityFault {
  unreserved: number;
  requested: number;
}
export interface InsufficientHostMemoryCapacityFault extends InsufficientHostCapacityFault {
  unreserved: number;
  requested: number;
}
export interface InsufficientMemoryResourcesFault extends InsufficientResourcesFault {
  unreserved: number;
  requested: number;
}
export interface InsufficientNetworkCapacity extends InsufficientResourcesFault {
  
}
export interface InsufficientNetworkResourcePoolCapacity extends InsufficientResourcesFault {
  dvsName: string;
  dvsUuid: string;
  resourcePoolKey: string;
  available: number;
  requested: number;
  device: string[];
}
export interface InsufficientPerCpuCapacity extends InsufficientHostCapacityFault {
  
}
export interface InsufficientStandbyCpuResource extends InsufficientStandbyResource {
  available: number;
  requested: number;
}
export interface InsufficientStandbyMemoryResource extends InsufficientStandbyResource {
  available: number;
  requested: number;
}
export interface InvalidBundle extends PlatformConfigFault {
  
}
export interface InvalidCAMCertificate extends InvalidCAMServer {
  
}
export interface InvalidClientCertificate extends InvalidLogin {
  
}
export interface InvalidDatastoreState extends InvalidState {
  datastoreName?: string;
}
export interface InvalidDeviceSpec extends InvalidVmConfig {
  deviceIndex: number;
}
export interface InvalidDiskFormat extends InvalidFormat {
  
}
export interface InvalidHostState extends InvalidState {
  host?: HostSystem;
}
export interface InvalidNasCredentials extends NasConfigFault {
  userName: string;
}
export interface InvalidNetworkInType extends VAppPropertyFault {
  
}
export interface InvalidNetworkResource extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
}
export interface InvalidPowerState extends InvalidState {
  requestedState?: VirtualMachinePowerState;
  existingState: VirtualMachinePowerState;
}
export interface InvalidPropertyType extends VAppPropertyFault {
  
}
export interface InvalidPropertyValue extends VAppPropertyFault {
  
}
export interface LargeRDMConversionNotSupported extends MigrationFault {
  device: string;
}
export interface LegacyNetworkInterfaceInUse extends CannotAccessNetwork {
  
}
export interface MaintenanceModeFileMove extends MigrationFault {
  
}
export interface MemoryFileFormatNotSupportedByDatastore extends UnsupportedDatastore {
  datastoreName: string;
  type: string;
}
export interface MemorySizeNotRecommended extends VirtualHardwareCompatibilityIssue {
  memorySizeMB: number;
  minMemorySizeMB: number;
  maxMemorySizeMB: number;
}
export interface MemorySizeNotSupported extends VirtualHardwareCompatibilityIssue {
  memorySizeMB: number;
  minMemorySizeMB: number;
  maxMemorySizeMB: number;
}
export interface MemorySizeNotSupportedByDatastore extends VirtualHardwareCompatibilityIssue {
  datastore: Datastore;
  memorySizeMB: number;
  maxMemorySizeMB: number;
}
export interface MemorySnapshotOnIndependentDisk extends SnapshotFault {
  
}
export interface MigrationDisabled extends MigrationFault {
  
}
export interface MissingController extends InvalidDeviceSpec {
  
}
export interface MissingIpPool extends VAppPropertyFault {
  
}
export interface MissingNetworkIpConfig extends VAppPropertyFault {
  
}
export interface MissingPowerOffConfiguration extends VAppConfigFault {
  
}
export interface MissingPowerOnConfiguration extends VAppConfigFault {
  
}
export interface MultiWriterNotSupported extends DeviceNotSupported {
  
}
export interface MultipleSnapshotsNotSupported extends SnapshotFault {
  
}
export interface NoAvailableIp extends VAppPropertyFault {
  network: Network;
}
export interface NoVcManagedIpConfigured extends VAppPropertyFault {
  
}
export interface NoVmInVApp extends VAppConfigFault {
  
}
export interface NonPersistentDisksNotSupported extends DeviceNotSupported {
  
}
export interface NonVmwareOuiMacNotSupportedHost extends NotSupportedHost {
  hostName: string;
}
export interface NotEnoughCpus extends VirtualHardwareCompatibilityIssue {
  numCpuDest: number;
  numCpuVm: number;
}
export interface NotEnoughLogicalCpus extends NotEnoughCpus {
  host?: HostSystem;
}
export interface NotUserConfigurableProperty extends VAppPropertyFault {
  
}
export interface NumVirtualCoresPerSocketNotSupported extends VirtualHardwareCompatibilityIssue {
  maxSupportedCoresPerSocketDest: number;
  numCoresPerSocketVm: number;
}
export interface NumVirtualCpusNotSupported extends VirtualHardwareCompatibilityIssue {
  maxSupportedVcpusDest: number;
  numCpuVm: number;
}
export interface OvfAttribute extends OvfInvalidPackage {
  elementName: string;
  attributeName: string;
}
export interface OvfConstraint extends OvfInvalidPackage {
  name: string;
}
export interface OvfConsumerCallbackFault extends OvfFault {
  extensionKey: string;
  extensionName: string;
}
export interface OvfConsumerCommunicationError extends OvfConsumerCallbackFault {
  description: string;
}
export interface OvfConsumerFault extends OvfConsumerCallbackFault {
  errorKey: string;
  message: string;
  params?: KeyValue[];
}
export interface OvfConsumerInvalidSection extends OvfConsumerCallbackFault {
  lineNumber: number;
  description: string;
}
export interface OvfConsumerUndeclaredSection extends OvfConsumerCallbackFault {
  qualifiedSectionType: string;
}
export interface OvfConsumerUndefinedPrefix extends OvfConsumerCallbackFault {
  prefix: string;
}
export interface OvfCpuCompatibility extends OvfImport {
  registerName: string;
  level: number;
  registerValue: string;
  desiredRegisterValue: string;
}
export interface OvfCpuCompatibilityCheckNotSupported extends OvfImport {
  
}
export interface OvfDiskMappingNotFound extends OvfSystemFault {
  diskName: string;
  vmName: string;
}
export interface OvfDiskOrderConstraint extends OvfConstraint {
  
}
export interface OvfElement extends OvfInvalidPackage {
  name: string;
}
export interface OvfElementInvalidValue extends OvfElement {
  value: string;
}
export interface OvfExport extends OvfFault {
  
}
export interface OvfExportFailed extends OvfExport {
  
}
export interface OvfHardwareCheck extends OvfImport {
  
}
export interface OvfHardwareExport extends OvfExport {
  device?: VirtualDevice;
  vmPath: string;
}
export interface OvfHostResourceConstraint extends OvfConstraint {
  value: string;
}
export interface OvfHostValueNotParsed extends OvfSystemFault {
  property: string;
  value: string;
}
export interface OvfInternalError extends OvfSystemFault {
  
}
export interface OvfInvalidValue extends OvfAttribute {
  value: string;
}
export interface OvfInvalidValueConfiguration extends OvfInvalidValue {
  
}
export interface OvfInvalidValueEmpty extends OvfInvalidValue {
  
}
export interface OvfInvalidValueFormatMalformed extends OvfInvalidValue {
  
}
export interface OvfInvalidValueReference extends OvfInvalidValue {
  
}
export interface OvfInvalidVmName extends OvfUnsupportedPackage {
  name: string;
}
export interface OvfMissingAttribute extends OvfAttribute {
  
}
export interface OvfMissingElement extends OvfElement {
  
}
export interface OvfMissingElementNormalBoundary extends OvfMissingElement {
  boundary: string;
}
export interface OvfNoHostNic extends OvfUnsupportedPackage {
  
}
export interface OvfNoSupportedHardwareFamily extends OvfUnsupportedPackage {
  version: string;
}
export interface OvfPropertyExport extends OvfExport {
  type: string;
  value: string;
}
export interface OvfPropertyNetworkExport extends OvfExport {
  network: string;
}
export interface OvfUnableToExportDisk extends OvfHardwareExport {
  diskName: string;
}
export interface OvfUnexpectedElement extends OvfElement {
  
}
export interface OvfUnknownDeviceBacking extends OvfHardwareExport {
  backing: VirtualDeviceBackingInfo;
}
export interface OvfUnsupportedAttribute extends OvfUnsupportedPackage {
  elementName: string;
  attributeName: string;
}
export interface OvfUnsupportedAttributeValue extends OvfUnsupportedAttribute {
  value: string;
}
export interface OvfUnsupportedDeviceExport extends OvfHardwareExport {
  
}
export interface OvfUnsupportedElement extends OvfUnsupportedPackage {
  name: string;
}
export interface OvfUnsupportedElementValue extends OvfUnsupportedElement {
  value: string;
}
export interface OvfUnsupportedSection extends OvfUnsupportedElement {
  info: string;
}
export interface OvfWrongElement extends OvfElement {
  
}
export interface PatchAlreadyInstalled extends PatchNotApplicable {
  
}
export interface PatchInstallFailed extends PlatformConfigFault {
  rolledBack: boolean;
}
export interface PatchIntegrityError extends PlatformConfigFault {
  
}
export interface PatchMetadataCorrupted extends PatchMetadataInvalid {
  
}
export interface PatchMissingDependencies extends PatchNotApplicable {
  prerequisitePatch?: string[];
  prerequisiteLib?: string[];
}
export interface PowerOnFtSecondaryTimedout extends Timedout {
  vm: VirtualMachine;
  vmName: string;
  timeout: number;
}
export interface QuiesceDatastoreIOForHAFailed extends ResourceInUse {
  host: HostSystem;
  hostName: string;
  ds: Datastore;
  dsName: string;
}
export interface RDMNotSupported extends DeviceNotSupported {
  
}
export interface RawDiskNotSupported extends DeviceNotSupported {
  
}
export interface RemoteDeviceNotSupported extends DeviceNotSupported {
  
}
export interface ReplicationConfigFault extends ReplicationFault {
  
}
export interface ReplicationDiskConfigFault extends ReplicationConfigFault {
  reason?: string;
  vmRef?: VirtualMachine;
  key?: number;
}
export interface ReplicationVmConfigFault extends ReplicationConfigFault {
  reason?: string;
  vmRef?: VirtualMachine;
}
export interface SharedBusControllerNotSupported extends DeviceNotSupported {
  
}
export interface SnapshotCloneNotSupported extends SnapshotCopyNotSupported {
  
}
export interface SnapshotDisabled extends SnapshotFault {
  
}
export interface StorageVmotionIncompatible extends VirtualHardwareCompatibilityIssue {
  datastore?: Datastore;
}
export interface SwapDatastoreNotWritableOnHost extends DatastoreNotWritableOnHost {
  
}
export interface UnSupportedDatastoreForVFlash extends UnsupportedDatastore {
  datastoreName: string;
  type: string;
}
export interface UnconfiguredPropertyValue extends InvalidPropertyValue {
  
}
export interface VMINotSupported extends DeviceNotSupported {
  
}
export interface VMOnConflictDVPort extends CannotAccessNetwork {
  
}
export interface VMOnVirtualIntranet extends CannotAccessNetwork {
  
}
export interface VirtualDiskModeNotSupported extends DeviceNotSupported {
  mode: string;
}
export interface VirtualEthernetCardNotSupported extends DeviceNotSupported {
  
}
export interface VmfsAlreadyMounted extends VmfsMountFault {
  
}
export interface VmfsAmbiguousMount extends VmfsMountFault {
  
}
export interface HostConfigInfo extends DynamicData {
  host: HostSystem;
  product: AboutInfo;
  deploymentInfo?: HostDeploymentInfo;
  hyperThread?: HostHyperThreadScheduleInfo;
  consoleReservation?: ServiceConsoleReservationInfo;
  virtualMachineReservation?: VirtualMachineMemoryReservationInfo;
  storageDevice?: HostStorageDeviceInfo;
  multipathState?: HostMultipathStateInfo;
  fileSystemVolume?: HostFileSystemVolumeInfo;
  systemFile?: string[];
  network?: HostNetworkInfo;
  vmotion?: HostVMotionInfo;
  virtualNicManagerInfo?: HostVirtualNicManagerInfo;
  capabilities?: HostNetCapabilities;
  datastoreCapabilities?: HostDatastoreSystemCapabilities;
  offloadCapabilities?: HostNetOffloadCapabilities;
  service?: HostServiceInfo;
  firewall?: HostFirewallInfo;
  autoStart?: HostAutoStartManagerConfig;
  activeDiagnosticPartition?: HostDiagnosticPartition;
  option?: OptionValue[];
  optionDef?: OptionDef[];
  datastorePrincipal?: string;
  localSwapDatastore?: Datastore;
  systemSwapConfiguration?: HostSystemSwapConfiguration;
  systemResources?: HostSystemResourceInfo;
  dateTimeInfo?: HostDateTimeInfo;
  flags?: HostFlagInfo;
  adminDisabled?: boolean;
  lockdownMode?: HostLockdownMode;
  ipmi?: HostIpmiInfo;
  sslThumbprintInfo?: HostSslThumbprintInfo;
  sslThumbprintData?: HostSslThumbprintInfo[];
  certificate?: number[];
  pciPassthruInfo?: HostPciPassthruInfo[];
  authenticationManagerInfo?: HostAuthenticationManagerInfo;
  featureVersion?: HostFeatureVersionInfo[];
  powerSystemCapability?: PowerSystemCapability;
  powerSystemInfo?: PowerSystemInfo;
  cacheConfigurationInfo?: HostCacheConfigurationInfo[];
  wakeOnLanCapable?: boolean;
  featureCapability?: HostFeatureCapability[];
  maskedFeatureCapability?: HostFeatureCapability[];
  vFlashConfigInfo?: HostVFlashManagerVFlashConfigInfo;
  vsanHostConfig?: VsanHostConfigInfo;
  domainList?: string[];
  scriptCheckSum?: Buffer;
  hostConfigCheckSum?: Buffer;
  descriptionTreeCheckSum?: Buffer;
  graphicsInfo?: HostGraphicsInfo[];
  sharedPassthruGpuTypes?: string[];
  graphicsConfig?: HostGraphicsConfig;
  sharedGpuCapabilities?: HostSharedGpuCapabilities[];
  ioFilterInfo?: HostIoFilterInfo[];
  sriovDevicePool?: HostSriovDevicePoolInfo[];
  assignableHardwareBinding?: HostAssignableHardwareBinding[];
  assignableHardwareConfig?: HostAssignableHardwareConfig;
}
export interface HostConnectInfo extends DynamicData {
  serverIp?: string;
  inDasCluster?: boolean;
  host: HostListSummary;
  vm?: VirtualMachineSummary[];
  vimAccountNameRequired?: boolean;
  clusterSupported?: boolean;
  network?: HostConnectInfoNetworkInfo[];
  datastore?: HostDatastoreConnectInfo[];
  license?: HostLicenseConnectInfo;
  capability?: HostCapability;
}
export interface HostDatastoreExistsConnectInfo extends HostDatastoreConnectInfo {
  newDatastoreName: string;
}
export interface HostDatastoreConnectInfo extends DynamicData {
  summary: DatastoreSummary;
}
export interface HostDatastoreNameConflictConnectInfo extends HostDatastoreConnectInfo {
  newDatastoreName: string;
}
export interface HostLicenseConnectInfo extends DynamicData {
  license: LicenseManagerLicenseInfo;
  evaluation: LicenseManagerEvaluationInfo;
  resource?: HostLicensableResourceInfo;
}
export interface HostConnectInfoNetworkInfo extends DynamicData {
  summary: NetworkSummary;
}
export interface HostNewNetworkConnectInfo extends HostConnectInfoNetworkInfo {
  
}
export interface HostDiagnosticPartition extends DynamicData {
  storageType: string;
  diagnosticType: string;
  slots: number;
  id: HostScsiDiskPartition;
}
export interface HostDiagnosticPartitionCreateDescription extends DynamicData {
  layout: HostDiskPartitionLayout;
  diskUuid: string;
  spec: HostDiagnosticPartitionCreateSpec;
}
export interface HostDiagnosticPartitionCreateOption extends DynamicData {
  storageType: string;
  diagnosticType: string;
  disk: HostScsiDisk;
}
export interface HostDiagnosticPartitionCreateSpec extends DynamicData {
  storageType: string;
  diagnosticType: string;
  id: HostScsiDiskPartition;
  partition: HostDiskPartitionSpec;
  active?: boolean;
}
export interface HostFibreChannelOverEthernetTargetTransport extends HostFibreChannelTargetTransport {
  vnportMac: string;
  fcfMac: string;
  vlanId: number;
}
export interface LocalDatastoreInfo extends DatastoreInfo {
  path?: string;
}
export interface NasDatastoreInfo extends DatastoreInfo {
  nas?: HostNasVolume;
}
export interface PMemDatastoreInfo extends DatastoreInfo {
  pmem: HostPMemVolume;
}
export interface HostRuntimeInfo extends DynamicData {
  connectionState: HostSystemConnectionState;
  powerState: HostSystemPowerState;
  standbyMode?: string;
  inMaintenanceMode: boolean;
  inQuarantineMode?: boolean;
  bootTime?: Date;
  healthSystemRuntime?: HealthSystemRuntime;
  dasHostState?: ClusterDasFdmHostState;
  tpmPcrValues?: HostTpmDigestInfo[];
  vsanRuntimeInfo?: VsanHostRuntimeInfo;
  networkRuntimeInfo?: HostRuntimeInfoNetworkRuntimeInfo;
  vFlashResourceRuntimeInfo?: HostVFlashManagerVFlashResourceRunTimeInfo;
  hostMaxVirtualDiskCapacity?: number;
  cryptoState?: string;
  cryptoKeyId?: CryptoKeyId;
}
export interface HostRuntimeInfoNetStackInstanceRuntimeInfo extends DynamicData {
  netStackInstanceKey: string;
  state?: string;
  vmknicKeys?: string[];
  maxNumberOfConnections?: number;
  currentIpV6Enabled?: boolean;
}
export interface HostNetworkResourceRuntime extends DynamicData {
  pnicResourceInfo: HostPnicNetworkResourceInfo[];
}
export interface HostRuntimeInfoNetworkRuntimeInfo extends DynamicData {
  netStackInstanceRuntimeInfo?: HostRuntimeInfoNetStackInstanceRuntimeInfo[];
  networkResourceRuntime?: HostNetworkResourceRuntime;
}
export interface HostPlacedVirtualNicIdentifier extends DynamicData {
  vm: VirtualMachine;
  vnicKey: string;
  reservation?: number;
}
export interface HostPnicNetworkResourceInfo extends DynamicData {
  pnicDevice: string;
  availableBandwidthForVMTraffic?: number;
  unusedBandwidthForVMTraffic?: number;
  placedVirtualNics?: HostPlacedVirtualNicIdentifier[];
}
export interface HostStorageSystemDiskLocatorLedResult extends DynamicData {
  key: string;
  fault: MethodFault;
}
export interface HostStorageSystemScsiLunResult extends DynamicData {
  key: string;
  fault?: MethodFault;
}
export interface HostStorageSystemVmfsVolumeResult extends DynamicData {
  key: string;
  fault?: MethodFault;
}
export interface HostVMotionManagerDstInstantCloneResult extends DynamicData {
  dstVmId?: number;
  startTime?: number;
  cptLoadTime?: number;
  cptLoadDoneTime?: number;
  replicateMemDoneTime?: number;
  endTime?: number;
  cptXferTime?: number;
  cptCacheUsed?: number;
  devCptStreamSize?: number;
  devCptStreamTime?: number;
}
export interface HostVMotionManagerSrcInstantCloneResult extends DynamicData {
  startTime?: number;
  quiesceTime?: number;
  quiesceDoneTime?: number;
  resumeDoneTime?: number;
  endTime?: number;
}
export interface VmfsDatastoreCreateSpec extends VmfsDatastoreSpec {
  partition: HostDiskPartitionSpec;
  vmfs: HostVmfsSpec;
  extent?: HostScsiDiskPartition[];
}
export interface VmfsDatastoreInfo extends DatastoreInfo {
  maxPhysicalRDMFileSize: number;
  maxVirtualRDMFileSize: number;
  vmfs?: HostVmfsVolume;
}
export interface VsanDatastoreInfo extends DatastoreInfo {
  membershipUuid?: string;
  accessGenNo?: number;
}
export interface VvolDatastoreInfo extends DatastoreInfo {
  vvolDS?: HostVvolVolume;
}
export interface HourlyTaskScheduler extends RecurrentTaskScheduler {
  minute: number;
}
export interface VirtualMachineDatastoreInfo extends VirtualMachineTargetInfo {
  datastore: DatastoreSummary;
  capability: DatastoreCapability;
  maxFileSize: number;
  maxVirtualDiskCapacity?: number;
  maxPhysicalRDMFileSize?: number;
  maxVirtualRDMFileSize?: number;
  mode: string;
  vStorageSupport?: string;
}
export interface ParaVirtualSCSIController extends VirtualSCSIController {
  
}
export interface ParaVirtualSCSIControllerOption extends VirtualSCSIControllerOption {
  
}
export interface VirtualAHCIController extends VirtualSATAController {
  
}
export interface VirtualAHCIControllerOption extends VirtualSATAControllerOption {
  
}
export interface VirtualBusLogicController extends VirtualSCSIController {
  
}
export interface VirtualBusLogicControllerOption extends VirtualSCSIControllerOption {
  
}
export interface VirtualLsiLogicController extends VirtualSCSIController {
  
}
export interface VirtualLsiLogicControllerOption extends VirtualSCSIControllerOption {
  
}
export interface VirtualLsiLogicSASController extends VirtualSCSIController {
  
}
export interface VirtualLsiLogicSASControllerOption extends VirtualSCSIControllerOption {
  
}
export interface ClusterComputeResourceClusterConfigResult extends DynamicData {
  failedHosts?: FolderFailedHostResult[];
  configuredHosts?: HostSystem[];
}
export interface ClusterComputeResourceDVSConfigurationValidation extends ClusterComputeResourceValidationResultBase {
  isDvsValid: boolean;
  isDvpgValid: boolean;
}
export interface ClusterComputeResourceDVSSetting extends DynamicData {
  dvSwitch: DistributedVirtualSwitch;
  pnicDevices?: string[];
  dvPortgroupSetting?: ClusterComputeResourceDVSSettingDVPortgroupToServiceMapping[];
}
export interface ClusterComputeResourceDVSSettingDVPortgroupToServiceMapping extends DynamicData {
  dvPortgroup: DistributedVirtualPortgroup;
  service: string;
}
export interface ClusterComputeResourceDvsProfile extends DynamicData {
  dvsName?: string;
  dvSwitch?: DistributedVirtualSwitch;
  pnicDevices?: string[];
  dvPortgroupMapping?: ClusterComputeResourceDvsProfileDVPortgroupSpecToServiceMapping[];
}
export interface ClusterComputeResourceDvsProfileDVPortgroupSpecToServiceMapping extends DynamicData {
  dvPortgroupSpec?: DVPortgroupConfigSpec;
  dvPortgroup?: DistributedVirtualPortgroup;
  service: string;
}
export interface ClusterComputeResourceHCIConfigInfo extends DynamicData {
  workflowState: string;
  dvsSetting?: ClusterComputeResourceDVSSetting[];
  configuredHosts?: HostSystem[];
  hostConfigProfile?: ClusterComputeResourceHostConfigurationProfile;
}
export interface ClusterComputeResourceHCIConfigSpec extends DynamicData {
  dvsProf?: ClusterComputeResourceDvsProfile[];
  hostConfigProfile?: ClusterComputeResourceHostConfigurationProfile;
  vSanConfigSpec?: SDDCBase;
  vcProf?: ClusterComputeResourceVCProfile;
}
export interface ClusterComputeResourceHostConfigurationInput extends DynamicData {
  host: HostSystem;
  hostVmkNics?: ClusterComputeResourceHostVmkNicInfo[];
  allowedInNonMaintenanceMode?: boolean;
}
export interface ClusterComputeResourceHostConfigurationProfile extends DynamicData {
  dateTimeConfig?: HostDateTimeConfig;
  lockdownMode?: HostLockdownMode;
}
export interface ClusterComputeResourceHostConfigurationValidation extends ClusterComputeResourceValidationResultBase {
  host: HostSystem;
  isDvsSettingValid?: boolean;
  isVmknicSettingValid?: boolean;
  isNtpSettingValid?: boolean;
  isLockdownModeValid?: boolean;
}
export interface ClusterComputeResourceHostVmkNicInfo extends DynamicData {
  nicSpec: HostVirtualNicSpec;
  service: string;
}
export interface ClusterComputeResourceSummary extends ComputeResourceSummary {
  currentFailoverLevel: number;
  admissionControlInfo?: ClusterDasAdmissionControlInfo;
  numVmotions: number;
  targetBalance?: number;
  currentBalance?: number;
  drsScore?: number;
  numVmsPerDrsScoreBucket?: number[];
  usageSummary?: ClusterUsageSummary;
  currentEVCModeKey?: string;
  currentEVCGraphicsModeKey?: string;
  dasData?: ClusterDasData;
  clusterMaintenanceModeStatus?: string;
}
export interface ClusterComputeResourceVCProfile extends DynamicData {
  clusterSpec?: ClusterConfigSpecEx;
  evcModeKey?: string;
  evcGraphicsModeKey?: string;
}
export interface ClusterComputeResourceValidationResultBase extends DynamicData {
  info?: LocalizableMessage[];
}
export interface CustomFieldDefAddedEvent extends CustomFieldDefEvent {
  
}
export interface ConnectedIso extends OvfExport {
  cdrom: VirtualCdrom;
  filename: string;
}
export interface CpuCompatibilityUnknown extends CpuIncompatible {
  
}
export interface DeviceBackingNotSupported extends DeviceNotSupported {
  backing: string;
}
export interface DeviceControllerNotSupported extends DeviceNotSupported {
  controller: string;
}
export interface DeviceHotPlugNotSupported extends InvalidDeviceSpec {
  
}
export interface DeviceNotFound extends InvalidDeviceSpec {
  
}
export interface DeviceUnsupportedForVmPlatform extends InvalidDeviceSpec {
  
}
export interface DeviceUnsupportedForVmVersion extends InvalidDeviceSpec {
  currentVersion: string;
  expectedVersion: string;
}
export interface DisallowedDiskModeChange extends InvalidDeviceSpec {
  
}
export interface GatewayHostNotReachable extends GatewayToHostConnectFault {
  
}
export interface GatewayToHostAuthFault extends GatewayToHostConnectFault {
  invalidProperties: string[];
  missingProperties: string[];
}
export interface InvalidController extends InvalidDeviceSpec {
  controllerKey: number;
}
export interface InvalidDeviceBacking extends InvalidDeviceSpec {
  
}
export interface InvalidDeviceOperation extends InvalidDeviceSpec {
  badOp?: VirtualDeviceConfigSpecOperation;
  badFileOp?: VirtualDeviceConfigSpecFileOperation;
}
export interface InvalidHostConnectionState extends InvalidHostState {
  
}
export interface OvfConnectedDevice extends OvfHardwareExport {
  
}
export interface OvfConnectedDeviceFloppy extends OvfConnectedDevice {
  filename: string;
}
export interface OvfConnectedDeviceIso extends OvfConnectedDevice {
  filename: string;
}
export interface OvfDuplicateElement extends OvfElement {
  
}
export interface OvfDuplicatedElementBoundary extends OvfElement {
  boundary: string;
}
export interface OvfDuplicatedPropertyIdExport extends OvfExport {
  fqid: string;
}
export interface OvfDuplicatedPropertyIdImport extends OvfExport {
  
}
export interface OvfNoSpaceOnController extends OvfUnsupportedElement {
  parent: string;
}
export interface PhysCompatRDMNotSupported extends RDMNotSupported {
  
}
export interface UnusedVirtualDiskBlocksNotScrubbed extends DeviceBackingNotSupported {
  
}
export interface VirtualDiskBlocksNotFullyProvisioned extends DeviceBackingNotSupported {
  
}
export interface DailyTaskScheduler extends HourlyTaskScheduler {
  hour: number;
}
export interface MonthlyTaskScheduler extends DailyTaskScheduler {
  
}
export interface WeeklyTaskScheduler extends DailyTaskScheduler {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}
export interface DVPortNotSupported extends DeviceBackingNotSupported {
  
}
export interface MonthlyByDayTaskScheduler extends MonthlyTaskScheduler {
  day: number;
}
export interface MonthlyByWeekdayTaskScheduler extends MonthlyTaskScheduler {
  offset: WeekOfMonth;
  weekday: DayOfWeek;
}
export enum ObjectUpdateKind {
  modify = "modify",
  enter = "enter",
  leave = "leave"
}
export enum PropertyChangeOp {
  add = "add",
  remove = "remove",
  assign = "assign",
  indirectRemove = "indirectRemove"
}
export enum BatchResultResult {
  success = "success",
  fail = "fail"
}
export enum ConfigSpecOperation {
  add = "add",
  edit = "edit",
  remove = "remove"
}
export enum DiagnosticManagerLogCreator {
  vpxd = "vpxd",
  vpxa = "vpxa",
  hostd = "hostd",
  serverd = "serverd",
  install = "install",
  vpxClient = "vpxClient",
  recordLog = "recordLog"
}
export enum DiagnosticManagerLogFormat {
  plain = "plain"
}
export enum DrsInjectorWorkloadCorrelationState {
  correlated = "Correlated",
  uncorrelated = "Uncorrelated"
}
export enum ReplicationVmState {
  none = "none",
  paused = "paused",
  syncing = "syncing",
  idle = "idle",
  active = "active",
  error = "error"
}
export enum QuiesceMode {
  application = "application",
  filesystem = "filesystem",
  none = "none"
}
export enum HealthUpdateInfoComponentType {
  memory = "Memory",
  power = "Power",
  fan = "Fan",
  network = "Network",
  storage = "Storage"
}
export enum HttpNfcLeaseManifestEntryChecksumType {
  sha1 = "sha1",
  sha256 = "sha256"
}
export enum HttpNfcLeaseMode {
  pushOrGet = "pushOrGet",
  pull = "pull"
}
export enum HttpNfcLeaseState {
  initializing = "initializing",
  ready = "ready",
  done = "done",
  error = "error"
}
export enum IoFilterType {
  cache = "cache",
  replication = "replication",
  encryption = "encryption",
  compression = "compression",
  inspection = "inspection",
  datastoreIoControl = "datastoreIoControl",
  dataProvider = "dataProvider"
}
export enum IoFilterOperation {
  install = "install",
  uninstall = "uninstall",
  upgrade = "upgrade"
}
export enum LatencySensitivitySensitivityLevel {
  low = "low",
  normal = "normal",
  medium = "medium",
  high = "high",
  custom = "custom"
}
export enum LicenseFeatureInfoUnit {
  host = "host",
  cpuCore = "cpuCore",
  cpuPackage = "cpuPackage",
  server = "server",
  vm = "vm"
}
export enum LicenseFeatureInfoSourceRestriction {
  unrestricted = "unrestricted",
  served = "served",
  file = "file"
}
export enum LicenseFeatureInfoState {
  enabled = "enabled",
  disabled = "disabled",
  optional = "optional"
}
export enum HostLicensableResourceKey {
  numCpuPackages = "numCpuPackages",
  numCpuCores = "numCpuCores",
  memorySize = "memorySize",
  memoryForVms = "memoryForVms",
  numVmsStarted = "numVmsStarted",
  numVmsStarting = "numVmsStarting"
}
export enum LicenseManagerLicenseKey {
  esxFull = "esxFull",
  esxVmtn = "esxVmtn",
  esxExpress = "esxExpress",
  san = "san",
  iscsi = "iscsi",
  nas = "nas",
  vsmp = "vsmp",
  backup = "backup",
  vc = "vc",
  vcExpress = "vcExpress",
  esxHost = "esxHost",
  gsxHost = "gsxHost",
  serverHost = "serverHost",
  drsPower = "drsPower",
  vmotion = "vmotion",
  drs = "drs",
  das = "das"
}
export enum LicenseManagerState {
  initializing = "initializing",
  normal = "normal",
  marginal = "marginal",
  fault = "fault"
}
export enum LicenseReservationInfoState {
  notUsed = "notUsed",
  noLicense = "noLicense",
  unlicensedUse = "unlicensedUse",
  licensed = "licensed"
}
export enum OvfConsumerOstNodeType {
  envelope = "envelope",
  virtualSystem = "virtualSystem",
  virtualSystemCollection = "virtualSystemCollection"
}
export enum OvfCreateImportSpecParamsDiskProvisioningType {
  monolithicSparse = "monolithicSparse",
  monolithicFlat = "monolithicFlat",
  twoGbMaxExtentSparse = "twoGbMaxExtentSparse",
  twoGbMaxExtentFlat = "twoGbMaxExtentFlat",
  thin = "thin",
  thick = "thick",
  seSparse = "seSparse",
  eagerZeroedThick = "eagerZeroedThick",
  sparse = "sparse",
  flat = "flat"
}
export enum PerfSummaryType {
  average = "average",
  maximum = "maximum",
  minimum = "minimum",
  latest = "latest",
  summation = "summation",
  none = "none"
}
export enum PerfStatsType {
  absolute = "absolute",
  delta = "delta",
  rate = "rate"
}
export enum PerformanceManagerUnit {
  percent = "percent",
  kiloBytes = "kiloBytes",
  megaBytes = "megaBytes",
  megaHertz = "megaHertz",
  number = "number",
  microsecond = "microsecond",
  millisecond = "millisecond",
  second = "second",
  kiloBytesPerSecond = "kiloBytesPerSecond",
  megaBytesPerSecond = "megaBytesPerSecond",
  watt = "watt",
  joule = "joule",
  teraBytes = "teraBytes",
  celsius = "celsius"
}
export enum PerfFormat {
  normal = "normal",
  csv = "csv"
}
export enum ResourceConfigSpecScaleSharesBehavior {
  disabled = "disabled",
  scaleCpuAndMemoryShares = "scaleCpuAndMemoryShares"
}
export enum SessionManagerHttpServiceRequestSpecMethod {
  httpOptions = "httpOptions",
  httpGet = "httpGet",
  httpHead = "httpHead",
  httpPost = "httpPost",
  httpPut = "httpPut",
  httpDelete = "httpDelete",
  httpTrace = "httpTrace",
  httpConnect = "httpConnect"
}
export enum SharesLevel {
  low = "low",
  normal = "normal",
  high = "high",
  custom = "custom"
}
export enum SimpleCommandEncoding {
  csv = "CSV",
  hex = "HEX",
  string = "STRING"
}
export enum StorageIORMThresholdMode {
  automatic = "automatic",
  manual = "manual"
}
export enum TaskInfoState {
  queued = "queued",
  running = "running",
  success = "success",
  error = "error"
}
export enum VsanUpgradeSystemUpgradeHistoryDiskGroupOpType {
  add = "add",
  remove = "remove"
}
export enum ActionParameter {
  targetName = "targetName",
  alarmName = "alarmName",
  oldStatus = "oldStatus",
  newStatus = "newStatus",
  triggeringSummary = "triggeringSummary",
  declaringSummary = "declaringSummary",
  eventDescription = "eventDescription",
  target = "target",
  alarm = "alarm"
}
export enum MetricAlarmOperator {
  isAbove = "isAbove",
  isBelow = "isBelow"
}
export enum StateAlarmOperator {
  isEqual = "isEqual",
  isUnequal = "isUnequal"
}
export enum ActionType {
  migrationV1 = "MigrationV1",
  vmPowerV1 = "VmPowerV1",
  hostPowerV1 = "HostPowerV1",
  hostMaintenanceV1 = "HostMaintenanceV1",
  storageMigrationV1 = "StorageMigrationV1",
  storagePlacementV1 = "StoragePlacementV1",
  placementV1 = "PlacementV1",
  hostInfraUpdateHaV1 = "HostInfraUpdateHaV1"
}
export enum ClusterCryptoConfigInfoCryptoMode {
  onDemand = "onDemand",
  forceEnable = "forceEnable"
}
export enum ClusterDasAamNodeStateDasState {
  uninitialized = "uninitialized",
  initialized = "initialized",
  configuring = "configuring",
  unconfiguring = "unconfiguring",
  running = "running",
  error = "error",
  agentShutdown = "agentShutdown",
  nodeFailed = "nodeFailed"
}
export enum ClusterDasConfigInfoHBDatastoreCandidate {
  userSelectedDs = "userSelectedDs",
  allFeasibleDs = "allFeasibleDs",
  allFeasibleDsWithUserPreference = "allFeasibleDsWithUserPreference"
}
export enum ClusterDasConfigInfoServiceState {
  disabled = "disabled",
  enabled = "enabled"
}
export enum ClusterDasConfigInfoVmMonitoringState {
  vmMonitoringDisabled = "vmMonitoringDisabled",
  vmMonitoringOnly = "vmMonitoringOnly",
  vmAndAppMonitoring = "vmAndAppMonitoring"
}
export enum ClusterDasFdmAvailabilityState {
  uninitialized = "uninitialized",
  election = "election",
  master = "master",
  connectedToMaster = "connectedToMaster",
  networkPartitionedFromMaster = "networkPartitionedFromMaster",
  networkIsolated = "networkIsolated",
  hostDown = "hostDown",
  initializationError = "initializationError",
  uninitializationError = "uninitializationError",
  fdmUnreachable = "fdmUnreachable"
}
export enum DasVmPriority {
  disabled = "disabled",
  low = "low",
  medium = "medium",
  high = "high"
}
export enum ClusterDasVmSettingsIsolationResponse {
  none = "none",
  powerOff = "powerOff",
  shutdown = "shutdown",
  clusterIsolationResponse = "clusterIsolationResponse"
}
export enum ClusterDasVmSettingsRestartPriority {
  disabled = "disabled",
  lowest = "lowest",
  low = "low",
  medium = "medium",
  high = "high",
  highest = "highest",
  clusterRestartPriority = "clusterRestartPriority"
}
export enum DpmBehavior {
  manual = "manual",
  automated = "automated"
}
export enum DrsBehavior {
  manual = "manual",
  partiallyAutomated = "partiallyAutomated",
  fullyAutomated = "fullyAutomated"
}
export enum DrsRecommendationReasonCode {
  fairnessCpuAvg = "fairnessCpuAvg",
  fairnessMemAvg = "fairnessMemAvg",
  jointAffin = "jointAffin",
  antiAffin = "antiAffin",
  hostMaint = "hostMaint"
}
export enum ClusterHostInfraUpdateHaModeActionOperationType {
  enterQuarantine = "enterQuarantine",
  exitQuarantine = "exitQuarantine",
  enterMaintenance = "enterMaintenance"
}
export enum HostPowerOperationType {
  powerOn = "powerOn",
  powerOff = "powerOff"
}
export enum ClusterInfraUpdateHaConfigInfoBehaviorType {
  manual = "Manual",
  automated = "Automated"
}
export enum ClusterInfraUpdateHaConfigInfoRemediationType {
  quarantineMode = "QuarantineMode",
  maintenanceMode = "MaintenanceMode"
}
export enum ClusterPowerOnVmOption {
  overrideAutomationLevel = "OverrideAutomationLevel",
  reserveResources = "ReserveResources"
}
export enum RecommendationReasonCode {
  fairnessCpuAvg = "fairnessCpuAvg",
  fairnessMemAvg = "fairnessMemAvg",
  jointAffin = "jointAffin",
  antiAffin = "antiAffin",
  hostMaint = "hostMaint",
  enterStandby = "enterStandby",
  reservationCpu = "reservationCpu",
  reservationMem = "reservationMem",
  powerOnVm = "powerOnVm",
  powerSaving = "powerSaving",
  increaseCapacity = "increaseCapacity",
  checkResource = "checkResource",
  unreservedCapacity = "unreservedCapacity",
  vmHostHardAffinity = "vmHostHardAffinity",
  vmHostSoftAffinity = "vmHostSoftAffinity",
  balanceDatastoreSpaceUsage = "balanceDatastoreSpaceUsage",
  balanceDatastoreIoLoad = "balanceDatastoreIOLoad",
  balanceDatastoreIopsReservation = "balanceDatastoreIOPSReservation",
  datastoreMaint = "datastoreMaint",
  virtualDiskJointAffin = "virtualDiskJointAffin",
  virtualDiskAntiAffin = "virtualDiskAntiAffin",
  datastoreSpaceOutage = "datastoreSpaceOutage",
  storagePlacement = "storagePlacement",
  iolbDisabledInternal = "iolbDisabledInternal",
  xvmotionPlacement = "xvmotionPlacement",
  networkBandwidthReservation = "networkBandwidthReservation",
  hostInDegradation = "hostInDegradation",
  hostExitDegradation = "hostExitDegradation",
  maxVmsConstraint = "maxVmsConstraint",
  ftConstraints = "ftConstraints",
  vmHostAffinityPolicy = "vmHostAffinityPolicy",
  vmHostAntiAffinityPolicy = "vmHostAntiAffinityPolicy",
  vmAntiAffinityPolicy = "vmAntiAffinityPolicy"
}
export enum RecommendationType {
  v1 = "V1"
}
export enum ClusterVmComponentProtectionSettingsStorageVmReaction {
  disabled = "disabled",
  warning = "warning",
  restartConservative = "restartConservative",
  restartAggressive = "restartAggressive",
  clusterDefault = "clusterDefault"
}
export enum ClusterVmComponentProtectionSettingsVmReactionOnAPDCleared {
  none = "none",
  reset = "reset",
  useClusterDefault = "useClusterDefault"
}
export enum ClusterVmReadinessReadyCondition {
  none = "none",
  poweredOn = "poweredOn",
  guestHbStatusGreen = "guestHbStatusGreen",
  appHbStatusGreen = "appHbStatusGreen",
  useClusterDefault = "useClusterDefault"
}
export enum DvsFilterOnFailure {
  failOpen = "failOpen",
  failClosed = "failClosed"
}
export enum DVPortStatusVmDirectPathGen2InactiveReasonNetwork {
  portNptIncompatibleDvs = "portNptIncompatibleDvs",
  portNptNoCompatibleNics = "portNptNoCompatibleNics",
  portNptNoVirtualFunctionsAvailable = "portNptNoVirtualFunctionsAvailable",
  portNptDisabledForPort = "portNptDisabledForPort"
}
export enum DVPortStatusVmDirectPathGen2InactiveReasonOther {
  portNptIncompatibleHost = "portNptIncompatibleHost",
  portNptIncompatibleConnectee = "portNptIncompatibleConnectee"
}
export enum EntityType {
  distributedVirtualSwitch = "distributedVirtualSwitch",
  distributedVirtualPortgroup = "distributedVirtualPortgroup"
}
export enum EntityImportType {
  createEntityWithNewIdentifier = "createEntityWithNewIdentifier",
  createEntityWithOriginalIdentifier = "createEntityWithOriginalIdentifier",
  applyToEntitySpecified = "applyToEntitySpecified"
}
export enum DistributedVirtualSwitchHostMemberHostComponentState {
  up = "up",
  pending = "pending",
  outOfSync = "outOfSync",
  warning = "warning",
  disconnected = "disconnected",
  down = "down"
}
export enum DistributedVirtualSwitchHostMemberTransportZoneType {
  vlan = "vlan",
  overlay = "overlay"
}
export enum DistributedVirtualSwitchPortConnecteeConnecteeType {
  pnic = "pnic",
  vmVnic = "vmVnic",
  hostConsoleVnic = "hostConsoleVnic",
  hostVmkVnic = "hostVmkVnic"
}
export enum DvsNetworkRuleDirectionType {
  incomingPackets = "incomingPackets",
  outgoingPackets = "outgoingPackets",
  both = "both"
}
export enum KmipClusterInfoKmsManagementType {
  unknown = "unknown",
  vCenter = "vCenter",
  trustAuthority = "trustAuthority"
}
export enum EventEventSeverity {
  error = "error",
  warning = "warning",
  info = "info",
  user = "user"
}
export enum EventCategory {
  info = "info",
  warning = "warning",
  error = "error",
  user = "user"
}
export enum EventFilterSpecRecursionOption {
  self = "self",
  children = "children",
  all = "all"
}
export enum VmFailedStartingSecondaryEventFailureReason {
  incompatibleHost = "incompatibleHost",
  loginFailed = "loginFailed",
  registerVmFailed = "registerVmFailed",
  migrateFailed = "migrateFailed"
}
export enum VmShutdownOnIsolationEventOperation {
  shutdown = "shutdown",
  poweredOff = "poweredOff"
}
export enum DisallowedChangeByServiceDisallowedChange {
  hotExtendDisk = "hotExtendDisk"
}
export enum InvalidDasConfigArgumentEntryForInvalidArgument {
  admissionControl = "admissionControl",
  userHeartbeatDs = "userHeartbeatDs",
  vmConfig = "vmConfig"
}
export enum InvalidProfileReferenceHostReason {
  incompatibleVersion = "incompatibleVersion",
  missingReferenceHost = "missingReferenceHost"
}
export enum LicenseAssignmentFailedReason {
  keyEntityMismatch = "keyEntityMismatch",
  downgradeDisallowed = "downgradeDisallowed",
  inventoryNotManageableByVirtualCenter = "inventoryNotManageableByVirtualCenter",
  hostsUnmanageableByVirtualCenterWithoutLicenseServer = "hostsUnmanageableByVirtualCenterWithoutLicenseServer"
}
export enum ThirdPartyLicenseAssignmentFailedReason {
  licenseAssignmentFailed = "licenseAssignmentFailed",
  moduleNotInstalled = "moduleNotInstalled"
}
export enum AutoStartAction {
  none = "none",
  systemDefault = "systemDefault",
  powerOn = "powerOn",
  powerOff = "powerOff",
  guestShutdown = "guestShutdown",
  suspend = "suspend"
}
export enum AutoStartWaitHeartbeatSetting {
  yes = "yes",
  no = "no",
  systemDefault = "systemDefault"
}
export enum HostCapabilityFtUnsupportedReason {
  vMotionNotLicensed = "vMotionNotLicensed",
  missingVMotionNic = "missingVMotionNic",
  missingFtLoggingNic = "missingFTLoggingNic",
  ftNotLicensed = "ftNotLicensed",
  haAgentIssue = "haAgentIssue",
  unsupportedProduct = "unsupportedProduct",
  cpuHvUnsupported = "cpuHvUnsupported",
  cpuHwmmuUnsupported = "cpuHwmmuUnsupported",
  cpuHvDisabled = "cpuHvDisabled"
}
export enum HostReplayUnsupportedReason {
  incompatibleProduct = "incompatibleProduct",
  incompatibleCpu = "incompatibleCpu",
  hvDisabled = "hvDisabled",
  cpuidLimitSet = "cpuidLimitSet",
  oldBios = "oldBIOS",
  unknown = "unknown"
}
export enum HostCapabilityUnmapMethodSupported {
  priority = "priority",
  fixed = "fixed",
  dynamic = "dynamic"
}
export enum HostCapabilityVmDirectPathGen2UnsupportedReason {
  hostNptIncompatibleProduct = "hostNptIncompatibleProduct",
  hostNptIncompatibleHardware = "hostNptIncompatibleHardware",
  hostNptDisabled = "hostNptDisabled"
}
export enum HostCertificateManagerCertificateInfoCertificateStatus {
  unknown = "unknown",
  expired = "expired",
  expiring = "expiring",
  expiringShortly = "expiringShortly",
  expirationImminent = "expirationImminent",
  good = "good"
}
export enum HostConfigChangeMode {
  modify = "modify",
  replace = "replace"
}
export enum HostConfigChangeOperation {
  add = "add",
  remove = "remove",
  edit = "edit",
  ignore = "ignore"
}
export enum HostCpuPackageVendor {
  unknown = "unknown",
  intel = "intel",
  amd = "amd",
  hygon = "hygon"
}
export enum HostCpuPowerManagementInfoPolicyType {
  off = "off",
  staticPolicy = "staticPolicy",
  dynamicPolicy = "dynamicPolicy"
}
export enum HostDigestInfoDigestMethodType {
  sha1 = "SHA1",
  md5 = "MD5",
  sha256 = "SHA256",
  sha384 = "SHA384",
  sha512 = "SHA512",
  sm3256 = "SM3_256"
}
export enum HostDiskPartitionInfoPartitionFormat {
  gpt = "gpt",
  mbr = "mbr",
  unknown = "unknown"
}
export enum HostDiskPartitionInfoType {
  none = "none",
  vmfs = "vmfs",
  linuxNative = "linuxNative",
  linuxSwap = "linuxSwap",
  extended = "extended",
  ntfs = "ntfs",
  vmkDiagnostic = "vmkDiagnostic",
  vffs = "vffs"
}
export enum HostFeatureVersionKey {
  faultTolerance = "faultTolerance"
}
export enum FileSystemMountInfoVStorageSupportStatus {
  vStorageSupported = "vStorageSupported",
  vStorageUnsupported = "vStorageUnsupported",
  vStorageUnknown = "vStorageUnknown"
}
export enum HostFileSystemVolumeFileSystemType {
  vmfs = "VMFS",
  nfs = "NFS",
  nfs41 = "NFS41",
  cifs = "CIFS",
  vsan = "vsan",
  vffs = "VFFS",
  vvol = "VVOL",
  pmem = "PMEM",
  vsanD = "vsanD",
  other = "OTHER"
}
export enum HostGraphicsConfigGraphicsType {
  shared = "shared",
  sharedDirect = "sharedDirect"
}
export enum HostGraphicsConfigSharedPassthruAssignmentPolicy {
  performance = "performance",
  consolidation = "consolidation"
}
export enum HostGraphicsInfoGraphicsType {
  basic = "basic",
  shared = "shared",
  direct = "direct",
  sharedDirect = "sharedDirect"
}
export enum HostHardwareElementStatus {
  unknown = "Unknown",
  green = "Green",
  yellow = "Yellow",
  red = "Red"
}
export enum HostAccessMode {
  accessNone = "accessNone",
  accessAdmin = "accessAdmin",
  accessNoAccess = "accessNoAccess",
  accessReadOnly = "accessReadOnly",
  accessOther = "accessOther"
}
export enum HostLockdownMode {
  lockdownDisabled = "lockdownDisabled",
  lockdownNormal = "lockdownNormal",
  lockdownStrict = "lockdownStrict"
}
export enum HostImageAcceptanceLevel {
  vmwareCertified = "vmware_certified",
  vmwareAccepted = "vmware_accepted",
  partner = "partner",
  community = "community"
}
export enum HostIpConfigIpV6AddressConfigType {
  other = "other",
  manual = "manual",
  dhcp = "dhcp",
  linklayer = "linklayer",
  random = "random"
}
export enum HostIpConfigIpV6AddressStatus {
  preferred = "preferred",
  deprecated = "deprecated",
  invalid = "invalid",
  inaccessible = "inaccessible",
  unknown = "unknown",
  tentative = "tentative",
  duplicate = "duplicate"
}
export enum IscsiPortInfoPathStatus {
  notUsed = "notUsed",
  active = "active",
  standBy = "standBy",
  lastActive = "lastActive"
}
export enum LinkDiscoveryProtocolConfigOperationType {
  none = "none",
  listen = "listen",
  advertise = "advertise",
  both = "both"
}
export enum LinkDiscoveryProtocolConfigProtocolType {
  cdp = "cdp",
  lldp = "lldp"
}
export enum HostLowLevelProvisioningManagerFileType {
  file = "File",
  virtualDisk = "VirtualDisk",
  directory = "Directory"
}
export enum HostLowLevelProvisioningManagerReloadTarget {
  currentConfig = "currentConfig",
  snapshotConfig = "snapshotConfig"
}
export enum HostMaintenanceSpecPurpose {
  hostUpgrade = "hostUpgrade"
}
export enum VirtualMachineMemoryAllocationPolicy {
  swapNone = "swapNone",
  swapSome = "swapSome",
  swapMost = "swapMost"
}
export enum HostMountMode {
  readWrite = "readWrite",
  readOnly = "readOnly"
}
export enum HostMountInfoInaccessibleReason {
  allPathsDownStart = "AllPathsDown_Start",
  allPathsDownTimeout = "AllPathsDown_Timeout",
  permanentDeviceLoss = "PermanentDeviceLoss"
}
export enum MultipathState {
  standby = "standby",
  active = "active",
  disabled = "disabled",
  dead = "dead",
  unknown = "unknown"
}
export enum HostNasVolumeSecurityType {
  authSys = "AUTH_SYS",
  secKrb5 = "SEC_KRB5",
  secKrb5I = "SEC_KRB5I"
}
export enum HostNetStackInstanceCongestionControlAlgorithmType {
  newreno = "newreno",
  cubic = "cubic"
}
export enum HostNetStackInstanceSystemStackKey {
  defaultTcpipStack = "defaultTcpipStack",
  vmotion = "vmotion",
  vSphereProvisioning = "vSphereProvisioning"
}
export enum HostNumericSensorHealthState {
  unknown = "unknown",
  green = "green",
  yellow = "yellow",
  red = "red"
}
export enum HostNumericSensorType {
  fan = "fan",
  power = "power",
  temperature = "temperature",
  voltage = "voltage",
  other = "other",
  processor = "processor",
  memory = "memory",
  storage = "storage",
  systemBoard = "systemBoard",
  battery = "battery",
  bios = "bios",
  cable = "cable",
  watchdog = "watchdog"
}
export enum NvdimmNvdimmHealthInfoState {
  normal = "normal",
  error = "error"
}
export enum NvdimmInterleaveSetState {
  invalid = "invalid",
  active = "active"
}
export enum NvdimmNamespaceDetailsHealthStatus {
  normal = "normal",
  missing = "missing",
  labelMissing = "labelMissing",
  interleaveBroken = "interleaveBroken",
  labelInconsistent = "labelInconsistent"
}
export enum NvdimmNamespaceDetailsState {
  invalid = "invalid",
  notInUse = "notInUse",
  inUse = "inUse"
}
export enum NvdimmNamespaceHealthStatus {
  normal = "normal",
  missing = "missing",
  labelMissing = "labelMissing",
  interleaveBroken = "interleaveBroken",
  labelInconsistent = "labelInconsistent",
  bttCorrupt = "bttCorrupt",
  badBlockSize = "badBlockSize"
}
export enum NvdimmNamespaceState {
  invalid = "invalid",
  notInUse = "notInUse",
  inUse = "inUse"
}
export enum NvdimmNamespaceType {
  blockNamespace = "blockNamespace",
  persistentNamespace = "persistentNamespace"
}
export enum NvdimmRangeType {
  volatileRange = "volatileRange",
  persistentRange = "persistentRange",
  controlRange = "controlRange",
  blockRange = "blockRange",
  volatileVirtualDiskRange = "volatileVirtualDiskRange",
  volatileVirtualCdRange = "volatileVirtualCDRange",
  persistentVirtualDiskRange = "persistentVirtualDiskRange",
  persistentVirtualCdRange = "persistentVirtualCDRange"
}
export enum HostNvmeDiscoveryLogSubsystemType {
  discovery = "discovery",
  nvm = "nvm"
}
export enum HostNvmeDiscoveryLogTransportRequirements {
  secureChannelRequired = "secureChannelRequired",
  secureChannelNotRequired = "secureChannelNotRequired",
  requirementsNotSpecified = "requirementsNotSpecified"
}
export enum HostNvmeTransportParametersNvmeAddressFamily {
  ipv4 = "ipv4",
  ipv6 = "ipv6",
  infiniBand = "infiniBand",
  fc = "fc",
  loopback = "loopback",
  unknown = "unknown"
}
export enum HostNvmeTransportType {
  pcie = "pcie",
  fibreChannel = "fibreChannel",
  rdma = "rdma",
  loopback = "loopback",
  unsupported = "unsupported"
}
export enum HostOpaqueSwitchOpaqueSwitchState {
  up = "up",
  warning = "warning",
  down = "down",
  maintenance = "maintenance"
}
export enum HostPatchManagerInstallState {
  hostRestarted = "hostRestarted",
  imageActive = "imageActive"
}
export enum HostPatchManagerIntegrityStatus {
  validated = "validated",
  keyNotFound = "keyNotFound",
  keyRevoked = "keyRevoked",
  keyExpired = "keyExpired",
  digestMismatch = "digestMismatch",
  notEnoughSignatures = "notEnoughSignatures",
  validationError = "validationError"
}
export enum HostPatchManagerReason {
  obsoleted = "obsoleted",
  missingPatch = "missingPatch",
  missingLib = "missingLib",
  hasDependentPatch = "hasDependentPatch",
  conflictPatch = "conflictPatch",
  conflictLib = "conflictLib"
}
export enum PhysicalNicResourcePoolSchedulerDisallowedReason {
  userOptOut = "userOptOut",
  hardwareUnsupported = "hardwareUnsupported"
}
export enum PhysicalNicVmDirectPathGen2SupportedMode {
  upt = "upt"
}
export enum PortGroupConnecteeType {
  virtualMachine = "virtualMachine",
  systemManagement = "systemManagement",
  host = "host",
  unknown = "unknown"
}
export enum HostProtocolEndpointPEType {
  block = "block",
  nas = "nas"
}
export enum HostProtocolEndpointProtocolEndpointType {
  scsi = "scsi",
  nfs = "nfs",
  nfs4X = "nfs4x"
}
export enum HostRdmaDeviceConnectionState {
  unknown = "unknown",
  down = "down",
  init = "init",
  armed = "armed",
  active = "active",
  activeDefer = "activeDefer"
}
export enum HostFirewallRuleDirection {
  inbound = "inbound",
  outbound = "outbound"
}
export enum HostFirewallRulePortType {
  src = "src",
  dst = "dst"
}
export enum HostFirewallRuleProtocol {
  tcp = "tcp",
  udp = "udp"
}
export enum ScsiLunDescriptorQuality {
  highQuality = "highQuality",
  mediumQuality = "mediumQuality",
  lowQuality = "lowQuality",
  unknownQuality = "unknownQuality"
}
export enum ScsiLunType {
  disk = "disk",
  tape = "tape",
  printer = "printer",
  processor = "processor",
  worm = "worm",
  cdrom = "cdrom",
  scanner = "scanner",
  opticalDevice = "opticalDevice",
  mediaChanger = "mediaChanger",
  communications = "communications",
  storageArrayController = "storageArrayController",
  enclosure = "enclosure",
  unknown = "unknown"
}
export enum ScsiLunState {
  unknownState = "unknownState",
  ok = "ok",
  error = "error",
  off = "off",
  quiesced = "quiesced",
  degraded = "degraded",
  lostCommunication = "lostCommunication",
  timeout = "timeout"
}
export enum ScsiLunVStorageSupportStatus {
  vStorageSupported = "vStorageSupported",
  vStorageUnsupported = "vStorageUnsupported",
  vStorageUnknown = "vStorageUnknown"
}
export enum HostServicePolicy {
  on = "on",
  automatic = "automatic",
  off = "off"
}
export enum HostSevInfoSevState {
  uninitialized = "uninitialized",
  initialized = "initialized",
  working = "working"
}
export enum HostSgxInfoFlcModes {
  off = "off",
  locked = "locked",
  unlocked = "unlocked"
}
export enum HostSgxInfoSgxStates {
  notPresent = "notPresent",
  disabledBios = "disabledBIOS",
  disabledCfw101 = "disabledCFW101",
  disabledCpuMismatch = "disabledCPUMismatch",
  disabledNoFlc = "disabledNoFLC",
  disabledNumaUnsup = "disabledNUMAUnsup",
  disabledMaxEpcRegs = "disabledMaxEPCRegs",
  enabled = "enabled"
}
export enum HostSnmpAgentCapability {
  complete = "COMPLETE",
  diagnostics = "DIAGNOSTICS",
  configuration = "CONFIGURATION"
}
export enum SoftwarePackageConstraint {
  equals = "equals",
  lessThan = "lessThan",
  lessThanEqual = "lessThanEqual",
  greaterThanEqual = "greaterThanEqual",
  greaterThan = "greaterThan"
}
export enum SoftwarePackageVibType {
  bootbank = "bootbank",
  tools = "tools",
  meta = "meta"
}
export enum HostStorageProtocol {
  scsi = "scsi",
  nvme = "nvme"
}
export enum HostSystemIdentificationInfoIdentifier {
  assetTag = "AssetTag",
  serviceTag = "ServiceTag",
  oemSpecificString = "OemSpecificString",
  enclosureSerialNumberTag = "EnclosureSerialNumberTag",
  serialNumberTag = "SerialNumberTag"
}
export enum HostTpmAttestationInfoAcceptanceStatus {
  notAccepted = "notAccepted",
  accepted = "accepted"
}
export enum HostTrustAuthorityAttestationInfoAttestationStatus {
  attested = "attested",
  notAttested = "notAttested",
  unknown = "unknown"
}
export enum HostUnresolvedVmfsResolutionSpecVmfsUuidResolution {
  resignature = "resignature",
  forceMount = "forceMount"
}
export enum HostVirtualNicManagerNicType {
  vmotion = "vmotion",
  faultToleranceLogging = "faultToleranceLogging",
  vSphereReplication = "vSphereReplication",
  vSphereReplicationNfc = "vSphereReplicationNFC",
  management = "management",
  vsan = "vsan",
  vSphereProvisioning = "vSphereProvisioning",
  vsanWitness = "vsanWitness",
  vSphereBackupNfc = "vSphereBackupNFC",
  ptp = "ptp"
}
export enum HostVmciAccessManagerMode {
  grant = "grant",
  replace = "replace",
  revoke = "revoke"
}
export enum NetIpConfigInfoIpAddressOrigin {
  other = "other",
  manual = "manual",
  dhcp = "dhcp",
  linklayer = "linklayer",
  random = "random"
}
export enum NetIpConfigInfoIpAddressStatus {
  preferred = "preferred",
  deprecated = "deprecated",
  invalid = "invalid",
  inaccessible = "inaccessible",
  unknown = "unknown",
  tentative = "tentative",
  duplicate = "duplicate"
}
export enum NetIpStackInfoEntryType {
  other = "other",
  invalid = "invalid",
  dynamic = "dynamic",
  manual = "manual"
}
export enum NetIpStackInfoPreference {
  reserved = "reserved",
  low = "low",
  medium = "medium",
  high = "high"
}
export enum NetBIOSConfigInfoMode {
  unknown = "unknown",
  enabled = "enabled",
  disabled = "disabled",
  enabledViaDhcp = "enabledViaDHCP"
}
export enum ArrayUpdateOperation {
  add = "add",
  remove = "remove",
  edit = "edit"
}
export enum ComplianceResultStatus {
  compliant = "compliant",
  nonCompliant = "nonCompliant",
  unknown = "unknown",
  running = "running"
}
export enum ProfileNumericComparator {
  lessThan = "lessThan",
  lessThanEqual = "lessThanEqual",
  equal = "equal",
  notEqual = "notEqual",
  greaterThanEqual = "greaterThanEqual",
  greaterThan = "greaterThan"
}
export enum ProfileParameterMetadataRelationType {
  dynamicRelation = "dynamic_relation",
  extensibleRelation = "extensible_relation",
  localizableRelation = "localizable_relation",
  staticRelation = "static_relation",
  validationRelation = "validation_relation"
}
export enum ClusterProfileServiceType {
  drs = "DRS",
  ha = "HA",
  dpm = "DPM",
  ft = "FT"
}
export enum ProfileExecuteResultStatus {
  success = "success",
  needInput = "needInput",
  error = "error"
}
export enum AnswerFileValidationInfoStatus {
  success = "success",
  failed = "failed",
  failedDefaults = "failed_defaults"
}
export enum PlacementAffinityRuleRuleScope {
  cluster = "cluster",
  host = "host",
  storagePod = "storagePod",
  datastore = "datastore"
}
export enum PlacementAffinityRuleRuleType {
  affinity = "affinity",
  antiAffinity = "antiAffinity",
  softAffinity = "softAffinity",
  softAntiAffinity = "softAntiAffinity"
}
export enum StorageDrsPodConfigInfoBehavior {
  manual = "manual",
  automated = "automated"
}
export enum StorageDrsSpaceLoadBalanceConfigSpaceThresholdMode {
  utilization = "utilization",
  freeSpace = "freeSpace"
}
export enum VAppCloneSpecProvisioningType {
  sameAsSource = "sameAsSource",
  thin = "thin",
  thick = "thick"
}
export enum VAppAutoStartAction {
  none = "none",
  powerOn = "powerOn",
  powerOff = "powerOff",
  guestShutdown = "guestShutdown",
  suspend = "suspend"
}
export enum VAppIPAssignmentInfoAllocationSchemes {
  dhcp = "dhcp",
  ovfenv = "ovfenv"
}
export enum VAppIPAssignmentInfoIpAllocationPolicy {
  dhcpPolicy = "dhcpPolicy",
  transientPolicy = "transientPolicy",
  fixedPolicy = "fixedPolicy",
  fixedAllocatedPolicy = "fixedAllocatedPolicy"
}
export enum VAppIPAssignmentInfoProtocols {
  iPv4 = "IPv4",
  iPv6 = "IPv6"
}
export enum VchaState {
  configured = "configured",
  notConfigured = "notConfigured",
  invalid = "invalid",
  prepared = "prepared"
}
export enum VchaClusterMode {
  enabled = "enabled",
  disabled = "disabled",
  maintenance = "maintenance"
}
export enum VchaClusterState {
  healthy = "healthy",
  degraded = "degraded",
  isolated = "isolated"
}
export enum VchaNodeRole {
  active = "active",
  passive = "passive",
  witness = "witness"
}
export enum VchaNodeState {
  up = "up",
  down = "down"
}
export enum VirtualMachineBootOptionsNetworkBootProtocolType {
  ipv4 = "ipv4",
  ipv6 = "ipv6"
}
export enum VirtualMachineConfigInfoNpivWwnType {
  vc = "vc",
  host = "host",
  external = "external"
}
export enum VirtualMachineConfigInfoSwapPlacementType {
  inherit = "inherit",
  vmDirectory = "vmDirectory",
  hostLocal = "hostLocal"
}
export enum VirtualMachineConfigSpecEncryptedVMotionModes {
  disabled = "disabled",
  opportunistic = "opportunistic",
  required = "required"
}
export enum VirtualMachineConfigSpecNpivWwnOp {
  generate = "generate",
  set = "set",
  remove = "remove",
  extend = "extend"
}
export enum VirtualMachinePowerOpType {
  soft = "soft",
  hard = "hard",
  preset = "preset"
}
export enum VirtualMachineStandbyActionType {
  checkpoint = "checkpoint",
  powerOnSuspend = "powerOnSuspend"
}
export enum VirtualMachineDeviceRuntimeInfoVirtualEthernetCardRuntimeStateVmDirectPathGen2InactiveReasonOther {
  vmNptIncompatibleHost = "vmNptIncompatibleHost",
  vmNptIncompatibleNetwork = "vmNptIncompatibleNetwork"
}
export enum VirtualMachineDeviceRuntimeInfoVirtualEthernetCardRuntimeStateVmDirectPathGen2InactiveReasonVm {
  vmNptIncompatibleGuest = "vmNptIncompatibleGuest",
  vmNptIncompatibleGuestDriver = "vmNptIncompatibleGuestDriver",
  vmNptIncompatibleAdapterType = "vmNptIncompatibleAdapterType",
  vmNptDisabledOrDisconnectedAdapter = "vmNptDisabledOrDisconnectedAdapter",
  vmNptIncompatibleAdapterFeatures = "vmNptIncompatibleAdapterFeatures",
  vmNptIncompatibleBackingType = "vmNptIncompatibleBackingType",
  vmNptInsufficientMemoryReservation = "vmNptInsufficientMemoryReservation",
  vmNptFaultToleranceOrRecordReplayConfigured = "vmNptFaultToleranceOrRecordReplayConfigured",
  vmNptConflictingIoChainConfigured = "vmNptConflictingIOChainConfigured",
  vmNptMonitorBlocks = "vmNptMonitorBlocks",
  vmNptConflictingOperationInProgress = "vmNptConflictingOperationInProgress",
  vmNptRuntimeError = "vmNptRuntimeError",
  vmNptOutOfIntrVector = "vmNptOutOfIntrVector",
  vmNptVmciActive = "vmNptVMCIActive"
}
export enum VirtualMachineFileLayoutExFileType {
  config = "config",
  extendedConfig = "extendedConfig",
  diskDescriptor = "diskDescriptor",
  diskExtent = "diskExtent",
  digestDescriptor = "digestDescriptor",
  digestExtent = "digestExtent",
  diskReplicationState = "diskReplicationState",
  log = "log",
  stat = "stat",
  namespaceData = "namespaceData",
  nvram = "nvram",
  snapshotData = "snapshotData",
  snapshotMemory = "snapshotMemory",
  snapshotList = "snapshotList",
  snapshotManifestList = "snapshotManifestList",
  suspend = "suspend",
  suspendMemory = "suspendMemory",
  swap = "swap",
  uwswap = "uwswap",
  core = "core",
  screenshot = "screenshot",
  ftMetadata = "ftMetadata",
  guestCustomization = "guestCustomization"
}
export enum VirtualMachineHtSharing {
  any = "any",
  none = "none",
  internal = "internal"
}
export enum VirtualMachineFlagInfoMonitorType {
  release = "release",
  debug = "debug",
  stats = "stats"
}
export enum VirtualMachinePowerOffBehavior {
  powerOff = "powerOff",
  revert = "revert",
  prompt = "prompt",
  take = "take"
}
export enum VirtualMachineFlagInfoVirtualExecUsage {
  hvAuto = "hvAuto",
  hvOn = "hvOn",
  hvOff = "hvOff"
}
export enum VirtualMachineFlagInfoVirtualMmuUsage {
  automatic = "automatic",
  on = "on",
  off = "off"
}
export enum VirtualMachineForkConfigInfoChildType {
  none = "none",
  persistent = "persistent",
  nonpersistent = "nonpersistent"
}
export enum GuestInfoAppStateType {
  none = "none",
  appStateOk = "appStateOk",
  appStateNeedReset = "appStateNeedReset"
}
export enum VirtualMachineGuestState {
  running = "running",
  shuttingDown = "shuttingDown",
  resetting = "resetting",
  standby = "standby",
  notRunning = "notRunning",
  unknown = "unknown"
}
export enum VirtualMachineToolsInstallType {
  guestToolsTypeUnknown = "guestToolsTypeUnknown",
  guestToolsTypeMsi = "guestToolsTypeMSI",
  guestToolsTypeTar = "guestToolsTypeTar",
  guestToolsTypeOsp = "guestToolsTypeOSP",
  guestToolsTypeOpenVmTools = "guestToolsTypeOpenVMTools"
}
export enum VirtualMachineToolsRunningStatus {
  guestToolsNotRunning = "guestToolsNotRunning",
  guestToolsRunning = "guestToolsRunning",
  guestToolsExecutingScripts = "guestToolsExecutingScripts"
}
export enum VirtualMachineToolsStatus {
  toolsNotInstalled = "toolsNotInstalled",
  toolsNotRunning = "toolsNotRunning",
  toolsOld = "toolsOld",
  toolsOk = "toolsOk"
}
export enum VirtualMachineToolsVersionStatus {
  guestToolsNotInstalled = "guestToolsNotInstalled",
  guestToolsNeedUpgrade = "guestToolsNeedUpgrade",
  guestToolsCurrent = "guestToolsCurrent",
  guestToolsUnmanaged = "guestToolsUnmanaged",
  guestToolsTooOld = "guestToolsTooOld",
  guestToolsSupportedOld = "guestToolsSupportedOld",
  guestToolsSupportedNew = "guestToolsSupportedNew",
  guestToolsTooNew = "guestToolsTooNew",
  guestToolsBlacklisted = "guestToolsBlacklisted"
}
export enum GuestOsDescriptorFirmwareType {
  bios = "bios",
  efi = "efi"
}
export enum VirtualMachineGuestOsFamily {
  windowsGuest = "windowsGuest",
  linuxGuest = "linuxGuest",
  netwareGuest = "netwareGuest",
  solarisGuest = "solarisGuest",
  darwinGuestFamily = "darwinGuestFamily",
  otherGuestFamily = "otherGuestFamily"
}
export enum VirtualMachineGuestOsIdentifier {
  dosGuest = "dosGuest",
  win31Guest = "win31Guest",
  win95Guest = "win95Guest",
  win98Guest = "win98Guest",
  winMeGuest = "winMeGuest",
  winNtGuest = "winNTGuest",
  win2000ProGuest = "win2000ProGuest",
  win2000ServGuest = "win2000ServGuest",
  win2000AdvServGuest = "win2000AdvServGuest",
  winXpHomeGuest = "winXPHomeGuest",
  winXpProGuest = "winXPProGuest",
  winXpPro64Guest = "winXPPro64Guest",
  winNetWebGuest = "winNetWebGuest",
  winNetStandardGuest = "winNetStandardGuest",
  winNetEnterpriseGuest = "winNetEnterpriseGuest",
  winNetDatacenterGuest = "winNetDatacenterGuest",
  winNetBusinessGuest = "winNetBusinessGuest",
  winNetStandard64Guest = "winNetStandard64Guest",
  winNetEnterprise64Guest = "winNetEnterprise64Guest",
  winLonghornGuest = "winLonghornGuest",
  winLonghorn64Guest = "winLonghorn64Guest",
  winNetDatacenter64Guest = "winNetDatacenter64Guest",
  winVistaGuest = "winVistaGuest",
  winVista64Guest = "winVista64Guest",
  windows7Guest = "windows7Guest",
  windows764Guest = "windows7_64Guest",
  windows7Server64Guest = "windows7Server64Guest",
  windows8Guest = "windows8Guest",
  windows864Guest = "windows8_64Guest",
  windows8Server64Guest = "windows8Server64Guest",
  windows9Guest = "windows9Guest",
  windows964Guest = "windows9_64Guest",
  windows9Server64Guest = "windows9Server64Guest",
  windowsHyperVGuest = "windowsHyperVGuest",
  windows2019Srv64Guest = "windows2019srv_64Guest",
  windows2019SrvNext64Guest = "windows2019srvNext_64Guest",
  freebsdGuest = "freebsdGuest",
  freebsd64Guest = "freebsd64Guest",
  freebsd11Guest = "freebsd11Guest",
  freebsd1164Guest = "freebsd11_64Guest",
  freebsd12Guest = "freebsd12Guest",
  freebsd1264Guest = "freebsd12_64Guest",
  freebsd13Guest = "freebsd13Guest",
  freebsd1364Guest = "freebsd13_64Guest",
  redhatGuest = "redhatGuest",
  rhel2Guest = "rhel2Guest",
  rhel3Guest = "rhel3Guest",
  rhel364Guest = "rhel3_64Guest",
  rhel4Guest = "rhel4Guest",
  rhel464Guest = "rhel4_64Guest",
  rhel5Guest = "rhel5Guest",
  rhel564Guest = "rhel5_64Guest",
  rhel6Guest = "rhel6Guest",
  rhel664Guest = "rhel6_64Guest",
  rhel7Guest = "rhel7Guest",
  rhel764Guest = "rhel7_64Guest",
  rhel864Guest = "rhel8_64Guest",
  rhel964Guest = "rhel9_64Guest",
  centosGuest = "centosGuest",
  centos64Guest = "centos64Guest",
  centos6Guest = "centos6Guest",
  centos664Guest = "centos6_64Guest",
  centos7Guest = "centos7Guest",
  centos764Guest = "centos7_64Guest",
  centos864Guest = "centos8_64Guest",
  centos964Guest = "centos9_64Guest",
  oracleLinuxGuest = "oracleLinuxGuest",
  oracleLinux64Guest = "oracleLinux64Guest",
  oracleLinux6Guest = "oracleLinux6Guest",
  oracleLinux664Guest = "oracleLinux6_64Guest",
  oracleLinux7Guest = "oracleLinux7Guest",
  oracleLinux764Guest = "oracleLinux7_64Guest",
  oracleLinux864Guest = "oracleLinux8_64Guest",
  oracleLinux964Guest = "oracleLinux9_64Guest",
  suseGuest = "suseGuest",
  suse64Guest = "suse64Guest",
  slesGuest = "slesGuest",
  sles64Guest = "sles64Guest",
  sles10Guest = "sles10Guest",
  sles1064Guest = "sles10_64Guest",
  sles11Guest = "sles11Guest",
  sles1164Guest = "sles11_64Guest",
  sles12Guest = "sles12Guest",
  sles1264Guest = "sles12_64Guest",
  sles1564Guest = "sles15_64Guest",
  sles1664Guest = "sles16_64Guest",
  nld9Guest = "nld9Guest",
  oesGuest = "oesGuest",
  sjdsGuest = "sjdsGuest",
  mandrakeGuest = "mandrakeGuest",
  mandrivaGuest = "mandrivaGuest",
  mandriva64Guest = "mandriva64Guest",
  turboLinuxGuest = "turboLinuxGuest",
  turboLinux64Guest = "turboLinux64Guest",
  ubuntuGuest = "ubuntuGuest",
  ubuntu64Guest = "ubuntu64Guest",
  debian4Guest = "debian4Guest",
  debian464Guest = "debian4_64Guest",
  debian5Guest = "debian5Guest",
  debian564Guest = "debian5_64Guest",
  debian6Guest = "debian6Guest",
  debian664Guest = "debian6_64Guest",
  debian7Guest = "debian7Guest",
  debian764Guest = "debian7_64Guest",
  debian8Guest = "debian8Guest",
  debian864Guest = "debian8_64Guest",
  debian9Guest = "debian9Guest",
  debian964Guest = "debian9_64Guest",
  debian10Guest = "debian10Guest",
  debian1064Guest = "debian10_64Guest",
  debian11Guest = "debian11Guest",
  debian1164Guest = "debian11_64Guest",
  asianux3Guest = "asianux3Guest",
  asianux364Guest = "asianux3_64Guest",
  asianux4Guest = "asianux4Guest",
  asianux464Guest = "asianux4_64Guest",
  asianux564Guest = "asianux5_64Guest",
  asianux764Guest = "asianux7_64Guest",
  asianux864Guest = "asianux8_64Guest",
  asianux964Guest = "asianux9_64Guest",
  opensuseGuest = "opensuseGuest",
  opensuse64Guest = "opensuse64Guest",
  fedoraGuest = "fedoraGuest",
  fedora64Guest = "fedora64Guest",
  coreos64Guest = "coreos64Guest",
  vmwarePhoton64Guest = "vmwarePhoton64Guest",
  other24XLinuxGuest = "other24xLinuxGuest",
  other26XLinuxGuest = "other26xLinuxGuest",
  otherLinuxGuest = "otherLinuxGuest",
  other3XLinuxGuest = "other3xLinuxGuest",
  other4XLinuxGuest = "other4xLinuxGuest",
  other5XLinuxGuest = "other5xLinuxGuest",
  genericLinuxGuest = "genericLinuxGuest",
  other24XLinux64Guest = "other24xLinux64Guest",
  other26XLinux64Guest = "other26xLinux64Guest",
  other3XLinux64Guest = "other3xLinux64Guest",
  other4XLinux64Guest = "other4xLinux64Guest",
  other5XLinux64Guest = "other5xLinux64Guest",
  otherLinux64Guest = "otherLinux64Guest",
  solaris6Guest = "solaris6Guest",
  solaris7Guest = "solaris7Guest",
  solaris8Guest = "solaris8Guest",
  solaris9Guest = "solaris9Guest",
  solaris10Guest = "solaris10Guest",
  solaris1064Guest = "solaris10_64Guest",
  solaris1164Guest = "solaris11_64Guest",
  os2Guest = "os2Guest",
  eComStationGuest = "eComStationGuest",
  eComStation2Guest = "eComStation2Guest",
  netware4Guest = "netware4Guest",
  netware5Guest = "netware5Guest",
  netware6Guest = "netware6Guest",
  openServer5Guest = "openServer5Guest",
  openServer6Guest = "openServer6Guest",
  unixWare7Guest = "unixWare7Guest",
  darwinGuest = "darwinGuest",
  darwin64Guest = "darwin64Guest",
  darwin10Guest = "darwin10Guest",
  darwin1064Guest = "darwin10_64Guest",
  darwin11Guest = "darwin11Guest",
  darwin1164Guest = "darwin11_64Guest",
  darwin1264Guest = "darwin12_64Guest",
  darwin1364Guest = "darwin13_64Guest",
  darwin1464Guest = "darwin14_64Guest",
  darwin1564Guest = "darwin15_64Guest",
  darwin1664Guest = "darwin16_64Guest",
  darwin1764Guest = "darwin17_64Guest",
  darwin1864Guest = "darwin18_64Guest",
  darwin1964Guest = "darwin19_64Guest",
  darwin2064Guest = "darwin20_64Guest",
  darwin2164Guest = "darwin21_64Guest",
  vmkernelGuest = "vmkernelGuest",
  vmkernel5Guest = "vmkernel5Guest",
  vmkernel6Guest = "vmkernel6Guest",
  vmkernel65Guest = "vmkernel65Guest",
  vmkernel7Guest = "vmkernel7Guest",
  amazonlinux264Guest = "amazonlinux2_64Guest",
  amazonlinux364Guest = "amazonlinux3_64Guest",
  crxPod1Guest = "crxPod1Guest",
  otherGuest = "otherGuest",
  otherGuest64 = "otherGuest64"
}
export enum GuestOsDescriptorSupportLevel {
  experimental = "experimental",
  legacy = "legacy",
  terminated = "terminated",
  supported = "supported",
  unsupported = "unsupported",
  deprecated = "deprecated",
  techPreview = "techPreview"
}
export enum VirtualMachineMetadataManagerVmMetadataOp {
  update = "Update",
  remove = "Remove"
}
export enum VirtualMachineMetadataManagerVmMetadataOwnerOwner {
  comVmwareVsphereHa = "ComVmwareVsphereHA"
}
export enum ScheduledHardwareUpgradeInfoHardwareUpgradePolicy {
  never = "never",
  onSoftPowerOff = "onSoftPowerOff",
  always = "always"
}
export enum ScheduledHardwareUpgradeInfoHardwareUpgradeStatus {
  none = "none",
  pending = "pending",
  success = "success",
  failed = "failed"
}
export enum VirtualMachineSgxInfoFlcModes {
  locked = "locked",
  unlocked = "unlocked"
}
export enum VirtualMachineTargetInfoConfigurationTag {
  compliant = "compliant",
  clusterWide = "clusterWide"
}
export enum UpgradePolicy {
  manual = "manual",
  upgradeAtPowerCycle = "upgradeAtPowerCycle"
}
export enum VirtualMachineUsbInfoFamily {
  audio = "audio",
  hid = "hid",
  hidBootable = "hid_bootable",
  physical = "physical",
  communication = "communication",
  imaging = "imaging",
  printer = "printer",
  storage = "storage",
  hub = "hub",
  smartCard = "smart_card",
  security = "security",
  video = "video",
  wireless = "wireless",
  bluetooth = "bluetooth",
  wusb = "wusb",
  pda = "pda",
  vendorSpecific = "vendor_specific",
  other = "other",
  unknownFamily = "unknownFamily"
}
export enum VirtualMachineUsbInfoSpeed {
  low = "low",
  full = "full",
  high = "high",
  superSpeed = "superSpeed",
  superSpeedPlus = "superSpeedPlus",
  unknownSpeed = "unknownSpeed"
}
export enum VirtualMachineWindowsQuiesceSpecVssBackupContext {
  ctxAuto = "ctx_auto",
  ctxBackup = "ctx_backup",
  ctxFileShareBackup = "ctx_file_share_backup"
}
export enum CheckTestType {
  sourceTests = "sourceTests",
  hostTests = "hostTests",
  resourcePoolTests = "resourcePoolTests",
  datastoreTests = "datastoreTests",
  networkTests = "networkTests"
}
export enum CustomizationNetBIOSMode {
  enableNetBiosViaDhcp = "enableNetBIOSViaDhcp",
  enableNetBios = "enableNetBIOS",
  disableNetBios = "disableNetBIOS"
}
export enum CustomizationLicenseDataMode {
  perServer = "perServer",
  perSeat = "perSeat"
}
export enum CustomizationSysprepRebootOption {
  reboot = "reboot",
  noreboot = "noreboot",
  shutdown = "shutdown"
}
export enum VirtualDeviceConnectInfoMigrateConnectOp {
  connect = "connect",
  disconnect = "disconnect",
  unset = "unset"
}
export enum VirtualDeviceConnectInfoStatus {
  ok = "ok",
  recoverableError = "recoverableError",
  unrecoverableError = "unrecoverableError",
  untried = "untried"
}
export enum VirtualDeviceFileExtension {
  iso = "iso",
  flp = "flp",
  vmdk = "vmdk",
  dsk = "dsk",
  rdm = "rdm"
}
export enum VirtualDeviceURIBackingOptionDirection {
  server = "server",
  client = "client"
}
export enum VirtualDeviceConfigSpecFileOperation {
  create = "create",
  destroy = "destroy",
  replace = "replace"
}
export enum VirtualDeviceConfigSpecOperation {
  add = "add",
  remove = "remove",
  edit = "edit"
}
export enum VirtualDiskDeltaDiskFormat {
  redoLogFormat = "redoLogFormat",
  nativeFormat = "nativeFormat",
  seSparseFormat = "seSparseFormat"
}
export enum VirtualDiskDeltaDiskFormatVariant {
  vmfsSparseVariant = "vmfsSparseVariant",
  vsanSparseVariant = "vsanSparseVariant"
}
export enum VirtualDiskSharing {
  sharingNone = "sharingNone",
  sharingMultiWriter = "sharingMultiWriter"
}
export enum VirtualDiskVFlashCacheConfigInfoCacheConsistencyType {
  strong = "strong",
  weak = "weak"
}
export enum VirtualDiskVFlashCacheConfigInfoCacheMode {
  writeThru = "write_thru",
  writeBack = "write_back"
}
export enum VirtualDiskCompatibilityMode {
  virtualMode = "virtualMode",
  physicalMode = "physicalMode"
}
export enum VirtualDiskMode {
  persistent = "persistent",
  nonpersistent = "nonpersistent",
  undoable = "undoable",
  independentPersistent = "independent_persistent",
  independentNonpersistent = "independent_nonpersistent",
  append = "append"
}
export enum VirtualEthernetCardLegacyNetworkDeviceName {
  bridged = "bridged",
  nat = "nat",
  hostonly = "hostonly"
}
export enum VirtualEthernetCardMacType {
  manual = "manual",
  generated = "generated",
  assigned = "assigned"
}
export enum VirtualPointingDeviceHostChoice {
  autodetect = "autodetect",
  intellimouseExplorer = "intellimouseExplorer",
  intellimousePs2 = "intellimousePs2",
  logitechMouseman = "logitechMouseman",
  microsoftSerial = "microsoft_serial",
  mouseSystems = "mouseSystems",
  mousemanSerial = "mousemanSerial",
  ps2 = "ps2"
}
export enum VirtualSerialPortEndPoint {
  client = "client",
  server = "server"
}
export enum VirtualMachineVMCIDeviceAction {
  allow = "allow",
  deny = "deny"
}
export enum VirtualMachineVMCIDeviceDirection {
  guest = "guest",
  host = "host",
  anyDirection = "anyDirection"
}
export enum VirtualMachineVMCIDeviceProtocol {
  hypervisor = "hypervisor",
  doorbell = "doorbell",
  queuepair = "queuepair",
  datagram = "datagram",
  stream = "stream",
  anyProtocol = "anyProtocol"
}
export enum VirtualMachineVideoCardUse3dRenderer {
  automatic = "automatic",
  software = "software",
  hardware = "hardware"
}
export enum GuestFileType {
  file = "file",
  directory = "directory",
  symlink = "symlink"
}
export enum GuestRegKeyWowSpec {
  wowNative = "WOWNative",
  wow32 = "WOW32",
  wow64 = "WOW64"
}
export enum VsanHostDecommissionModeObjectAction {
  noAction = "noAction",
  ensureObjectAccessibility = "ensureObjectAccessibility",
  evacuateAllData = "evacuateAllData"
}
export enum VsanHostDiskResultState {
  inUse = "inUse",
  eligible = "eligible",
  ineligible = "ineligible"
}
export enum VsanHostHealthState {
  unknown = "unknown",
  healthy = "healthy",
  unhealthy = "unhealthy"
}
export enum VsanHostNodeState {
  error = "error",
  disabled = "disabled",
  agent = "agent",
  master = "master",
  backup = "backup",
  starting = "starting",
  stopping = "stopping",
  enteringMaintenanceMode = "enteringMaintenanceMode",
  exitingMaintenanceMode = "exitingMaintenanceMode",
  decommissioning = "decommissioning"
}
export enum VsanDiskIssueType {
  nonExist = "nonExist",
  stampMismatch = "stampMismatch",
  unknown = "unknown"
}
export enum BaseConfigInfoDiskFileBackingInfoProvisioningType {
  thin = "thin",
  eagerZeroedThick = "eagerZeroedThick",
  lazyZeroedThick = "lazyZeroedThick"
}
export enum VStorageObjectConsumptionType {
  disk = "disk"
}
export enum vslmVStorageObjectControlFlag {
  keepAfterDeleteVm = "keepAfterDeleteVm",
  disableRelocation = "disableRelocation",
  enableChangedBlockTracking = "enableChangedBlockTracking"
}
export enum ManagedEntityStatus {
  gray = "gray",
  green = "green",
  yellow = "yellow",
  red = "red"
}
export enum TaskFilterSpecRecursionOption {
  self = "self",
  children = "children",
  all = "all"
}
export enum TaskFilterSpecTimeOption {
  queuedTime = "queuedTime",
  startedTime = "startedTime",
  completedTime = "completedTime"
}
export enum VirtualAppVAppState {
  started = "started",
  stopped = "stopped",
  starting = "starting",
  stopping = "stopping"
}
export enum VirtualDiskAdapterType {
  ide = "ide",
  busLogic = "busLogic",
  lsiLogic = "lsiLogic"
}
export enum VirtualDiskType {
  preallocated = "preallocated",
  thin = "thin",
  seSparse = "seSparse",
  rdm = "rdm",
  rdmp = "rdmp",
  raw = "raw",
  delta = "delta",
  sparse2Gb = "sparse2Gb",
  thick2Gb = "thick2Gb",
  eagerZeroedThick = "eagerZeroedThick",
  sparseMonolithic = "sparseMonolithic",
  flatMonolithic = "flatMonolithic",
  thick = "thick"
}
export enum VirtualMachineAppHeartbeatStatusType {
  appStatusGray = "appStatusGray",
  appStatusGreen = "appStatusGreen",
  appStatusRed = "appStatusRed"
}
export enum VirtualMachineConnectionState {
  connected = "connected",
  disconnected = "disconnected",
  orphaned = "orphaned",
  inaccessible = "inaccessible",
  invalid = "invalid"
}
export enum VirtualMachineCryptoState {
  unlocked = "unlocked",
  locked = "locked"
}
export enum VirtualMachineFaultToleranceState {
  notConfigured = "notConfigured",
  disabled = "disabled",
  enabled = "enabled",
  needSecondary = "needSecondary",
  starting = "starting",
  running = "running"
}
export enum VirtualMachineFaultToleranceType {
  unset = "unset",
  recordReplay = "recordReplay",
  checkpointing = "checkpointing"
}
export enum VirtualMachineMovePriority {
  lowPriority = "lowPriority",
  highPriority = "highPriority",
  defaultPriority = "defaultPriority"
}
export enum VirtualMachineNeedSecondaryReason {
  initializing = "initializing",
  divergence = "divergence",
  lostConnection = "lostConnection",
  partialHardwareFailure = "partialHardwareFailure",
  userAction = "userAction",
  checkpointError = "checkpointError",
  other = "other"
}
export enum VirtualMachinePowerState {
  poweredOff = "poweredOff",
  poweredOn = "poweredOn",
  suspended = "suspended"
}
export enum VirtualMachineRecordReplayState {
  recording = "recording",
  replaying = "replaying",
  inactive = "inactive"
}
export enum VirtualMachineTicketType {
  mks = "mks",
  device = "device",
  guestControl = "guestControl",
  webmks = "webmks",
  guestIntegrity = "guestIntegrity",
  webRemoteDevice = "webRemoteDevice"
}
export enum AlarmFilterSpecAlarmTypeByEntity {
  entityTypeAll = "entityTypeAll",
  entityTypeHost = "entityTypeHost",
  entityTypeVm = "entityTypeVm"
}
export enum AlarmFilterSpecAlarmTypeByTrigger {
  triggerTypeAll = "triggerTypeAll",
  triggerTypeEvent = "triggerTypeEvent",
  triggerTypeMetric = "triggerTypeMetric"
}
export enum EventAlarmExpressionComparisonOperator {
  equals = "equals",
  notEqualTo = "notEqualTo",
  startsWith = "startsWith",
  doesNotStartWith = "doesNotStartWith",
  endsWith = "endsWith",
  doesNotEndWith = "doesNotEndWith"
}
export enum PlacementSpecPlacementType {
  create = "create",
  reconfigure = "reconfigure",
  relocate = "relocate",
  clone = "clone"
}
export enum DistributedVirtualPortgroupBackingType {
  standard = "standard",
  nsx = "nsx"
}
export enum DistributedVirtualPortgroupMetaTagName {
  dvsName = "dvsName",
  portgroupName = "portgroupName",
  portIndex = "portIndex"
}
export enum DistributedVirtualPortgroupPortgroupType {
  earlyBinding = "earlyBinding",
  lateBinding = "lateBinding",
  ephemeral = "ephemeral"
}
export enum CryptoManagerKmipCryptoKeyStatusKeyUnavailableReason {
  keyStateMissingInCache = "KeyStateMissingInCache",
  keyStateClusterInvalid = "KeyStateClusterInvalid",
  keyStateClusterUnreachable = "KeyStateClusterUnreachable",
  keyStateMissingInKms = "KeyStateMissingInKMS",
  keyStateNotActiveOrEnabled = "KeyStateNotActiveOrEnabled",
  keyStateManagedByTrustAuthority = "KeyStateManagedByTrustAuthority"
}
export enum CustomizationFailedReasonCode {
  userDefinedScriptDisabled = "userDefinedScriptDisabled",
  customizationDisabled = "customizationDisabled"
}
export enum DvsEventPortBlockState {
  unset = "unset",
  blocked = "blocked",
  unblocked = "unblocked",
  unknown = "unknown"
}
export enum HostDasErrorEventHostDasErrorReason {
  configFailed = "configFailed",
  timeout = "timeout",
  communicationInitFailed = "communicationInitFailed",
  healthCheckScriptFailed = "healthCheckScriptFailed",
  agentFailed = "agentFailed",
  agentShutdown = "agentShutdown",
  isolationAddressUnpingable = "isolationAddressUnpingable",
  other = "other"
}
export enum HostDisconnectedEventReasonCode {
  sslThumbprintVerifyFailed = "sslThumbprintVerifyFailed",
  licenseExpired = "licenseExpired",
  agentUpgrade = "agentUpgrade",
  userRequest = "userRequest",
  insufficientLicenses = "insufficientLicenses",
  agentOutOfDate = "agentOutOfDate",
  passwordDecryptFailure = "passwordDecryptFailure",
  unknown = "unknown",
  vcVramCapacityExceeded = "vcVRAMCapacityExceeded"
}
export enum VmDasBeingResetEventReasonCode {
  vmtoolsHeartbeatFailure = "vmtoolsHeartbeatFailure",
  appHeartbeatFailure = "appHeartbeatFailure",
  appImmediateResetRequest = "appImmediateResetRequest",
  vmcpResetApdCleared = "vmcpResetApdCleared"
}
export enum CannotEnableVmcpForClusterReason {
  apdTimeoutDisabled = "APDTimeoutDisabled"
}
export enum CannotMoveFaultToleranceVmMoveType {
  resourcePool = "resourcePool",
  cluster = "cluster"
}
export enum CannotUseNetworkReason {
  networkReservationNotSupported = "NetworkReservationNotSupported",
  mismatchedNetworkPolicies = "MismatchedNetworkPolicies",
  mismatchedDvsVersionOrVendor = "MismatchedDvsVersionOrVendor",
  vMotionToUnsupportedNetworkType = "VMotionToUnsupportedNetworkType",
  networkUnderMaintenance = "NetworkUnderMaintenance",
  mismatchedEnsMode = "MismatchedEnsMode"
}
export enum DasConfigFaultDasConfigFaultReason {
  hostNetworkMisconfiguration = "HostNetworkMisconfiguration",
  hostMisconfiguration = "HostMisconfiguration",
  insufficientPrivileges = "InsufficientPrivileges",
  noPrimaryAgentAvailable = "NoPrimaryAgentAvailable",
  other = "Other",
  noDatastoresConfigured = "NoDatastoresConfigured",
  createConfigVvolFailed = "CreateConfigVvolFailed",
  vSanNotSupportedOnHost = "VSanNotSupportedOnHost",
  dasNetworkMisconfiguration = "DasNetworkMisconfiguration",
  setDesiredImageSpecFailed = "SetDesiredImageSpecFailed",
  applyHaVibsOnClusterFailed = "ApplyHAVibsOnClusterFailed"
}
export enum FtIssuesOnHostHostSelectionType {
  user = "user",
  vc = "vc",
  drs = "drs"
}
export enum HostHasComponentFailureHostComponentType {
  datastore = "Datastore"
}
export enum HostIncompatibleForFaultToleranceReason {
  product = "product",
  processor = "processor"
}
export enum HostIncompatibleForRecordReplayReason {
  product = "product",
  processor = "processor"
}
export enum NotSupportedDeviceForFTDeviceType {
  virtualVmxnet3 = "virtualVmxnet3",
  paraVirtualScsiController = "paraVirtualSCSIController"
}
export enum NumVirtualCpusIncompatibleReason {
  recordReplay = "recordReplay",
  faultTolerance = "faultTolerance"
}
export enum QuarantineModeFaultFaultType {
  noCompatibleNonQuarantinedHost = "NoCompatibleNonQuarantinedHost",
  correctionDisallowed = "CorrectionDisallowed",
  correctionImpact = "CorrectionImpact"
}
export enum ReplicationVmFaultReasonForFault {
  notConfigured = "notConfigured",
  poweredOff = "poweredOff",
  suspended = "suspended",
  poweredOn = "poweredOn",
  offlineReplicating = "offlineReplicating",
  invalidState = "invalidState",
  invalidInstanceId = "invalidInstanceId",
  closeDiskError = "closeDiskError",
  groupExist = "groupExist"
}
export enum ReplicationVmInProgressFaultActivity {
  fullSync = "fullSync",
  delta = "delta"
}
export enum VFlashModuleNotSupportedReason {
  cacheModeNotSupported = "CacheModeNotSupported",
  cacheConsistencyTypeNotSupported = "CacheConsistencyTypeNotSupported",
  cacheBlockSizeNotSupported = "CacheBlockSizeNotSupported",
  cacheReservationNotSupported = "CacheReservationNotSupported",
  diskSizeNotSupported = "DiskSizeNotSupported"
}
export enum VmFaultToleranceConfigIssueReasonForIssue {
  haNotEnabled = "haNotEnabled",
  moreThanOneSecondary = "moreThanOneSecondary",
  recordReplayNotSupported = "recordReplayNotSupported",
  replayNotSupported = "replayNotSupported",
  templateVm = "templateVm",
  multipleVcpu = "multipleVCPU",
  hostInactive = "hostInactive",
  ftUnsupportedHardware = "ftUnsupportedHardware",
  ftUnsupportedProduct = "ftUnsupportedProduct",
  missingVMotionNic = "missingVMotionNic",
  missingFtLoggingNic = "missingFTLoggingNic",
  thinDisk = "thinDisk",
  verifySslCertificateFlagNotSet = "verifySSLCertificateFlagNotSet",
  hasSnapshots = "hasSnapshots",
  noConfig = "noConfig",
  ftSecondaryVm = "ftSecondaryVm",
  hasLocalDisk = "hasLocalDisk",
  esxAgentVm = "esxAgentVm",
  video3DEnabled = "video3dEnabled",
  hasUnsupportedDisk = "hasUnsupportedDisk",
  insufficientBandwidth = "insufficientBandwidth",
  hasNestedHvConfiguration = "hasNestedHVConfiguration",
  hasVFlashConfiguration = "hasVFlashConfiguration",
  unsupportedProduct = "unsupportedProduct",
  cpuHvUnsupported = "cpuHvUnsupported",
  cpuHwmmuUnsupported = "cpuHwmmuUnsupported",
  cpuHvDisabled = "cpuHvDisabled",
  hasEfiFirmware = "hasEFIFirmware",
  tooManyVcpUs = "tooManyVCPUs",
  tooMuchMemory = "tooMuchMemory"
}
export enum VmFaultToleranceInvalidFileBackingDeviceType {
  virtualFloppy = "virtualFloppy",
  virtualCdrom = "virtualCdrom",
  virtualSerialPort = "virtualSerialPort",
  virtualParallelPort = "virtualParallelPort",
  virtualDisk = "virtualDisk"
}
export enum WillLoseHAProtectionResolution {
  svmotion = "svmotion",
  relocate = "relocate"
}
export enum HostActiveDirectoryAuthenticationCertificateDigest {
  sha1 = "SHA1"
}
export enum HostActiveDirectoryInfoDomainMembershipStatus {
  unknown = "unknown",
  ok = "ok",
  noServers = "noServers",
  clientTrustBroken = "clientTrustBroken",
  serverTrustBroken = "serverTrustBroken",
  inconsistentTrust = "inconsistentTrust",
  otherProblem = "otherProblem"
}
export enum HostDateTimeInfoProtocol {
  ntp = "ntp",
  ptp = "ptp"
}
export enum FibreChannelPortType {
  fabric = "fabric",
  loop = "loop",
  pointToPoint = "pointToPoint",
  unknown = "unknown"
}
export enum HostInternetScsiHbaChapAuthenticationType {
  chapProhibited = "chapProhibited",
  chapDiscouraged = "chapDiscouraged",
  chapPreferred = "chapPreferred",
  chapRequired = "chapRequired"
}
export enum HostInternetScsiHbaDigestType {
  digestProhibited = "digestProhibited",
  digestDiscouraged = "digestDiscouraged",
  digestPreferred = "digestPreferred",
  digestRequired = "digestRequired"
}
export enum InternetScsiSnsDiscoveryMethod {
  isnsStatic = "isnsStatic",
  isnsDhcp = "isnsDhcp",
  isnsSlp = "isnsSlp"
}
export enum SlpDiscoveryMethod {
  slpDhcp = "slpDhcp",
  slpAutoUnicast = "slpAutoUnicast",
  slpAutoMulticast = "slpAutoMulticast",
  slpManual = "slpManual"
}
export enum HostInternetScsiHbaIscsiIpv6AddressAddressConfigurationType {
  dhcp = "DHCP",
  autoConfigured = "AutoConfigured",
  static = "Static",
  other = "Other"
}
export enum HostInternetScsiHbaIscsiIpv6AddressIPv6AddressOperation {
  add = "add",
  remove = "remove"
}
export enum HostInternetScsiHbaNetworkBindingSupportType {
  notsupported = "notsupported",
  optional = "optional",
  required = "required"
}
export enum HostInternetScsiHbaStaticTargetTargetDiscoveryMethod {
  staticMethod = "staticMethod",
  sendTargetMethod = "sendTargetMethod",
  slpMethod = "slpMethod",
  isnsMethod = "isnsMethod",
  unknownMethod = "unknownMethod"
}
export enum ScsiDiskType {
  native512 = "native512",
  emulated512 = "emulated512",
  native4K = "native4k",
  softwareEmulated4K = "SoftwareEmulated4k",
  unknown = "unknown"
}
export enum HostUnresolvedVmfsExtentUnresolvedReason {
  diskIdMismatch = "diskIdMismatch",
  uuidConflict = "uuidConflict"
}
export enum HostVmfsVolumeUnmapBandwidthPolicy {
  fixed = "fixed",
  dynamic = "dynamic"
}
export enum HostVmfsVolumeUnmapPriority {
  none = "none",
  low = "low"
}
export enum HostProfileValidationFailureInfoUpdateType {
  hostBased = "HostBased",
  import = "Import",
  edit = "Edit",
  compose = "Compose"
}
export enum HostProfileValidationState {
  ready = "Ready",
  running = "Running",
  failed = "Failed"
}
export enum HostProfileManagerAnswerFileStatus {
  valid = "valid",
  invalid = "invalid",
  unknown = "unknown"
}
export enum ApplyHostProfileConfigurationResultStatus {
  success = "success",
  failed = "failed",
  rebootFailed = "reboot_failed",
  statelessRebootFailed = "stateless_reboot_failed",
  checkComplianceFailed = "check_compliance_failed",
  stateNotSatisfied = "state_not_satisfied",
  exitMaintenancemodeFailed = "exit_maintenancemode_failed",
  canceled = "canceled"
}
export enum HostProfileManagerCompositionResultResultElementStatus {
  success = "success",
  error = "error"
}
export enum HostProfileManagerCompositionValidationResultResultElementStatus {
  success = "success",
  error = "error"
}
export enum HostProfileManagerTaskListRequirement {
  maintenanceModeRequired = "maintenanceModeRequired",
  rebootRequired = "rebootRequired"
}
export enum StoragePlacementSpecPlacementType {
  create = "create",
  reconfigure = "reconfigure",
  relocate = "relocate",
  clone = "clone"
}
export enum VirtualDiskRuleSpecRuleType {
  affinity = "affinity",
  antiAffinity = "antiAffinity",
  disabled = "disabled"
}
export enum VirtualMachineRelocateDiskMoveOptions {
  moveAllDiskBackingsAndAllowSharing = "moveAllDiskBackingsAndAllowSharing",
  moveAllDiskBackingsAndDisallowSharing = "moveAllDiskBackingsAndDisallowSharing",
  moveChildMostDiskBacking = "moveChildMostDiskBacking",
  createNewChildDiskBacking = "createNewChildDiskBacking",
  moveAllDiskBackingsAndConsolidate = "moveAllDiskBackingsAndConsolidate"
}
export enum VirtualMachineRelocateTransformation {
  flat = "flat",
  sparse = "sparse"
}
export enum VirtualMachineScsiPassthroughType {
  disk = "disk",
  tape = "tape",
  printer = "printer",
  processor = "processor",
  worm = "worm",
  cdrom = "cdrom",
  scanner = "scanner",
  optical = "optical",
  media = "media",
  com = "com",
  raid = "raid",
  unknown = "unknown"
}
export enum VirtualSCSISharing {
  noSharing = "noSharing",
  virtualSharing = "virtualSharing",
  physicalSharing = "physicalSharing"
}
export enum VirtualVmxnet3VrdmaOptionDeviceProtocols {
  rocev1 = "rocev1",
  rocev2 = "rocev2"
}
export enum ComputeResourceHostSPBMLicenseInfoHostSPBMLicenseState {
  licensed = "licensed",
  unlicensed = "unlicensed",
  unknown = "unknown"
}
export enum DatastoreAccessible {
  true = "True",
  false = "False"
}
export enum DatastoreSummaryMaintenanceModeState {
  normal = "normal",
  enteringMaintenance = "enteringMaintenance",
  inMaintenance = "inMaintenance"
}
export enum DistributedVirtualSwitchHostInfrastructureTrafficClass {
  management = "management",
  faultTolerance = "faultTolerance",
  vmotion = "vmotion",
  virtualMachine = "virtualMachine",
  iScsi = "iSCSI",
  nfs = "nfs",
  hbr = "hbr",
  vsan = "vsan",
  vdp = "vdp",
  backupNfc = "backupNfc"
}
export enum DistributedVirtualSwitchNetworkResourceControlVersion {
  version2 = "version2",
  version3 = "version3"
}
export enum DistributedVirtualSwitchNicTeamingPolicyMode {
  loadbalanceIp = "loadbalance_ip",
  loadbalanceSrcmac = "loadbalance_srcmac",
  loadbalanceSrcid = "loadbalance_srcid",
  failoverExplicit = "failover_explicit",
  loadbalanceLoadbased = "loadbalance_loadbased"
}
export enum DistributedVirtualSwitchProductSpecOperationType {
  preInstall = "preInstall",
  upgrade = "upgrade",
  notifyAvailableUpgrade = "notifyAvailableUpgrade",
  proceedWithUpgrade = "proceedWithUpgrade",
  updateBundleInfo = "updateBundleInfo"
}
export enum FolderDesiredHostState {
  maintenance = "maintenance",
  nonMaintenance = "non_maintenance"
}
export enum HostSystemConnectionState {
  connected = "connected",
  notResponding = "notResponding",
  disconnected = "disconnected"
}
export enum HostCryptoState {
  incapable = "incapable",
  prepared = "prepared",
  safe = "safe",
  pendingIncapable = "pendingIncapable"
}
export enum HostSystemPowerState {
  poweredOn = "poweredOn",
  poweredOff = "poweredOff",
  standBy = "standBy",
  unknown = "unknown"
}
export enum HostSystemRemediationStateState {
  remediationReady = "remediationReady",
  precheckRemediationRunning = "precheckRemediationRunning",
  precheckRemediationComplete = "precheckRemediationComplete",
  precheckRemediationFailed = "precheckRemediationFailed",
  remediationRunning = "remediationRunning",
  remediationFailed = "remediationFailed"
}
export enum HostStandbyMode {
  entering = "entering",
  exiting = "exiting",
  in = "in",
  none = "none"
}
export enum VMotionCompatibilityType {
  cpu = "cpu",
  software = "software"
}
export enum ValidateMigrationTestType {
  sourceTests = "sourceTests",
  compatibilityTests = "compatibilityTests",
  diskAccessibilityTests = "diskAccessibilityTests",
  resourceTests = "resourceTests"
}
export enum VMwareDvsLacpApiVersion {
  singleLag = "singleLag",
  multipleLag = "multipleLag"
}
export enum VMwareDvsLacpLoadBalanceAlgorithm {
  srcMac = "srcMac",
  destMac = "destMac",
  srcDestMac = "srcDestMac",
  destIpVlan = "destIpVlan",
  srcIpVlan = "srcIpVlan",
  srcDestIpVlan = "srcDestIpVlan",
  destTcpUdpPort = "destTcpUdpPort",
  srcTcpUdpPort = "srcTcpUdpPort",
  srcDestTcpUdpPort = "srcDestTcpUdpPort",
  destIpTcpUdpPort = "destIpTcpUdpPort",
  srcIpTcpUdpPort = "srcIpTcpUdpPort",
  srcDestIpTcpUdpPort = "srcDestIpTcpUdpPort",
  destIpTcpUdpPortVlan = "destIpTcpUdpPortVlan",
  srcIpTcpUdpPortVlan = "srcIpTcpUdpPortVlan",
  srcDestIpTcpUdpPortVlan = "srcDestIpTcpUdpPortVlan",
  destIp = "destIp",
  srcIp = "srcIp",
  srcDestIp = "srcDestIp",
  vlan = "vlan",
  srcPortId = "srcPortId"
}
export enum DVSMacLimitPolicyType {
  allow = "allow",
  drop = "drop"
}
export enum VMwareDvsMulticastFilteringMode {
  legacyFiltering = "legacyFiltering",
  snooping = "snooping"
}
export enum VmwareDistributedVirtualSwitchPvlanPortType {
  promiscuous = "promiscuous",
  isolated = "isolated",
  community = "community"
}
export enum VMwareDVSTeamingMatchStatus {
  iphashMatch = "iphashMatch",
  nonIphashMatch = "nonIphashMatch",
  iphashMismatch = "iphashMismatch",
  nonIphashMismatch = "nonIphashMismatch"
}
export enum VMwareUplinkLacpMode {
  active = "active",
  passive = "passive"
}
export enum VMwareDVSVspanSessionEncapType {
  gre = "gre",
  erspan2 = "erspan2",
  erspan3 = "erspan3"
}
export enum VMwareDVSVspanSessionType {
  mixedDestMirror = "mixedDestMirror",
  dvPortMirror = "dvPortMirror",
  remoteMirrorSource = "remoteMirrorSource",
  remoteMirrorDest = "remoteMirrorDest",
  encapsulatedRemoteMirrorSource = "encapsulatedRemoteMirrorSource"
}
export enum AffinityType {
  memory = "memory",
  cpu = "cpu"
}
export enum AgentInstallFailedReason {
  notEnoughSpaceOnDevice = "NotEnoughSpaceOnDevice",
  prepareToUpgradeFailed = "PrepareToUpgradeFailed",
  agentNotRunning = "AgentNotRunning",
  agentNotReachable = "AgentNotReachable",
  installTimedout = "InstallTimedout",
  signatureVerificationFailed = "SignatureVerificationFailed",
  agentUploadFailed = "AgentUploadFailed",
  agentUploadTimedout = "AgentUploadTimedout",
  unknownInstallerError = "UnknownInstallerError"
}
export enum CannotPowerOffVmInClusterOperation {
  suspend = "suspend",
  powerOff = "powerOff",
  guestShutdown = "guestShutdown",
  guestSuspend = "guestSuspend"
}
export enum DeviceNotSupportedReason {
  host = "host",
  guest = "guest"
}
export enum IncompatibleHostForVmReplicationIncompatibleReason {
  rpo = "rpo",
  netCompression = "netCompression"
}
export enum ReplicationDiskConfigFaultReasonForFault {
  diskNotFound = "diskNotFound",
  diskTypeNotSupported = "diskTypeNotSupported",
  invalidDiskKey = "invalidDiskKey",
  invalidDiskReplicationId = "invalidDiskReplicationId",
  duplicateDiskReplicationId = "duplicateDiskReplicationId",
  invalidPersistentFilePath = "invalidPersistentFilePath",
  reconfigureDiskReplicationIdNotAllowed = "reconfigureDiskReplicationIdNotAllowed"
}
export enum ReplicationVmConfigFaultReasonForFault {
  incompatibleHwVersion = "incompatibleHwVersion",
  invalidVmReplicationId = "invalidVmReplicationId",
  invalidGenerationNumber = "invalidGenerationNumber",
  outOfBoundsRpoValue = "outOfBoundsRpoValue",
  invalidDestinationIpAddress = "invalidDestinationIpAddress",
  invalidDestinationPort = "invalidDestinationPort",
  invalidExtraVmOptions = "invalidExtraVmOptions",
  staleGenerationNumber = "staleGenerationNumber",
  reconfigureVmReplicationIdNotAllowed = "reconfigureVmReplicationIdNotAllowed",
  cannotRetrieveVmReplicationConfiguration = "cannotRetrieveVmReplicationConfiguration",
  replicationAlreadyEnabled = "replicationAlreadyEnabled",
  invalidPriorConfiguration = "invalidPriorConfiguration",
  replicationNotEnabled = "replicationNotEnabled",
  replicationConfigurationFailed = "replicationConfigurationFailed",
  encryptedVm = "encryptedVm",
  invalidThumbprint = "invalidThumbprint",
  incompatibleDevice = "incompatibleDevice"
}
export enum DiagnosticPartitionType {
  singleHost = "singleHost",
  multiHost = "multiHost"
}
export enum DiagnosticPartitionStorageType {
  directAttached = "directAttached",
  networkAttached = "networkAttached"
}
export enum HostRuntimeInfoNetStackInstanceRuntimeInfoState {
  inactive = "inactive",
  active = "active",
  deactivating = "deactivating",
  activating = "activating"
}
export enum ClusterComputeResourceHCIWorkflowState {
  inProgress = "in_progress",
  done = "done",
  invalid = "invalid"
}
export enum DayOfWeek {
  sunday = "sunday",
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday"
}
export enum WeekOfMonth {
  first = "first",
  second = "second",
  third = "third",
  fourth = "fourth",
  last = "last"
}
export class PropertyCollector extends ManagedObject {
  filter?: PropertyFilter[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<PropertyCollector>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { filter: PropertyFilter });
    }
  }
  async createFilter(args: {
  spec: PropertyFilterSpec;
    partialUpdates: boolean
}): Promise<PropertyFilter> {
    const result = await this.connection.exec<{
  spec: PropertyFilterSpec;
    partialUpdates: boolean
} & { _this: ObjectReference }, PropertyFilter>(
      "CreateFilter", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new PropertyFilter(this.connection, result);
  }
  async retrieveContents(args: {
  specSet: PropertyFilterSpec[]
}): Promise<ObjectContent[] | undefined> {
    const result = await this.connection.exec<{
  specSet: PropertyFilterSpec[]
} & { _this: ObjectReference }, ObjectContent[] | undefined>(
      "RetrieveProperties", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async checkForUpdates(args: {
  version?: string
}): Promise<UpdateSet | undefined> {
    const result = await this.connection.exec<{
  version?: string
} & { _this: ObjectReference }, UpdateSet | undefined>(
      "CheckForUpdates", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { version: undefined,
        filterSet: undefined,
        truncated: undefined });
  }
  async waitForUpdates(args: {
  version?: string
}): Promise<UpdateSet> {
    const result = await this.connection.exec<{
  version?: string
} & { _this: ObjectReference }, UpdateSet>(
      "WaitForUpdates", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { version: undefined,
        filterSet: undefined,
        truncated: undefined });
  }
  async cancelWaitForUpdates(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "CancelWaitForUpdates", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async waitForUpdatesEx(args: {
  version?: string;
    options?: WaitOptions
}): Promise<UpdateSet | undefined> {
    const result = await this.connection.exec<{
  version?: string;
    options?: WaitOptions
} & { _this: ObjectReference }, UpdateSet | undefined>(
      "WaitForUpdatesEx", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { version: undefined,
        filterSet: undefined,
        truncated: undefined });
  }
  async retrievePropertiesEx(args: {
  specSet: PropertyFilterSpec[];
    options: RetrieveOptions
}): Promise<RetrieveResult | undefined> {
    const result = await this.connection.exec<{
  specSet: PropertyFilterSpec[];
    options: RetrieveOptions
} & { _this: ObjectReference }, RetrieveResult | undefined>(
      "RetrievePropertiesEx", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { token: undefined,
        objects: undefined });
  }
  async continueRetrievePropertiesEx(args: {
  token: string
}): Promise<RetrieveResult> {
    const result = await this.connection.exec<{
  token: string
} & { _this: ObjectReference }, RetrieveResult>(
      "ContinueRetrievePropertiesEx", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { token: undefined,
        objects: undefined });
  }
  async cancelRetrievePropertiesEx(args: {
  token: string
}): Promise<void> {
    const result = await this.connection.exec<{
  token: string
} & { _this: ObjectReference }, void>(
      "CancelRetrievePropertiesEx", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createPropertyCollector(): Promise<PropertyCollector> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, PropertyCollector>(
      "CreatePropertyCollector", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value },  }
    ).then(r => r.result);
    return new PropertyCollector(this.connection, result);
  }
  async destroy(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyPropertyCollector", { _this: { attributes: { type: "PropertyCollector" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class PropertyFilter extends ManagedObject {
  spec!: PropertyFilterSpec;
  partialUpdates!: boolean;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<PropertyFilter>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async destroy(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyPropertyFilter", { _this: { attributes: { type: "PropertyFilter" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class CertificateManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<CertificateManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async refreshCACertificatesAndCRLs(args: {
  host: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "CertMgrRefreshCACertificatesAndCRLs_Task", { _this: { attributes: { type: "CertificateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async refreshCertificates(args: {
  host: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "CertMgrRefreshCertificates_Task", { _this: { attributes: { type: "CertificateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async revokeCertificates(args: {
  host: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "CertMgrRevokeCertificates_Task", { _this: { attributes: { type: "CertificateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class CustomFieldsManager extends ManagedObject {
  field?: CustomFieldDef[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<CustomFieldsManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addFieldDefinition(args: {
  name: string;
    moType?: string;
    fieldDefPolicy?: PrivilegePolicyDef;
    fieldPolicy?: PrivilegePolicyDef
}): Promise<CustomFieldDef> {
    const result = await this.connection.exec<{
  name: string;
    moType?: string;
    fieldDefPolicy?: PrivilegePolicyDef;
    fieldPolicy?: PrivilegePolicyDef
} & { _this: ObjectReference }, CustomFieldDef>(
      "AddCustomFieldDef", { _this: { attributes: { type: "CustomFieldsManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        name: undefined,
        type: undefined,
        managedObjectType: undefined,
        fieldDefPrivileges: undefined,
        fieldInstancePrivileges: undefined });
  }
  async removeFieldDefinition(args: {
  key: number
}): Promise<void> {
    const result = await this.connection.exec<{
  key: number
} & { _this: ObjectReference }, void>(
      "RemoveCustomFieldDef", { _this: { attributes: { type: "CustomFieldsManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async renameFieldDefinition(args: {
  key: number;
    name: string
}): Promise<void> {
    const result = await this.connection.exec<{
  key: number;
    name: string
} & { _this: ObjectReference }, void>(
      "RenameCustomFieldDef", { _this: { attributes: { type: "CustomFieldsManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setField(args: {
  entity: ManagedEntity;
    key: number;
    value: string
}): Promise<void> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    key: number;
    value: string
} & { _this: ObjectReference }, void>(
      "SetField", { _this: { attributes: { type: "CustomFieldsManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class CustomizationSpecManager extends ManagedObject {
  info?: CustomizationSpecInfo[];
  encryptionKey?: number[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<CustomizationSpecManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async checkResources(args: {
  guestOs: string
}): Promise<void> {
    const result = await this.connection.exec<{
  guestOs: string
} & { _this: ObjectReference }, void>(
      "CheckCustomizationResources", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async create(args: {
  item: CustomizationSpecItem
}): Promise<void> {
    const result = await this.connection.exec<{
  item: CustomizationSpecItem
} & { _this: ObjectReference }, void>(
      "CreateCustomizationSpec", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async specItemToXml(args: {
  item: CustomizationSpecItem
}): Promise<string> {
    const result = await this.connection.exec<{
  item: CustomizationSpecItem
} & { _this: ObjectReference }, string>(
      "CustomizationSpecItemToXml", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async delete(args: {
  name: string
}): Promise<void> {
    const result = await this.connection.exec<{
  name: string
} & { _this: ObjectReference }, void>(
      "DeleteCustomizationSpec", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async exists(args: {
  name: string
}): Promise<boolean> {
    const result = await this.connection.exec<{
  name: string
} & { _this: ObjectReference }, boolean>(
      "DoesCustomizationSpecExist", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async duplicate(args: {
  name: string;
    newName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  name: string;
    newName: string
} & { _this: ObjectReference }, void>(
      "DuplicateCustomizationSpec", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async get(args: {
  name: string
}): Promise<CustomizationSpecItem> {
    const result = await this.connection.exec<{
  name: string
} & { _this: ObjectReference }, CustomizationSpecItem>(
      "GetCustomizationSpec", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { info: undefined,
        spec: undefined });
  }
  async overwrite(args: {
  item: CustomizationSpecItem
}): Promise<void> {
    const result = await this.connection.exec<{
  item: CustomizationSpecItem
} & { _this: ObjectReference }, void>(
      "OverwriteCustomizationSpec", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async rename(args: {
  name: string;
    newName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  name: string;
    newName: string
} & { _this: ObjectReference }, void>(
      "RenameCustomizationSpec", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async xmlToSpecItem(args: {
  specItemXml: string
}): Promise<CustomizationSpecItem> {
    const result = await this.connection.exec<{
  specItemXml: string
} & { _this: ObjectReference }, CustomizationSpecItem>(
      "XmlToCustomizationSpecItem", { _this: { attributes: { type: "CustomizationSpecManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { info: undefined,
        spec: undefined });
  };
}
export class DatastoreNamespaceManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<DatastoreNamespaceManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async ConvertNamespacePathToUuidPath(args: {
  datacenter?: Datacenter;
    namespaceUrl: string
}): Promise<string> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    namespaceUrl: string
} & { _this: ObjectReference }, string>(
      "ConvertNamespacePathToUuidPath", { _this: { attributes: { type: "DatastoreNamespaceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async CreateDirectory(args: {
  datastore: Datastore;
    displayName?: string;
    policy?: string
}): Promise<string> {
    const result = await this.connection.exec<{
  datastore: Datastore;
    displayName?: string;
    policy?: string
} & { _this: ObjectReference }, string>(
      "CreateDirectory", { _this: { attributes: { type: "DatastoreNamespaceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async DeleteDirectory(args: {
  datacenter?: Datacenter;
    datastorePath: string
}): Promise<void> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    datastorePath: string
} & { _this: ObjectReference }, void>(
      "DeleteDirectory", { _this: { attributes: { type: "DatastoreNamespaceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class DiagnosticManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<DiagnosticManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async browse(args: {
  host?: HostSystem;
    key: string;
    start?: number;
    lines?: number
}): Promise<DiagnosticManagerLogHeader> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    key: string;
    start?: number;
    lines?: number
} & { _this: ObjectReference }, DiagnosticManagerLogHeader>(
      "BrowseDiagnosticLog", { _this: { attributes: { type: "DiagnosticManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { lineStart: undefined,
        lineEnd: undefined,
        lineText: undefined });
  }
  async generateLogBundles(args: {
  includeDefault: boolean;
    host?: HostSystem[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  includeDefault: boolean;
    host?: HostSystem[]
} & { _this: ObjectReference }, Task | undefined>(
      "GenerateLogBundles_Task", { _this: { attributes: { type: "DiagnosticManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryDescriptions(args: {
  host?: HostSystem
}): Promise<DiagnosticManagerLogDescriptor[] | undefined> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, DiagnosticManagerLogDescriptor[] | undefined>(
      "QueryDescriptions", { _this: { attributes: { type: "DiagnosticManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class EnvironmentBrowser extends ManagedObject {
  datastoreBrowser?: HostDatastoreBrowser;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<EnvironmentBrowser>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { datastoreBrowser: HostDatastoreBrowser });
    }
  }
  async queryConfigOption(args: {
  key?: string;
    host?: HostSystem
}): Promise<VirtualMachineConfigOption | undefined> {
    const result = await this.connection.exec<{
  key?: string;
    host?: HostSystem
} & { _this: ObjectReference }, VirtualMachineConfigOption | undefined>(
      "QueryConfigOption", { _this: { attributes: { type: "EnvironmentBrowser" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { version: undefined,
        description: undefined,
        guestOSDescriptor: undefined,
        guestOSDefaultIndex: undefined,
        hardwareOptions: undefined,
        capabilities: undefined,
        datastore: undefined,
        defaultDevice: undefined,
        supportedMonitorType: undefined,
        supportedOvfEnvironmentTransport: undefined,
        supportedOvfInstallTransport: undefined,
        propertyRelations: undefined });
  }
  async queryConfigOptionDescriptor(): Promise<VirtualMachineConfigOptionDescriptor[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VirtualMachineConfigOptionDescriptor[] | undefined>(
      "QueryConfigOptionDescriptor", { _this: { attributes: { type: "EnvironmentBrowser" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryConfigOptionEx(args: {
  spec?: EnvironmentBrowserConfigOptionQuerySpec
}): Promise<VirtualMachineConfigOption | undefined> {
    const result = await this.connection.exec<{
  spec?: EnvironmentBrowserConfigOptionQuerySpec
} & { _this: ObjectReference }, VirtualMachineConfigOption | undefined>(
      "QueryConfigOptionEx", { _this: { attributes: { type: "EnvironmentBrowser" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { version: undefined,
        description: undefined,
        guestOSDescriptor: undefined,
        guestOSDefaultIndex: undefined,
        hardwareOptions: undefined,
        capabilities: undefined,
        datastore: undefined,
        defaultDevice: undefined,
        supportedMonitorType: undefined,
        supportedOvfEnvironmentTransport: undefined,
        supportedOvfInstallTransport: undefined,
        propertyRelations: undefined });
  }
  async queryConfigTarget(args: {
  host?: HostSystem
}): Promise<ConfigTarget | undefined> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, ConfigTarget | undefined>(
      "QueryConfigTarget", { _this: { attributes: { type: "EnvironmentBrowser" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { numCpus: undefined,
        numCpuCores: undefined,
        numNumaNodes: undefined,
        maxCpusPerHost: undefined,
        smcPresent: undefined,
        datastore: undefined,
        network: undefined,
        opaqueNetwork: undefined,
        distributedVirtualPortgroup: undefined,
        distributedVirtualSwitch: undefined,
        cdRom: undefined,
        serial: undefined,
        parallel: undefined,
        sound: undefined,
        usb: undefined,
        floppy: undefined,
        legacyNetworkInfo: undefined,
        scsiPassthrough: undefined,
        scsiDisk: undefined,
        ideDisk: undefined,
        maxMemMBOptimalPerf: undefined,
        supportedMaxMemMB: undefined,
        resourcePool: undefined,
        autoVmotion: undefined,
        pciPassthrough: undefined,
        sriov: undefined,
        vFlashModule: undefined,
        sharedGpuPassthroughTypes: undefined,
        availablePersistentMemoryReservationMB: undefined,
        dynamicPassthrough: undefined,
        sgxTargetInfo: undefined,
        precisionClockInfo: undefined,
        sevSupported: undefined });
  }
  async queryTargetCapabilities(args: {
  host?: HostSystem
}): Promise<HostCapability | undefined> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, HostCapability | undefined>(
      "QueryTargetCapabilities", { _this: { attributes: { type: "EnvironmentBrowser" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { recursiveResourcePoolsSupported: undefined,
        cpuMemoryResourceConfigurationSupported: undefined,
        rebootSupported: undefined,
        shutdownSupported: undefined,
        vmotionSupported: undefined,
        standbySupported: undefined,
        ipmiSupported: undefined,
        maxSupportedVMs: undefined,
        maxRunningVMs: undefined,
        maxSupportedVcpus: undefined,
        maxRegisteredVMs: undefined,
        datastorePrincipalSupported: undefined,
        sanSupported: undefined,
        nfsSupported: undefined,
        iscsiSupported: undefined,
        vlanTaggingSupported: undefined,
        nicTeamingSupported: undefined,
        highGuestMemSupported: undefined,
        maintenanceModeSupported: undefined,
        suspendedRelocateSupported: undefined,
        restrictedSnapshotRelocateSupported: undefined,
        perVmSwapFiles: undefined,
        localSwapDatastoreSupported: undefined,
        unsharedSwapVMotionSupported: undefined,
        backgroundSnapshotsSupported: undefined,
        preAssignedPCIUnitNumbersSupported: undefined,
        screenshotSupported: undefined,
        scaledScreenshotSupported: undefined,
        storageVMotionSupported: undefined,
        vmotionWithStorageVMotionSupported: undefined,
        vmotionAcrossNetworkSupported: undefined,
        maxNumDisksSVMotion: undefined,
        hbrNicSelectionSupported: undefined,
        vrNfcNicSelectionSupported: undefined,
        recordReplaySupported: undefined,
        ftSupported: undefined,
        replayUnsupportedReason: undefined,
        replayCompatibilityIssues: undefined,
        smpFtSupported: undefined,
        ftCompatibilityIssues: undefined,
        smpFtCompatibilityIssues: undefined,
        maxVcpusPerFtVm: undefined,
        loginBySSLThumbprintSupported: undefined,
        cloneFromSnapshotSupported: undefined,
        deltaDiskBackingsSupported: undefined,
        perVMNetworkTrafficShapingSupported: undefined,
        tpmSupported: undefined,
        tpmVersion: undefined,
        txtEnabled: undefined,
        supportedCpuFeature: undefined,
        virtualExecUsageSupported: undefined,
        storageIORMSupported: undefined,
        vmDirectPathGen2Supported: undefined,
        vmDirectPathGen2UnsupportedReason: undefined,
        vmDirectPathGen2UnsupportedReasonExtended: undefined,
        supportedVmfsMajorVersion: undefined,
        vStorageCapable: undefined,
        snapshotRelayoutSupported: undefined,
        firewallIpRulesSupported: undefined,
        servicePackageInfoSupported: undefined,
        maxHostRunningVms: undefined,
        maxHostSupportedVcpus: undefined,
        vmfsDatastoreMountCapable: undefined,
        eightPlusHostVmfsSharedAccessSupported: undefined,
        nestedHVSupported: undefined,
        vPMCSupported: undefined,
        interVMCommunicationThroughVMCISupported: undefined,
        scheduledHardwareUpgradeSupported: undefined,
        featureCapabilitiesSupported: undefined,
        latencySensitivitySupported: undefined,
        storagePolicySupported: undefined,
        accel3dSupported: undefined,
        reliableMemoryAware: undefined,
        multipleNetworkStackInstanceSupported: undefined,
        messageBusProxySupported: undefined,
        vsanSupported: undefined,
        vFlashSupported: undefined,
        hostAccessManagerSupported: undefined,
        provisioningNicSelectionSupported: undefined,
        nfs41Supported: undefined,
        nfs41Krb5iSupported: undefined,
        turnDiskLocatorLedSupported: undefined,
        virtualVolumeDatastoreSupported: undefined,
        markAsSsdSupported: undefined,
        markAsLocalSupported: undefined,
        smartCardAuthenticationSupported: undefined,
        pMemSupported: undefined,
        pMemSnapshotSupported: undefined,
        cryptoSupported: undefined,
        oneKVolumeAPIsSupported: undefined,
        gatewayOnNicSupported: undefined,
        upitSupported: undefined,
        cpuHwMmuSupported: undefined,
        encryptedVMotionSupported: undefined,
        encryptionChangeOnAddRemoveSupported: undefined,
        encryptionHotOperationSupported: undefined,
        encryptionWithSnapshotsSupported: undefined,
        encryptionFaultToleranceSupported: undefined,
        encryptionMemorySaveSupported: undefined,
        encryptionRDMSupported: undefined,
        encryptionVFlashSupported: undefined,
        encryptionCBRCSupported: undefined,
        encryptionHBRSupported: undefined,
        ftEfiSupported: undefined,
        unmapMethodSupported: undefined,
        maxMemMBPerFtVm: undefined,
        virtualMmuUsageIgnored: undefined,
        virtualExecUsageIgnored: undefined,
        vmCreateDateSupported: undefined,
        vmfs3EOLSupported: undefined,
        ftVmcpSupported: undefined,
        quickBootSupported: undefined,
        assignableHardwareSupported: undefined,
        useFeatureReqsForOldHWv: undefined,
        markPerenniallyReservedSupported: undefined,
        hppPspSupported: undefined,
        deviceRebindWithoutRebootSupported: undefined,
        storagePolicyChangeSupported: undefined,
        precisionTimeProtocolSupported: undefined,
        remoteDeviceVMotionSupported: undefined,
        maxSupportedVmMemory: undefined });
  };
}
export class ExtensibleManagedObject extends ManagedObject {
  value?: CustomFieldValue[];
  availableField?: CustomFieldDef[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ExtensibleManagedObject>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async setCustomValue(args: {
  key: string;
    value: string
}): Promise<void> {
    const result = await this.connection.exec<{
  key: string;
    value: string
} & { _this: ObjectReference }, void>(
      "setCustomValue", { _this: { attributes: { type: "ExtensibleManagedObject" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ExtensionManager extends ManagedObject {
  extensionList?: Extension[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ExtensionManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async findExtension(args: {
  extensionKey: string
}): Promise<Extension | undefined> {
    const result = await this.connection.exec<{
  extensionKey: string
} & { _this: ObjectReference }, Extension | undefined>(
      "FindExtension", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { description: undefined,
        key: undefined,
        company: undefined,
        type: undefined,
        version: undefined,
        subjectName: undefined,
        server: undefined,
        client: undefined,
        taskList: undefined,
        eventList: undefined,
        faultList: undefined,
        privilegeList: undefined,
        resourceList: undefined,
        lastHeartbeatTime: undefined,
        healthInfo: undefined,
        ovfConsumerInfo: undefined,
        extendedProductInfo: undefined,
        managedEntityInfo: undefined,
        shownInSolutionManager: undefined,
        solutionManagerInfo: undefined });
  }
  async getPublicKey(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "GetPublicKey", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryExtensionIpAllocationUsage(args: {
  extensionKeys?: string[]
}): Promise<ExtensionManagerIpAllocationUsage[] | undefined> {
    const result = await this.connection.exec<{
  extensionKeys?: string[]
} & { _this: ObjectReference }, ExtensionManagerIpAllocationUsage[] | undefined>(
      "QueryExtensionIpAllocationUsage", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryManagedBy(args: {
  extensionKey: string
}): Promise<ManagedEntity[] | undefined> {
    const result = await this.connection.exec<{
  extensionKey: string
} & { _this: ObjectReference }, ManagedEntity[] | undefined>(
      "QueryManagedBy", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async registerExtension(args: {
  extension: Extension
}): Promise<void> {
    const result = await this.connection.exec<{
  extension: Extension
} & { _this: ObjectReference }, void>(
      "RegisterExtension", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setCertificate(args: {
  extensionKey: string;
    certificatePem?: string
}): Promise<void> {
    const result = await this.connection.exec<{
  extensionKey: string;
    certificatePem?: string
} & { _this: ObjectReference }, void>(
      "SetExtensionCertificate", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setPublicKey(args: {
  extensionKey: string;
    publicKey: string
}): Promise<void> {
    const result = await this.connection.exec<{
  extensionKey: string;
    publicKey: string
} & { _this: ObjectReference }, void>(
      "SetPublicKey", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unregisterExtension(args: {
  extensionKey: string
}): Promise<void> {
    const result = await this.connection.exec<{
  extensionKey: string
} & { _this: ObjectReference }, void>(
      "UnregisterExtension", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateExtension(args: {
  extension: Extension
}): Promise<void> {
    const result = await this.connection.exec<{
  extension: Extension
} & { _this: ObjectReference }, void>(
      "UpdateExtension", { _this: { attributes: { type: "ExtensionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class FileManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<FileManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async changeOwner(args: {
  name: string;
    datacenter?: Datacenter;
    owner: string
}): Promise<void> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter;
    owner: string
} & { _this: ObjectReference }, void>(
      "ChangeOwner", { _this: { attributes: { type: "FileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async copyFile(args: {
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destinationName: string;
    destinationDatacenter?: Datacenter;
    force?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destinationName: string;
    destinationDatacenter?: Datacenter;
    force?: boolean
} & { _this: ObjectReference }, Task>(
      "CopyDatastoreFile_Task", { _this: { attributes: { type: "FileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteFile(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, Task>(
      "DeleteDatastoreFile_Task", { _this: { attributes: { type: "FileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async makeDirectory(args: {
  name: string;
    datacenter?: Datacenter;
    createParentDirectories?: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter;
    createParentDirectories?: boolean
} & { _this: ObjectReference }, void>(
      "MakeDirectory", { _this: { attributes: { type: "FileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async moveFile(args: {
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destinationName: string;
    destinationDatacenter?: Datacenter;
    force?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destinationName: string;
    destinationDatacenter?: Datacenter;
    force?: boolean
} & { _this: ObjectReference }, Task>(
      "MoveDatastoreFile_Task", { _this: { attributes: { type: "FileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HealthUpdateManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HealthUpdateManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addFilter(args: {
  providerId: string;
    filterName: string;
    infoIds?: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  providerId: string;
    filterName: string;
    infoIds?: string[]
} & { _this: ObjectReference }, string>(
      "AddFilter", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addFilterEntities(args: {
  filterId: string;
    entities?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  filterId: string;
    entities?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "AddFilterEntities", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addMonitoredEntities(args: {
  providerId: string;
    entities?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  providerId: string;
    entities?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "AddMonitoredEntities", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async hasMonitoredEntity(args: {
  providerId: string;
    entity: ManagedEntity
}): Promise<boolean> {
    const result = await this.connection.exec<{
  providerId: string;
    entity: ManagedEntity
} & { _this: ObjectReference }, boolean>(
      "HasMonitoredEntity", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async hasProvider(args: {
  id: string
}): Promise<boolean> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, boolean>(
      "HasProvider", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async postHealthUpdates(args: {
  providerId: string;
    updates?: HealthUpdate[]
}): Promise<void> {
    const result = await this.connection.exec<{
  providerId: string;
    updates?: HealthUpdate[]
} & { _this: ObjectReference }, void>(
      "PostHealthUpdates", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryFilterEntities(args: {
  filterId: string
}): Promise<ManagedEntity[] | undefined> {
    const result = await this.connection.exec<{
  filterId: string
} & { _this: ObjectReference }, ManagedEntity[] | undefined>(
      "QueryFilterEntities", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryFilterInfoIds(args: {
  filterId: string
}): Promise<string[] | undefined> {
    const result = await this.connection.exec<{
  filterId: string
} & { _this: ObjectReference }, string[] | undefined>(
      "QueryFilterInfoIds", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryFilterList(args: {
  providerId: string
}): Promise<string[] | undefined> {
    const result = await this.connection.exec<{
  providerId: string
} & { _this: ObjectReference }, string[] | undefined>(
      "QueryFilterList", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryFilterName(args: {
  filterId: string
}): Promise<string> {
    const result = await this.connection.exec<{
  filterId: string
} & { _this: ObjectReference }, string>(
      "QueryFilterName", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryHealthUpdateInfos(args: {
  providerId: string
}): Promise<HealthUpdateInfo[] | undefined> {
    const result = await this.connection.exec<{
  providerId: string
} & { _this: ObjectReference }, HealthUpdateInfo[] | undefined>(
      "QueryHealthUpdateInfos", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryHealthUpdates(args: {
  providerId: string
}): Promise<HealthUpdate[] | undefined> {
    const result = await this.connection.exec<{
  providerId: string
} & { _this: ObjectReference }, HealthUpdate[] | undefined>(
      "QueryHealthUpdates", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryMonitoredEntities(args: {
  providerId: string
}): Promise<ManagedEntity[] | undefined> {
    const result = await this.connection.exec<{
  providerId: string
} & { _this: ObjectReference }, ManagedEntity[] | undefined>(
      "QueryMonitoredEntities", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryProviderList(): Promise<string[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string[] | undefined>(
      "QueryProviderList", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryProviderName(args: {
  id: string
}): Promise<string> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, string>(
      "QueryProviderName", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryUnmonitoredHosts(args: {
  providerId: string;
    cluster: ClusterComputeResource
}): Promise<HostSystem[] | undefined> {
    const result = await this.connection.exec<{
  providerId: string;
    cluster: ClusterComputeResource
} & { _this: ObjectReference }, HostSystem[] | undefined>(
      "QueryUnmonitoredHosts", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async registerProvider(args: {
  name: string;
    healthUpdateInfo?: HealthUpdateInfo[]
}): Promise<string> {
    const result = await this.connection.exec<{
  name: string;
    healthUpdateInfo?: HealthUpdateInfo[]
} & { _this: ObjectReference }, string>(
      "RegisterHealthUpdateProvider", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeFilter(args: {
  filterId: string
}): Promise<void> {
    const result = await this.connection.exec<{
  filterId: string
} & { _this: ObjectReference }, void>(
      "RemoveFilter", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeFilterEntities(args: {
  filterId: string;
    entities?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  filterId: string;
    entities?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "RemoveFilterEntities", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeMonitoredEntities(args: {
  providerId: string;
    entities?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  providerId: string;
    entities?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "RemoveMonitoredEntities", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unregisterProvider(args: {
  providerId: string
}): Promise<void> {
    const result = await this.connection.exec<{
  providerId: string
} & { _this: ObjectReference }, void>(
      "UnregisterHealthUpdateProvider", { _this: { attributes: { type: "HealthUpdateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HistoryCollector extends ManagedObject {
  filter!: any;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HistoryCollector>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async remove(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyCollector", { _this: { attributes: { type: "HistoryCollector" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async reset(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ResetCollector", { _this: { attributes: { type: "HistoryCollector" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async rewind(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RewindCollector", { _this: { attributes: { type: "HistoryCollector" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async setLatestPageSize(args: {
  maxCount: number
}): Promise<void> {
    const result = await this.connection.exec<{
  maxCount: number
} & { _this: ObjectReference }, void>(
      "SetCollectorPageSize", { _this: { attributes: { type: "HistoryCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HttpNfcLease extends ManagedObject {
  initializeProgress!: number;
  transferProgress!: number;
  mode!: string;
  capabilities!: HttpNfcLeaseCapabilities;
  info?: HttpNfcLeaseInfo;
  state!: HttpNfcLeaseState;
  error?: MethodFault;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HttpNfcLease>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async abort(args: {
  fault?: MethodFault
}): Promise<void> {
    const result = await this.connection.exec<{
  fault?: MethodFault
} & { _this: ObjectReference }, void>(
      "HttpNfcLeaseAbort", { _this: { attributes: { type: "HttpNfcLease" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async complete(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "HttpNfcLeaseComplete", { _this: { attributes: { type: "HttpNfcLease" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async getManifest(): Promise<HttpNfcLeaseManifestEntry[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HttpNfcLeaseManifestEntry[] | undefined>(
      "HttpNfcLeaseGetManifest", { _this: { attributes: { type: "HttpNfcLease" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async progress(args: {
  percent: number
}): Promise<void> {
    const result = await this.connection.exec<{
  percent: number
} & { _this: ObjectReference }, void>(
      "HttpNfcLeaseProgress", { _this: { attributes: { type: "HttpNfcLease" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async pullFromUrls(args: {
  files?: HttpNfcLeaseSourceFile[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  files?: HttpNfcLeaseSourceFile[]
} & { _this: ObjectReference }, Task>(
      "HttpNfcLeasePullFromUrls_Task", { _this: { attributes: { type: "HttpNfcLease" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async setManifestChecksumType(args: {
  deviceUrlsToChecksumTypes?: KeyValue[]
}): Promise<void> {
    const result = await this.connection.exec<{
  deviceUrlsToChecksumTypes?: KeyValue[]
} & { _this: ObjectReference }, void>(
      "HttpNfcLeaseSetManifestChecksumType", { _this: { attributes: { type: "HttpNfcLease" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class IoFilterManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<IoFilterManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async installIoFilter(args: {
  vibUrl: string;
    compRes: ComputeResource
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  vibUrl: string;
    compRes: ComputeResource
} & { _this: ObjectReference }, Task | undefined>(
      "InstallIoFilter_Task", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryDisksUsingFilter(args: {
  filterId: string;
    compRes: ComputeResource
}): Promise<VirtualDiskId[]> {
    const result = await this.connection.exec<{
  filterId: string;
    compRes: ComputeResource
} & { _this: ObjectReference }, VirtualDiskId[]>(
      "QueryDisksUsingFilter", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryIoFilterInfo(args: {
  compRes: ComputeResource
}): Promise<ClusterIoFilterInfo[] | undefined> {
    const result = await this.connection.exec<{
  compRes: ComputeResource
} & { _this: ObjectReference }, ClusterIoFilterInfo[] | undefined>(
      "QueryIoFilterInfo", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryIssue(args: {
  filterId: string;
    compRes: ComputeResource
}): Promise<IoFilterQueryIssueResult> {
    const result = await this.connection.exec<{
  filterId: string;
    compRes: ComputeResource
} & { _this: ObjectReference }, IoFilterQueryIssueResult>(
      "QueryIoFilterIssues", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { opType: undefined,
        hostIssue: undefined });
  }
  async resolveInstallationErrorsOnCluster(args: {
  filterId: string;
    cluster: ClusterComputeResource
}): Promise<Task> {
    const result = await this.connection.exec<{
  filterId: string;
    cluster: ClusterComputeResource
} & { _this: ObjectReference }, Task>(
      "ResolveInstallationErrorsOnCluster_Task", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async resolveInstallationErrorsOnHost(args: {
  filterId: string;
    host: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  filterId: string;
    host: HostSystem
} & { _this: ObjectReference }, Task>(
      "ResolveInstallationErrorsOnHost_Task", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async uninstallIoFilter(args: {
  filterId: string;
    compRes: ComputeResource
}): Promise<Task> {
    const result = await this.connection.exec<{
  filterId: string;
    compRes: ComputeResource
} & { _this: ObjectReference }, Task>(
      "UninstallIoFilter_Task", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async upgradeIoFilter(args: {
  filterId: string;
    compRes: ComputeResource;
    vibUrl: string
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  filterId: string;
    compRes: ComputeResource;
    vibUrl: string
} & { _this: ObjectReference }, Task | undefined>(
      "UpgradeIoFilter_Task", { _this: { attributes: { type: "IoFilterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class IpPoolManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<IpPoolManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async allocateIpv4Address(args: {
  dc: Datacenter;
    poolId: number;
    allocationId: string
}): Promise<string> {
    const result = await this.connection.exec<{
  dc: Datacenter;
    poolId: number;
    allocationId: string
} & { _this: ObjectReference }, string>(
      "AllocateIpv4Address", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async allocateIpv6Address(args: {
  dc: Datacenter;
    poolId: number;
    allocationId: string
}): Promise<string> {
    const result = await this.connection.exec<{
  dc: Datacenter;
    poolId: number;
    allocationId: string
} & { _this: ObjectReference }, string>(
      "AllocateIpv6Address", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createIpPool(args: {
  dc: Datacenter;
    pool: IpPool
}): Promise<number> {
    const result = await this.connection.exec<{
  dc: Datacenter;
    pool: IpPool
} & { _this: ObjectReference }, number>(
      "CreateIpPool", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async destroyIpPool(args: {
  dc: Datacenter;
    id: number;
    force: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  dc: Datacenter;
    id: number;
    force: boolean
} & { _this: ObjectReference }, void>(
      "DestroyIpPool", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryIPAllocations(args: {
  dc: Datacenter;
    poolId: number;
    extensionKey: string
}): Promise<IpPoolManagerIpAllocation[]> {
    const result = await this.connection.exec<{
  dc: Datacenter;
    poolId: number;
    extensionKey: string
} & { _this: ObjectReference }, IpPoolManagerIpAllocation[]>(
      "QueryIPAllocations", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryIpPools(args: {
  dc: Datacenter
}): Promise<IpPool[] | undefined> {
    const result = await this.connection.exec<{
  dc: Datacenter
} & { _this: ObjectReference }, IpPool[] | undefined>(
      "QueryIpPools", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async releaseIpAllocation(args: {
  dc: Datacenter;
    poolId: number;
    allocationId: string
}): Promise<void> {
    const result = await this.connection.exec<{
  dc: Datacenter;
    poolId: number;
    allocationId: string
} & { _this: ObjectReference }, void>(
      "ReleaseIpAllocation", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateIpPool(args: {
  dc: Datacenter;
    pool: IpPool
}): Promise<void> {
    const result = await this.connection.exec<{
  dc: Datacenter;
    pool: IpPool
} & { _this: ObjectReference }, void>(
      "UpdateIpPool", { _this: { attributes: { type: "IpPoolManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class LicenseManager extends ManagedObject {
  source!: LicenseSource;
  sourceAvailable!: boolean;
  diagnostics?: LicenseDiagnostics;
  featureInfo?: LicenseFeatureInfo[];
  licensedEdition!: string;
  licenses!: LicenseManagerLicenseInfo[];
  licenseAssignmentManager?: LicenseAssignmentManager;
  evaluation!: LicenseManagerEvaluationInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<LicenseManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { source: undefined,
        sourceAvailable: undefined,
        diagnostics: undefined,
        featureInfo: undefined,
        licensedEdition: undefined,
        licenses: undefined,
        licenseAssignmentManager: LicenseAssignmentManager,
        evaluation: undefined });
    }
  }
  async addLicense(args: {
  licenseKey: string;
    labels?: KeyValue[]
}): Promise<LicenseManagerLicenseInfo> {
    const result = await this.connection.exec<{
  licenseKey: string;
    labels?: KeyValue[]
} & { _this: ObjectReference }, LicenseManagerLicenseInfo>(
      "AddLicense", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { licenseKey: undefined,
        editionKey: undefined,
        name: undefined,
        total: undefined,
        used: undefined,
        costUnit: undefined,
        properties: undefined,
        labels: undefined });
  }
  async checkFeature(args: {
  host?: HostSystem;
    featureKey: string
}): Promise<boolean> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    featureKey: string
} & { _this: ObjectReference }, boolean>(
      "CheckLicenseFeature", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async configureSource(args: {
  host?: HostSystem;
    licenseSource: LicenseSource
}): Promise<void> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    licenseSource: LicenseSource
} & { _this: ObjectReference }, void>(
      "ConfigureLicenseSource", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async decodeLicense(args: {
  licenseKey: string
}): Promise<LicenseManagerLicenseInfo> {
    const result = await this.connection.exec<{
  licenseKey: string
} & { _this: ObjectReference }, LicenseManagerLicenseInfo>(
      "DecodeLicense", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { licenseKey: undefined,
        editionKey: undefined,
        name: undefined,
        total: undefined,
        used: undefined,
        costUnit: undefined,
        properties: undefined,
        labels: undefined });
  }
  async disable(args: {
  host?: HostSystem;
    featureKey: string
}): Promise<boolean> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    featureKey: string
} & { _this: ObjectReference }, boolean>(
      "DisableFeature", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async enable(args: {
  host?: HostSystem;
    featureKey: string
}): Promise<boolean> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    featureKey: string
} & { _this: ObjectReference }, boolean>(
      "EnableFeature", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async querySourceAvailability(args: {
  host?: HostSystem
}): Promise<LicenseAvailabilityInfo[] | undefined> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, LicenseAvailabilityInfo[] | undefined>(
      "QueryLicenseSourceAvailability", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryUsage(args: {
  host?: HostSystem
}): Promise<LicenseUsageInfo> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, LicenseUsageInfo>(
      "QueryLicenseUsage", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { source: undefined,
        sourceAvailable: undefined,
        reservationInfo: undefined,
        featureInfo: undefined });
  }
  async querySupportedFeatures(args: {
  host?: HostSystem
}): Promise<LicenseFeatureInfo[] | undefined> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, LicenseFeatureInfo[] | undefined>(
      "QuerySupportedFeatures", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeLicense(args: {
  licenseKey: string
}): Promise<void> {
    const result = await this.connection.exec<{
  licenseKey: string
} & { _this: ObjectReference }, void>(
      "RemoveLicense", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeLabel(args: {
  licenseKey: string;
    labelKey: string
}): Promise<void> {
    const result = await this.connection.exec<{
  licenseKey: string;
    labelKey: string
} & { _this: ObjectReference }, void>(
      "RemoveLicenseLabel", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setEdition(args: {
  host?: HostSystem;
    featureKey?: string
}): Promise<void> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    featureKey?: string
} & { _this: ObjectReference }, void>(
      "SetLicenseEdition", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateLicense(args: {
  licenseKey: string;
    labels?: KeyValue[]
}): Promise<LicenseManagerLicenseInfo> {
    const result = await this.connection.exec<{
  licenseKey: string;
    labels?: KeyValue[]
} & { _this: ObjectReference }, LicenseManagerLicenseInfo>(
      "UpdateLicense", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { licenseKey: undefined,
        editionKey: undefined,
        name: undefined,
        total: undefined,
        used: undefined,
        costUnit: undefined,
        properties: undefined,
        labels: undefined });
  }
  async updateLabel(args: {
  licenseKey: string;
    labelKey: string;
    labelValue: string
}): Promise<void> {
    const result = await this.connection.exec<{
  licenseKey: string;
    labelKey: string;
    labelValue: string
} & { _this: ObjectReference }, void>(
      "UpdateLicenseLabel", { _this: { attributes: { type: "LicenseManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class LocalizationManager extends ManagedObject {
  catalog?: LocalizationManagerMessageCatalog[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<LocalizationManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class OverheadMemoryManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<OverheadMemoryManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async lookupVmOverheadMemory(args: {
  vm: VirtualMachine;
    host: HostSystem
}): Promise<number> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    host: HostSystem
} & { _this: ObjectReference }, number>(
      "LookupVmOverheadMemory", { _this: { attributes: { type: "OverheadMemoryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class OvfManager extends ManagedObject {
  ovfImportOption?: OvfOptionInfo[];
  ovfExportOption?: OvfOptionInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<OvfManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async createDescriptor(args: {
  obj: ManagedEntity;
    cdp: OvfCreateDescriptorParams
}): Promise<OvfCreateDescriptorResult> {
    const result = await this.connection.exec<{
  obj: ManagedEntity;
    cdp: OvfCreateDescriptorParams
} & { _this: ObjectReference }, OvfCreateDescriptorResult>(
      "CreateDescriptor", { _this: { attributes: { type: "OvfManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { ovfDescriptor: undefined,
        error: undefined,
        warning: undefined,
        includeImageFiles: undefined });
  }
  async createImportSpec(args: {
  ovfDescriptor: string;
    resourcePool: ResourcePool;
    datastore: Datastore;
    cisp: OvfCreateImportSpecParams
}): Promise<OvfCreateImportSpecResult> {
    const result = await this.connection.exec<{
  ovfDescriptor: string;
    resourcePool: ResourcePool;
    datastore: Datastore;
    cisp: OvfCreateImportSpecParams
} & { _this: ObjectReference }, OvfCreateImportSpecResult>(
      "CreateImportSpec", { _this: { attributes: { type: "OvfManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { importSpec: undefined,
        fileItem: undefined,
        warning: undefined,
        error: undefined });
  }
  async parseDescriptor(args: {
  ovfDescriptor: string;
    pdp: OvfParseDescriptorParams
}): Promise<OvfParseDescriptorResult> {
    const result = await this.connection.exec<{
  ovfDescriptor: string;
    pdp: OvfParseDescriptorParams
} & { _this: ObjectReference }, OvfParseDescriptorResult>(
      "ParseDescriptor", { _this: { attributes: { type: "OvfManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { eula: undefined,
        network: undefined,
        ipAllocationScheme: undefined,
        ipProtocols: undefined,
        property: undefined,
        productInfo: undefined,
        annotation: undefined,
        approximateDownloadSize: undefined,
        approximateFlatDeploymentSize: undefined,
        approximateSparseDeploymentSize: undefined,
        defaultEntityName: undefined,
        virtualApp: undefined,
        deploymentOption: undefined,
        defaultDeploymentOption: undefined,
        entityName: undefined,
        annotatedOst: undefined,
        error: undefined,
        warning: undefined });
  }
  async validateHost(args: {
  ovfDescriptor: string;
    host: HostSystem;
    vhp: OvfValidateHostParams
}): Promise<OvfValidateHostResult> {
    const result = await this.connection.exec<{
  ovfDescriptor: string;
    host: HostSystem;
    vhp: OvfValidateHostParams
} & { _this: ObjectReference }, OvfValidateHostResult>(
      "ValidateHost", { _this: { attributes: { type: "OvfManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { downloadSize: undefined,
        flatDeploymentSize: undefined,
        sparseDeploymentSize: undefined,
        error: undefined,
        warning: undefined,
        supportedDiskProvisioning: undefined });
  };
}
export class PerformanceManager extends ManagedObject {
  description!: PerformanceDescription;
  historicalInterval?: PerfInterval[];
  perfCounter?: PerfCounterInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<PerformanceManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async createHistoricalInterval(args: {
  intervalId: PerfInterval
}): Promise<void> {
    const result = await this.connection.exec<{
  intervalId: PerfInterval
} & { _this: ObjectReference }, void>(
      "CreatePerfInterval", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryAvailableMetric(args: {
  entity: ManagedObject;
    beginTime?: Date;
    endTime?: Date;
    intervalId?: number
}): Promise<PerfMetricId[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedObject;
    beginTime?: Date;
    endTime?: Date;
    intervalId?: number
} & { _this: ObjectReference }, PerfMetricId[] | undefined>(
      "QueryAvailablePerfMetric", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryStats(args: {
  querySpec: PerfQuerySpec[]
}): Promise<PerfEntityMetricBase[] | undefined> {
    const result = await this.connection.exec<{
  querySpec: PerfQuerySpec[]
} & { _this: ObjectReference }, PerfEntityMetricBase[] | undefined>(
      "QueryPerf", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCompositeStats(args: {
  querySpec: PerfQuerySpec
}): Promise<PerfCompositeMetric> {
    const result = await this.connection.exec<{
  querySpec: PerfQuerySpec
} & { _this: ObjectReference }, PerfCompositeMetric>(
      "QueryPerfComposite", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { entity: undefined,
        childEntity: undefined });
  }
  async queryCounter(args: {
  counterId: number[]
}): Promise<PerfCounterInfo[] | undefined> {
    const result = await this.connection.exec<{
  counterId: number[]
} & { _this: ObjectReference }, PerfCounterInfo[] | undefined>(
      "QueryPerfCounter", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCounterByLevel(args: {
  level: number
}): Promise<PerfCounterInfo[]> {
    const result = await this.connection.exec<{
  level: number
} & { _this: ObjectReference }, PerfCounterInfo[]>(
      "QueryPerfCounterByLevel", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryProviderSummary(args: {
  entity: ManagedObject
}): Promise<PerfProviderSummary> {
    const result = await this.connection.exec<{
  entity: ManagedObject
} & { _this: ObjectReference }, PerfProviderSummary>(
      "QueryPerfProviderSummary", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { entity: undefined,
        currentSupported: undefined,
        summarySupported: undefined,
        refreshRate: undefined });
  }
  async removeHistoricalInterval(args: {
  samplePeriod: number
}): Promise<void> {
    const result = await this.connection.exec<{
  samplePeriod: number
} & { _this: ObjectReference }, void>(
      "RemovePerfInterval", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async resetCounterLevelMapping(args: {
  counters: number[]
}): Promise<void> {
    const result = await this.connection.exec<{
  counters: number[]
} & { _this: ObjectReference }, void>(
      "ResetCounterLevelMapping", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateCounterLevelMapping(args: {
  counterLevelMap: PerformanceManagerCounterLevelMapping[]
}): Promise<void> {
    const result = await this.connection.exec<{
  counterLevelMap: PerformanceManagerCounterLevelMapping[]
} & { _this: ObjectReference }, void>(
      "UpdateCounterLevelMapping", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateHistoricalInterval(args: {
  interval: PerfInterval
}): Promise<void> {
    const result = await this.connection.exec<{
  interval: PerfInterval
} & { _this: ObjectReference }, void>(
      "UpdatePerfInterval", { _this: { attributes: { type: "PerformanceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ResourcePlanningManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ResourcePlanningManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async estimateDatabaseSize(args: {
  dbSizeParam: DatabaseSizeParam
}): Promise<DatabaseSizeEstimate> {
    const result = await this.connection.exec<{
  dbSizeParam: DatabaseSizeParam
} & { _this: ObjectReference }, DatabaseSizeEstimate>(
      "EstimateDatabaseSize", { _this: { attributes: { type: "ResourcePlanningManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { size: undefined });
  };
}
export class SearchIndex extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<SearchIndex>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async findAllByDnsName(args: {
  datacenter?: Datacenter;
    dnsName: string;
    vmSearch: boolean
}): Promise<ManagedEntity[]> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    dnsName: string;
    vmSearch: boolean
} & { _this: ObjectReference }, ManagedEntity[]>(
      "FindAllByDnsName", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async findAllByIp(args: {
  datacenter?: Datacenter;
    ip: string;
    vmSearch: boolean
}): Promise<ManagedEntity[]> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    ip: string;
    vmSearch: boolean
} & { _this: ObjectReference }, ManagedEntity[]>(
      "FindAllByIp", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async findAllByUuid(args: {
  datacenter?: Datacenter;
    uuid: string;
    vmSearch: boolean;
    instanceUuid?: boolean
}): Promise<ManagedEntity[]> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    uuid: string;
    vmSearch: boolean;
    instanceUuid?: boolean
} & { _this: ObjectReference }, ManagedEntity[]>(
      "FindAllByUuid", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async findByDatastorePath(args: {
  datacenter: Datacenter;
    path: string
}): Promise<VirtualMachine | undefined> {
    const result = await this.connection.exec<{
  datacenter: Datacenter;
    path: string
} & { _this: ObjectReference }, VirtualMachine | undefined>(
      "FindByDatastorePath", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new VirtualMachine(this.connection, result);
  }
  async findByDnsName(args: {
  datacenter?: Datacenter;
    dnsName: string;
    vmSearch: boolean
}): Promise<ManagedEntity | undefined> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    dnsName: string;
    vmSearch: boolean
} & { _this: ObjectReference }, ManagedEntity | undefined>(
      "FindByDnsName", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ManagedEntity(this.connection, result);
  }
  async findByInventoryPath(args: {
  inventoryPath: string
}): Promise<ManagedEntity | undefined> {
    const result = await this.connection.exec<{
  inventoryPath: string
} & { _this: ObjectReference }, ManagedEntity | undefined>(
      "FindByInventoryPath", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ManagedEntity(this.connection, result);
  }
  async findByIp(args: {
  datacenter?: Datacenter;
    ip: string;
    vmSearch: boolean
}): Promise<ManagedEntity | undefined> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    ip: string;
    vmSearch: boolean
} & { _this: ObjectReference }, ManagedEntity | undefined>(
      "FindByIp", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ManagedEntity(this.connection, result);
  }
  async findByUuid(args: {
  datacenter?: Datacenter;
    uuid: string;
    vmSearch: boolean;
    instanceUuid?: boolean
}): Promise<ManagedEntity | undefined> {
    const result = await this.connection.exec<{
  datacenter?: Datacenter;
    uuid: string;
    vmSearch: boolean;
    instanceUuid?: boolean
} & { _this: ObjectReference }, ManagedEntity | undefined>(
      "FindByUuid", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ManagedEntity(this.connection, result);
  }
  async findChild(args: {
  entity: ManagedEntity;
    name: string
}): Promise<ManagedEntity | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    name: string
} & { _this: ObjectReference }, ManagedEntity | undefined>(
      "FindChild", { _this: { attributes: { type: "SearchIndex" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ManagedEntity(this.connection, result);
  };
}
export class ServiceManager extends ManagedObject {
  service?: ServiceManagerServiceInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ServiceManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryServiceList(args: {
  serviceName?: string;
    location?: string[]
}): Promise<ServiceManagerServiceInfo[] | undefined> {
    const result = await this.connection.exec<{
  serviceName?: string;
    location?: string[]
} & { _this: ObjectReference }, ServiceManagerServiceInfo[] | undefined>(
      "QueryServiceList", { _this: { attributes: { type: "ServiceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class SessionManager extends ManagedObject {
  sessionList?: UserSession[];
  currentSession?: UserSession;
  message?: string;
  messageLocaleList?: string[];
  supportedLocaleList?: string[];
  defaultLocale!: string;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<SessionManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async acquireCloneTicket(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "AcquireCloneTicket", { _this: { attributes: { type: "SessionManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async acquireGenericServiceTicket(args: {
  spec: SessionManagerServiceRequestSpec
}): Promise<SessionManagerGenericServiceTicket> {
    const result = await this.connection.exec<{
  spec: SessionManagerServiceRequestSpec
} & { _this: ObjectReference }, SessionManagerGenericServiceTicket>(
      "AcquireGenericServiceTicket", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { id: undefined,
        hostName: undefined,
        sslThumbprint: undefined });
  }
  async acquireLocalTicket(args: {
  userName: string
}): Promise<SessionManagerLocalTicket> {
    const result = await this.connection.exec<{
  userName: string
} & { _this: ObjectReference }, SessionManagerLocalTicket>(
      "AcquireLocalTicket", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { userName: undefined,
        passwordFilePath: undefined });
  }
  async cloneSession(args: {
  cloneTicket: string
}): Promise<UserSession> {
    const result = await this.connection.exec<{
  cloneTicket: string
} & { _this: ObjectReference }, UserSession>(
      "CloneSession", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        userName: undefined,
        fullName: undefined,
        loginTime: undefined,
        lastActiveTime: undefined,
        locale: undefined,
        messageLocale: undefined,
        extensionSession: undefined,
        ipAddress: undefined,
        userAgent: undefined,
        callCount: undefined });
  }
  async impersonateUser(args: {
  userName: string;
    locale?: string
}): Promise<UserSession> {
    const result = await this.connection.exec<{
  userName: string;
    locale?: string
} & { _this: ObjectReference }, UserSession>(
      "ImpersonateUser", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        userName: undefined,
        fullName: undefined,
        loginTime: undefined,
        lastActiveTime: undefined,
        locale: undefined,
        messageLocale: undefined,
        extensionSession: undefined,
        ipAddress: undefined,
        userAgent: undefined,
        callCount: undefined });
  }
  async login(args: {
  userName: string;
    password: string;
    locale?: string
}): Promise<UserSession> {
    const result = await this.connection.exec<{
  userName: string;
    password: string;
    locale?: string
} & { _this: ObjectReference }, UserSession>(
      "Login", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        userName: undefined,
        fullName: undefined,
        loginTime: undefined,
        lastActiveTime: undefined,
        locale: undefined,
        messageLocale: undefined,
        extensionSession: undefined,
        ipAddress: undefined,
        userAgent: undefined,
        callCount: undefined });
  }
  async loginBySSPI(args: {
  base64Token: string;
    locale?: string
}): Promise<UserSession> {
    const result = await this.connection.exec<{
  base64Token: string;
    locale?: string
} & { _this: ObjectReference }, UserSession>(
      "LoginBySSPI", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        userName: undefined,
        fullName: undefined,
        loginTime: undefined,
        lastActiveTime: undefined,
        locale: undefined,
        messageLocale: undefined,
        extensionSession: undefined,
        ipAddress: undefined,
        userAgent: undefined,
        callCount: undefined });
  }
  async loginByToken(args: {
  locale?: string
}): Promise<UserSession> {
    const result = await this.connection.exec<{
  locale?: string
} & { _this: ObjectReference }, UserSession>(
      "LoginByToken", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        userName: undefined,
        fullName: undefined,
        loginTime: undefined,
        lastActiveTime: undefined,
        locale: undefined,
        messageLocale: undefined,
        extensionSession: undefined,
        ipAddress: undefined,
        userAgent: undefined,
        callCount: undefined });
  }
  async loginExtensionByCertificate(args: {
  extensionKey: string;
    locale?: string
}): Promise<UserSession> {
    const result = await this.connection.exec<{
  extensionKey: string;
    locale?: string
} & { _this: ObjectReference }, UserSession>(
      "LoginExtensionByCertificate", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        userName: undefined,
        fullName: undefined,
        loginTime: undefined,
        lastActiveTime: undefined,
        locale: undefined,
        messageLocale: undefined,
        extensionSession: undefined,
        ipAddress: undefined,
        userAgent: undefined,
        callCount: undefined });
  }
  async loginExtensionBySubjectName(args: {
  extensionKey: string;
    locale?: string
}): Promise<UserSession> {
    const result = await this.connection.exec<{
  extensionKey: string;
    locale?: string
} & { _this: ObjectReference }, UserSession>(
      "LoginExtensionBySubjectName", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        userName: undefined,
        fullName: undefined,
        loginTime: undefined,
        lastActiveTime: undefined,
        locale: undefined,
        messageLocale: undefined,
        extensionSession: undefined,
        ipAddress: undefined,
        userAgent: undefined,
        callCount: undefined });
  }
  async logout(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "Logout", { _this: { attributes: { type: "SessionManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async sessionIsActive(args: {
  sessionID: string;
    userName: string
}): Promise<boolean> {
    const result = await this.connection.exec<{
  sessionID: string;
    userName: string
} & { _this: ObjectReference }, boolean>(
      "SessionIsActive", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setLocale(args: {
  locale: string
}): Promise<void> {
    const result = await this.connection.exec<{
  locale: string
} & { _this: ObjectReference }, void>(
      "SetLocale", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async terminate(args: {
  sessionId: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  sessionId: string[]
} & { _this: ObjectReference }, void>(
      "TerminateSession", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateMessage(args: {
  message: string
}): Promise<void> {
    const result = await this.connection.exec<{
  message: string
} & { _this: ObjectReference }, void>(
      "UpdateServiceMessage", { _this: { attributes: { type: "SessionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class SimpleCommand extends ManagedObject {
  encodingType!: SimpleCommandEncoding;
  entity!: ServiceManagerServiceInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<SimpleCommand>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async Execute(args: {
  arguments?: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  arguments?: string[]
} & { _this: ObjectReference }, string>(
      "ExecuteSimpleCommand", { _this: { attributes: { type: "SimpleCommand" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class SiteInfoManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<SiteInfoManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async GetSiteInfo(): Promise<SiteInfo> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, SiteInfo>(
      "GetSiteInfo", { _this: { attributes: { type: "SiteInfoManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, {  });
  };
}
export class StorageQueryManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<StorageQueryManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryHostsWithAttachedLun(args: {
  lunUuid: string
}): Promise<HostSystem[] | undefined> {
    const result = await this.connection.exec<{
  lunUuid: string
} & { _this: ObjectReference }, HostSystem[] | undefined>(
      "QueryHostsWithAttachedLun", { _this: { attributes: { type: "StorageQueryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class StorageResourceManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<StorageResourceManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async applyRecommendationToPod(args: {
  pod: StoragePod;
    key: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  pod: StoragePod;
    key: string
} & { _this: ObjectReference }, Task>(
      "ApplyStorageDrsRecommendationToPod_Task", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async applyRecommendation(args: {
  key: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  key: string[]
} & { _this: ObjectReference }, Task>(
      "ApplyStorageDrsRecommendation_Task", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async cancelRecommendation(args: {
  key: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  key: string[]
} & { _this: ObjectReference }, void>(
      "CancelStorageDrsRecommendation", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async ConfigureDatastoreIORM(args: {
  datastore: Datastore;
    spec: StorageIORMConfigSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  datastore: Datastore;
    spec: StorageIORMConfigSpec
} & { _this: ObjectReference }, Task>(
      "ConfigureDatastoreIORM_Task", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async configureStorageDrsForPod(args: {
  pod: StoragePod;
    spec: StorageDrsConfigSpec;
    modify: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  pod: StoragePod;
    spec: StorageDrsConfigSpec;
    modify: boolean
} & { _this: ObjectReference }, Task>(
      "ConfigureStorageDrsForPod_Task", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryDatastorePerformanceSummary(args: {
  datastore: Datastore
}): Promise<StoragePerformanceSummary[] | undefined> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, StoragePerformanceSummary[] | undefined>(
      "QueryDatastorePerformanceSummary", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async QueryIORMConfigOption(args: {
  host: HostSystem
}): Promise<StorageIORMConfigOption> {
    const result = await this.connection.exec<{
  host: HostSystem
} & { _this: ObjectReference }, StorageIORMConfigOption>(
      "QueryIORMConfigOption", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { enabledOption: undefined,
        congestionThresholdOption: undefined,
        statsCollectionEnabledOption: undefined,
        reservationEnabledOption: undefined });
  }
  async recommendDatastores(args: {
  storageSpec: StoragePlacementSpec
}): Promise<StoragePlacementResult> {
    const result = await this.connection.exec<{
  storageSpec: StoragePlacementSpec
} & { _this: ObjectReference }, StoragePlacementResult>(
      "RecommendDatastores", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { recommendations: undefined,
        drsFault: undefined,
        task: Task });
  }
  async refreshRecommendation(args: {
  pod: StoragePod
}): Promise<void> {
    const result = await this.connection.exec<{
  pod: StoragePod
} & { _this: ObjectReference }, void>(
      "RefreshStorageDrsRecommendation", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async refreshRecommendationsForPod(args: {
  pod: StoragePod
}): Promise<Task> {
    const result = await this.connection.exec<{
  pod: StoragePod
} & { _this: ObjectReference }, Task>(
      "RefreshStorageDrsRecommendationsForPod_Task", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async validateStoragePodConfig(args: {
  pod: StoragePod;
    spec: StorageDrsConfigSpec
}): Promise<MethodFault | undefined> {
    const result = await this.connection.exec<{
  pod: StoragePod;
    spec: StorageDrsConfigSpec
} & { _this: ObjectReference }, MethodFault | undefined>(
      "ValidateStoragePodConfig", { _this: { attributes: { type: "StorageResourceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, {  });
  };
}
export class TaskHistoryCollector extends HistoryCollector {
  latestPage?: TaskInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<TaskHistoryCollector>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async readNext(args: {
  maxCount: number
}): Promise<TaskInfo[] | undefined> {
    const result = await this.connection.exec<{
  maxCount: number
} & { _this: ObjectReference }, TaskInfo[] | undefined>(
      "ReadNextTasks", { _this: { attributes: { type: "TaskHistoryCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async readPrev(args: {
  maxCount: number
}): Promise<TaskInfo[] | undefined> {
    const result = await this.connection.exec<{
  maxCount: number
} & { _this: ObjectReference }, TaskInfo[] | undefined>(
      "ReadPreviousTasks", { _this: { attributes: { type: "TaskHistoryCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class TaskManager extends ManagedObject {
  recentTask?: Task[];
  description!: TaskDescription;
  maxCollector!: number;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<TaskManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { recentTask: Task,
        description: undefined,
        maxCollector: undefined });
    }
  }
  async createCollector(args: {
  filter: TaskFilterSpec
}): Promise<TaskHistoryCollector> {
    const result = await this.connection.exec<{
  filter: TaskFilterSpec
} & { _this: ObjectReference }, TaskHistoryCollector>(
      "CreateCollectorForTasks", { _this: { attributes: { type: "TaskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new TaskHistoryCollector(this.connection, result);
  }
  async createTask(args: {
  obj: ManagedObject;
    taskTypeId: string;
    initiatedBy?: string;
    cancelable: boolean;
    parentTaskKey?: string;
    activationId?: string
}): Promise<TaskInfo> {
    const result = await this.connection.exec<{
  obj: ManagedObject;
    taskTypeId: string;
    initiatedBy?: string;
    cancelable: boolean;
    parentTaskKey?: string;
    activationId?: string
} & { _this: ObjectReference }, TaskInfo>(
      "CreateTask", { _this: { attributes: { type: "TaskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { key: undefined,
        task: Task,
        description: undefined,
        name: undefined,
        descriptionId: undefined,
        entity: ManagedEntity,
        entityName: undefined,
        locked: ManagedEntity,
        state: undefined,
        cancelled: undefined,
        cancelable: undefined,
        error: undefined,
        result: undefined,
        progress: undefined,
        reason: undefined,
        queueTime: undefined,
        startTime: undefined,
        completeTime: undefined,
        eventChainId: undefined,
        changeTag: undefined,
        parentTaskKey: undefined,
        rootTaskKey: undefined,
        activationId: undefined });
  };
}
export class UserDirectory extends ManagedObject {
  domainList?: string[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<UserDirectory>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async retrieveUserGroups(args: {
  domain?: string;
    searchStr: string;
    belongsToGroup?: string;
    belongsToUser?: string;
    exactMatch: boolean;
    findUsers: boolean;
    findGroups: boolean
}): Promise<UserSearchResult[] | undefined> {
    const result = await this.connection.exec<{
  domain?: string;
    searchStr: string;
    belongsToGroup?: string;
    belongsToUser?: string;
    exactMatch: boolean;
    findUsers: boolean;
    findGroups: boolean
} & { _this: ObjectReference }, UserSearchResult[] | undefined>(
      "RetrieveUserGroups", { _this: { attributes: { type: "UserDirectory" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class VirtualizationManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualizationManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class VsanUpgradeSystem extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VsanUpgradeSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async performUpgradePreflightCheck(args: {
  cluster: ClusterComputeResource;
    downgradeFormat?: boolean
}): Promise<VsanUpgradeSystemPreflightCheckResult> {
    const result = await this.connection.exec<{
  cluster: ClusterComputeResource;
    downgradeFormat?: boolean
} & { _this: ObjectReference }, VsanUpgradeSystemPreflightCheckResult>(
      "PerformVsanUpgradePreflightCheck", { _this: { attributes: { type: "VsanUpgradeSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { issues: undefined,
        diskMappingToRestore: undefined });
  }
  async performUpgrade(args: {
  cluster: ClusterComputeResource;
    performObjectUpgrade?: boolean;
    downgradeFormat?: boolean;
    allowReducedRedundancy?: boolean;
    excludeHosts?: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  cluster: ClusterComputeResource;
    performObjectUpgrade?: boolean;
    downgradeFormat?: boolean;
    allowReducedRedundancy?: boolean;
    excludeHosts?: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "PerformVsanUpgrade_Task", { _this: { attributes: { type: "VsanUpgradeSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryUpgradeStatus(args: {
  cluster: ClusterComputeResource
}): Promise<VsanUpgradeSystemUpgradeStatus> {
    const result = await this.connection.exec<{
  cluster: ClusterComputeResource
} & { _this: ObjectReference }, VsanUpgradeSystemUpgradeStatus>(
      "QueryVsanUpgradeStatus", { _this: { attributes: { type: "VsanUpgradeSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { inProgress: undefined,
        history: undefined,
        aborted: undefined,
        completed: undefined,
        progress: undefined });
  };
}
export class Alarm extends ExtensibleManagedObject {
  info!: AlarmInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<Alarm>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async reconfigure(args: {
  spec: AlarmSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: AlarmSpec
} & { _this: ObjectReference }, void>(
      "ReconfigureAlarm", { _this: { attributes: { type: "Alarm" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async remove(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RemoveAlarm", { _this: { attributes: { type: "Alarm" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class ClusterEVCManager extends ExtensibleManagedObject {
  managedCluster!: ClusterComputeResource;
  evcState!: ClusterEVCManagerEVCState;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ClusterEVCManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { managedCluster: ClusterComputeResource,
        evcState: undefined });
    }
  }
  async checkAddHostEvc(args: {
  cnxSpec: HostConnectSpec
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  cnxSpec: HostConnectSpec
} & { _this: ObjectReference }, Task | undefined>(
      "CheckAddHostEvc_Task", { _this: { attributes: { type: "ClusterEVCManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkConfigureEvc(args: {
  evcModeKey: string;
    evcGraphicsModeKey?: string
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  evcModeKey: string;
    evcGraphicsModeKey?: string
} & { _this: ObjectReference }, Task | undefined>(
      "CheckConfigureEvcMode_Task", { _this: { attributes: { type: "ClusterEVCManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async configureEvc(args: {
  evcModeKey: string;
    evcGraphicsModeKey?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  evcModeKey: string;
    evcGraphicsModeKey?: string
} & { _this: ObjectReference }, Task>(
      "ConfigureEvcMode_Task", { _this: { attributes: { type: "ClusterEVCManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async disableEvc(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "DisableEvcMode_Task", { _this: { attributes: { type: "ClusterEVCManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class CryptoManager extends ManagedObject {
  enabled!: boolean;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<CryptoManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addKey(args: {
  key: CryptoKeyPlain
}): Promise<void> {
    const result = await this.connection.exec<{
  key: CryptoKeyPlain
} & { _this: ObjectReference }, void>(
      "AddKey", { _this: { attributes: { type: "CryptoManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addKeys(args: {
  keys?: CryptoKeyPlain[]
}): Promise<CryptoKeyResult[] | undefined> {
    const result = await this.connection.exec<{
  keys?: CryptoKeyPlain[]
} & { _this: ObjectReference }, CryptoKeyResult[] | undefined>(
      "AddKeys", { _this: { attributes: { type: "CryptoManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listKeys(args: {
  limit?: number
}): Promise<CryptoKeyId[] | undefined> {
    const result = await this.connection.exec<{
  limit?: number
} & { _this: ObjectReference }, CryptoKeyId[] | undefined>(
      "ListKeys", { _this: { attributes: { type: "CryptoManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeKey(args: {
  key: CryptoKeyId;
    force: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  key: CryptoKeyId;
    force: boolean
} & { _this: ObjectReference }, void>(
      "RemoveKey", { _this: { attributes: { type: "CryptoManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeKeys(args: {
  keys?: CryptoKeyId[];
    force: boolean
}): Promise<CryptoKeyResult[] | undefined> {
    const result = await this.connection.exec<{
  keys?: CryptoKeyId[];
    force: boolean
} & { _this: ObjectReference }, CryptoKeyResult[] | undefined>(
      "RemoveKeys", { _this: { attributes: { type: "CryptoManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class CryptoManagerHost extends CryptoManager {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<CryptoManagerHost>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async changeKey(args: {
  newKey: CryptoKeyPlain
}): Promise<Task> {
    const result = await this.connection.exec<{
  newKey: CryptoKeyPlain
} & { _this: ObjectReference }, Task>(
      "ChangeKey_Task", { _this: { attributes: { type: "CryptoManagerHost" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async disable(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "CryptoManagerHostDisable", { _this: { attributes: { type: "CryptoManagerHost" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async enable(args: {
  initialKey: CryptoKeyPlain
}): Promise<void> {
    const result = await this.connection.exec<{
  initialKey: CryptoKeyPlain
} & { _this: ObjectReference }, void>(
      "CryptoManagerHostEnable", { _this: { attributes: { type: "CryptoManagerHost" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async prepare(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "CryptoManagerHostPrepare", { _this: { attributes: { type: "CryptoManagerHost" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class CryptoManagerHostKMS extends CryptoManagerHost {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<CryptoManagerHostKMS>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class EventHistoryCollector extends HistoryCollector {
  latestPage?: Event[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<EventHistoryCollector>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async readNext(args: {
  maxCount: number
}): Promise<Event[] | undefined> {
    const result = await this.connection.exec<{
  maxCount: number
} & { _this: ObjectReference }, Event[] | undefined>(
      "ReadNextEvents", { _this: { attributes: { type: "EventHistoryCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async readPrev(args: {
  maxCount: number
}): Promise<Event[] | undefined> {
    const result = await this.connection.exec<{
  maxCount: number
} & { _this: ObjectReference }, Event[] | undefined>(
      "ReadPreviousEvents", { _this: { attributes: { type: "EventHistoryCollector" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class EventManager extends ManagedObject {
  description!: EventDescription;
  latestEvent?: Event;
  maxCollector!: number;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<EventManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async createCollector(args: {
  filter: EventFilterSpec
}): Promise<EventHistoryCollector> {
    const result = await this.connection.exec<{
  filter: EventFilterSpec
} & { _this: ObjectReference }, EventHistoryCollector>(
      "CreateCollectorForEvents", { _this: { attributes: { type: "EventManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new EventHistoryCollector(this.connection, result);
  }
  async logUserEvent(args: {
  entity: ManagedEntity;
    msg: string
}): Promise<void> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    msg: string
} & { _this: ObjectReference }, void>(
      "LogUserEvent", { _this: { attributes: { type: "EventManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async postEvent(args: {
  eventToPost: Event;
    taskInfo?: TaskInfo
}): Promise<void> {
    const result = await this.connection.exec<{
  eventToPost: Event;
    taskInfo?: TaskInfo
} & { _this: ObjectReference }, void>(
      "PostEvent", { _this: { attributes: { type: "EventManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async QueryEvent(args: {
  filter: EventFilterSpec
}): Promise<Event[] | undefined> {
    const result = await this.connection.exec<{
  filter: EventFilterSpec
} & { _this: ObjectReference }, Event[] | undefined>(
      "QueryEvents", { _this: { attributes: { type: "EventManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveArgumentDescription(args: {
  eventTypeId: string
}): Promise<EventArgDesc[] | undefined> {
    const result = await this.connection.exec<{
  eventTypeId: string
} & { _this: ObjectReference }, EventArgDesc[] | undefined>(
      "RetrieveArgumentDescription", { _this: { attributes: { type: "EventManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostAssignableHardwareManager extends ManagedObject {
  binding?: HostAssignableHardwareBinding[];
  config!: HostAssignableHardwareConfig;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostAssignableHardwareManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async downloadDescriptionTree(): Promise<Buffer> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Buffer>(
      "DownloadDescriptionTree", { _this: { attributes: { type: "HostAssignableHardwareManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, {  });
  }
  async retrieveDynamicPassthroughInfo(): Promise<VirtualMachineDynamicPassthroughInfo[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VirtualMachineDynamicPassthroughInfo[] | undefined>(
      "RetrieveDynamicPassthroughInfo", { _this: { attributes: { type: "HostAssignableHardwareManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async updateConfig(args: {
  config: HostAssignableHardwareConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostAssignableHardwareConfig
} & { _this: ObjectReference }, void>(
      "UpdateAssignableHardwareConfig", { _this: { attributes: { type: "HostAssignableHardwareManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostAuthenticationManager extends ManagedObject {
  info!: HostAuthenticationManagerInfo;
  supportedStore!: HostAuthenticationStore[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostAuthenticationManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { info: undefined,
        supportedStore: HostAuthenticationStore });
    }
  }
  
}
export class HostAuthenticationStore extends ManagedObject {
  info!: HostAuthenticationStoreInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostAuthenticationStore>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class HostAutoStartManager extends ManagedObject {
  config!: HostAutoStartManagerConfig;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostAutoStartManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async autoPowerOff(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "AutoStartPowerOff", { _this: { attributes: { type: "HostAutoStartManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async autoPowerOn(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "AutoStartPowerOn", { _this: { attributes: { type: "HostAutoStartManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async reconfigure(args: {
  spec: HostAutoStartManagerConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: HostAutoStartManagerConfig
} & { _this: ObjectReference }, void>(
      "ReconfigureAutostart", { _this: { attributes: { type: "HostAutoStartManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostBootDeviceSystem extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostBootDeviceSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryBootDevices(): Promise<HostBootDeviceInfo | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostBootDeviceInfo | undefined>(
      "QueryBootDevices", { _this: { attributes: { type: "HostBootDeviceSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { bootDevices: undefined,
        currentBootDeviceKey: undefined });
  }
  async updateBootDevice(args: {
  key: string
}): Promise<void> {
    const result = await this.connection.exec<{
  key: string
} & { _this: ObjectReference }, void>(
      "UpdateBootDevice", { _this: { attributes: { type: "HostBootDeviceSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostCacheConfigurationManager extends ManagedObject {
  cacheConfigurationInfo?: HostCacheConfigurationInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostCacheConfigurationManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async configureCache(args: {
  spec: HostCacheConfigurationSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: HostCacheConfigurationSpec
} & { _this: ObjectReference }, Task>(
      "ConfigureHostCache_Task", { _this: { attributes: { type: "HostCacheConfigurationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HostCertificateManager extends ManagedObject {
  certificateInfo!: HostCertificateManagerCertificateInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostCertificateManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async generateCertificateSigningRequest(args: {
  useIpAddressAsCommonName: boolean
}): Promise<string> {
    const result = await this.connection.exec<{
  useIpAddressAsCommonName: boolean
} & { _this: ObjectReference }, string>(
      "GenerateCertificateSigningRequest", { _this: { attributes: { type: "HostCertificateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async generateCertificateSigningRequestByDn(args: {
  distinguishedName: string
}): Promise<string> {
    const result = await this.connection.exec<{
  distinguishedName: string
} & { _this: ObjectReference }, string>(
      "GenerateCertificateSigningRequestByDn", { _this: { attributes: { type: "HostCertificateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async installServerCertificate(args: {
  cert: string
}): Promise<void> {
    const result = await this.connection.exec<{
  cert: string
} & { _this: ObjectReference }, void>(
      "InstallServerCertificate", { _this: { attributes: { type: "HostCertificateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listCACertificateRevocationLists(): Promise<string[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string[] | undefined>(
      "ListCACertificateRevocationLists", { _this: { attributes: { type: "HostCertificateManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async listCACertificates(): Promise<string[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string[] | undefined>(
      "ListCACertificates", { _this: { attributes: { type: "HostCertificateManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async replaceCACertificatesAndCRLs(args: {
  caCert: string[];
    caCrl?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  caCert: string[];
    caCrl?: string[]
} & { _this: ObjectReference }, void>(
      "ReplaceCACertificatesAndCRLs", { _this: { attributes: { type: "HostCertificateManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostCpuSchedulerSystem extends ExtensibleManagedObject {
  hyperthreadInfo?: HostHyperThreadScheduleInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostCpuSchedulerSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async disableHyperThreading(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DisableHyperThreading", { _this: { attributes: { type: "HostCpuSchedulerSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async enableHyperThreading(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "EnableHyperThreading", { _this: { attributes: { type: "HostCpuSchedulerSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class HostDatastoreBrowser extends ManagedObject {
  datastore?: Datastore[];
  supportedType?: FileQuery[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostDatastoreBrowser>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { datastore: Datastore,
        supportedType: undefined });
    }
  }
  async deleteFile(args: {
  datastorePath: string
}): Promise<void> {
    const result = await this.connection.exec<{
  datastorePath: string
} & { _this: ObjectReference }, void>(
      "DeleteFile", { _this: { attributes: { type: "HostDatastoreBrowser" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async searchSubFolders(args: {
  datastorePath: string;
    searchSpec?: HostDatastoreBrowserSearchSpec
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  datastorePath: string;
    searchSpec?: HostDatastoreBrowserSearchSpec
} & { _this: ObjectReference }, Task | undefined>(
      "SearchDatastoreSubFolders_Task", { _this: { attributes: { type: "HostDatastoreBrowser" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async search(args: {
  datastorePath: string;
    searchSpec?: HostDatastoreBrowserSearchSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  datastorePath: string;
    searchSpec?: HostDatastoreBrowserSearchSpec
} & { _this: ObjectReference }, Task>(
      "SearchDatastore_Task", { _this: { attributes: { type: "HostDatastoreBrowser" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HostDateTimeSystem extends ManagedObject {
  dateTimeInfo!: HostDateTimeInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostDateTimeSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryAvailableTimeZones(): Promise<HostDateTimeSystemTimeZone[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostDateTimeSystemTimeZone[] | undefined>(
      "QueryAvailableTimeZones", { _this: { attributes: { type: "HostDateTimeSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryDateTime(): Promise<Date> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Date>(
      "QueryDateTime", { _this: { attributes: { type: "HostDateTimeSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, {  });
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshDateTimeSystem", { _this: { attributes: { type: "HostDateTimeSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async updateDateTime(args: {
  dateTime: Date
}): Promise<void> {
    const result = await this.connection.exec<{
  dateTime: Date
} & { _this: ObjectReference }, void>(
      "UpdateDateTime", { _this: { attributes: { type: "HostDateTimeSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateConfig(args: {
  config: HostDateTimeConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostDateTimeConfig
} & { _this: ObjectReference }, void>(
      "UpdateDateTimeConfig", { _this: { attributes: { type: "HostDateTimeSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostDirectoryStore extends HostAuthenticationStore {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostDirectoryStore>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class HostEsxAgentHostManager extends ManagedObject {
  configInfo!: HostEsxAgentHostManagerConfigInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostEsxAgentHostManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async updateConfig(args: {
  configInfo: HostEsxAgentHostManagerConfigInfo
}): Promise<void> {
    const result = await this.connection.exec<{
  configInfo: HostEsxAgentHostManagerConfigInfo
} & { _this: ObjectReference }, void>(
      "EsxAgentHostManagerUpdateConfig", { _this: { attributes: { type: "HostEsxAgentHostManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostFirmwareSystem extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostFirmwareSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async backupConfiguration(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "BackupFirmwareConfiguration", { _this: { attributes: { type: "HostFirmwareSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryConfigUploadURL(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "QueryFirmwareConfigUploadURL", { _this: { attributes: { type: "HostFirmwareSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async resetToFactoryDefaults(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ResetFirmwareToFactoryDefaults", { _this: { attributes: { type: "HostFirmwareSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async restoreConfiguration(args: {
  force: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  force: boolean
} & { _this: ObjectReference }, void>(
      "RestoreFirmwareConfiguration", { _this: { attributes: { type: "HostFirmwareSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostGraphicsManager extends ExtensibleManagedObject {
  graphicsInfo?: HostGraphicsInfo[];
  graphicsConfig?: HostGraphicsConfig;
  sharedPassthruGpuTypes?: string[];
  sharedGpuCapabilities?: HostSharedGpuCapabilities[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostGraphicsManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async isSharedGraphicsActive(): Promise<boolean> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, boolean>(
      "IsSharedGraphicsActive", { _this: { attributes: { type: "HostGraphicsManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshGraphicsManager", { _this: { attributes: { type: "HostGraphicsManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async updateGraphicsConfig(args: {
  config: HostGraphicsConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostGraphicsConfig
} & { _this: ObjectReference }, void>(
      "UpdateGraphicsConfig", { _this: { attributes: { type: "HostGraphicsManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostHealthStatusSystem extends ManagedObject {
  runtime!: HealthSystemRuntime;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostHealthStatusSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async clearSystemEventLog(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ClearSystemEventLog", { _this: { attributes: { type: "HostHealthStatusSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async FetchSystemEventLog(): Promise<SystemEventInfo[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, SystemEventInfo[] | undefined>(
      "FetchSystemEventLog", { _this: { attributes: { type: "HostHealthStatusSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshHealthStatusSystem", { _this: { attributes: { type: "HostHealthStatusSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async resetSystemHealthInfo(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ResetSystemHealthInfo", { _this: { attributes: { type: "HostHealthStatusSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class HostAccessManager extends ManagedObject {
  lockdownMode!: HostLockdownMode;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostAccessManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async changeAccessMode(args: {
  principal: string;
    isGroup: boolean;
    accessMode: HostAccessMode
}): Promise<void> {
    const result = await this.connection.exec<{
  principal: string;
    isGroup: boolean;
    accessMode: HostAccessMode
} & { _this: ObjectReference }, void>(
      "ChangeAccessMode", { _this: { attributes: { type: "HostAccessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async changeLockdownMode(args: {
  mode: HostLockdownMode
}): Promise<void> {
    const result = await this.connection.exec<{
  mode: HostLockdownMode
} & { _this: ObjectReference }, void>(
      "ChangeLockdownMode", { _this: { attributes: { type: "HostAccessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryLockdownExceptions(): Promise<string[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string[] | undefined>(
      "QueryLockdownExceptions", { _this: { attributes: { type: "HostAccessManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async querySystemUsers(): Promise<string[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string[] | undefined>(
      "QuerySystemUsers", { _this: { attributes: { type: "HostAccessManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async retrieveAccessEntries(): Promise<HostAccessControlEntry[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostAccessControlEntry[] | undefined>(
      "RetrieveHostAccessControlEntries", { _this: { attributes: { type: "HostAccessManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async updateLockdownExceptions(args: {
  users?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  users?: string[]
} & { _this: ObjectReference }, void>(
      "UpdateLockdownExceptions", { _this: { attributes: { type: "HostAccessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateSystemUsers(args: {
  users?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  users?: string[]
} & { _this: ObjectReference }, void>(
      "UpdateSystemUsers", { _this: { attributes: { type: "HostAccessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostImageConfigManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostImageConfigManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryHostAcceptanceLevel(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "HostImageConfigGetAcceptance", { _this: { attributes: { type: "HostImageConfigManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryHostImageProfile(): Promise<HostImageProfileSummary> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostImageProfileSummary>(
      "HostImageConfigGetProfile", { _this: { attributes: { type: "HostImageConfigManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { name: undefined,
        vendor: undefined });
  }
  async updateAcceptanceLevel(args: {
  newAcceptanceLevel: string
}): Promise<void> {
    const result = await this.connection.exec<{
  newAcceptanceLevel: string
} & { _this: ObjectReference }, void>(
      "UpdateHostImageAcceptanceLevel", { _this: { attributes: { type: "HostImageConfigManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async fetchSoftwarePackages(): Promise<SoftwarePackage[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, SoftwarePackage[] | undefined>(
      "fetchSoftwarePackages", { _this: { attributes: { type: "HostImageConfigManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async installDate(): Promise<Date> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Date>(
      "installDate", { _this: { attributes: { type: "HostImageConfigManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, {  });
  };
}
export class IscsiManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<IscsiManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async bindVnic(args: {
  iScsiHbaName: string;
    vnicDevice: string
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaName: string;
    vnicDevice: string
} & { _this: ObjectReference }, void>(
      "BindVnic", { _this: { attributes: { type: "IscsiManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryBoundVnics(args: {
  iScsiHbaName: string
}): Promise<IscsiPortInfo[] | undefined> {
    const result = await this.connection.exec<{
  iScsiHbaName: string
} & { _this: ObjectReference }, IscsiPortInfo[] | undefined>(
      "QueryBoundVnics", { _this: { attributes: { type: "IscsiManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCandidateNics(args: {
  iScsiHbaName: string
}): Promise<IscsiPortInfo[] | undefined> {
    const result = await this.connection.exec<{
  iScsiHbaName: string
} & { _this: ObjectReference }, IscsiPortInfo[] | undefined>(
      "QueryCandidateNics", { _this: { attributes: { type: "IscsiManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryMigrationDependencies(args: {
  pnicDevice: string[]
}): Promise<IscsiMigrationDependency> {
    const result = await this.connection.exec<{
  pnicDevice: string[]
} & { _this: ObjectReference }, IscsiMigrationDependency>(
      "QueryMigrationDependencies", { _this: { attributes: { type: "IscsiManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { migrationAllowed: undefined,
        disallowReason: undefined,
        dependency: undefined });
  }
  async queryPnicStatus(args: {
  pnicDevice: string
}): Promise<IscsiStatus> {
    const result = await this.connection.exec<{
  pnicDevice: string
} & { _this: ObjectReference }, IscsiStatus>(
      "QueryPnicStatus", { _this: { attributes: { type: "IscsiManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { reason: undefined });
  }
  async queryVnicStatus(args: {
  vnicDevice: string
}): Promise<IscsiStatus> {
    const result = await this.connection.exec<{
  vnicDevice: string
} & { _this: ObjectReference }, IscsiStatus>(
      "QueryVnicStatus", { _this: { attributes: { type: "IscsiManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { reason: undefined });
  }
  async unbindVnic(args: {
  iScsiHbaName: string;
    vnicDevice: string;
    force: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaName: string;
    vnicDevice: string;
    force: boolean
} & { _this: ObjectReference }, void>(
      "UnbindVnic", { _this: { attributes: { type: "IscsiManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostKernelModuleSystem extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostKernelModuleSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryConfiguredModuleOptionString(args: {
  name: string
}): Promise<string> {
    const result = await this.connection.exec<{
  name: string
} & { _this: ObjectReference }, string>(
      "QueryConfiguredModuleOptionString", { _this: { attributes: { type: "HostKernelModuleSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryModules(): Promise<KernelModuleInfo[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, KernelModuleInfo[] | undefined>(
      "QueryModules", { _this: { attributes: { type: "HostKernelModuleSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async updateModuleOptionString(args: {
  name: string;
    options: string
}): Promise<void> {
    const result = await this.connection.exec<{
  name: string;
    options: string
} & { _this: ObjectReference }, void>(
      "UpdateModuleOptionString", { _this: { attributes: { type: "HostKernelModuleSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostLocalAccountManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostLocalAccountManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async assignUserToGroup(args: {
  user: string;
    group: string
}): Promise<void> {
    const result = await this.connection.exec<{
  user: string;
    group: string
} & { _this: ObjectReference }, void>(
      "AssignUserToGroup", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async changePassword(args: {
  user: string;
    oldPassword: string;
    newPassword: string
}): Promise<void> {
    const result = await this.connection.exec<{
  user: string;
    oldPassword: string;
    newPassword: string
} & { _this: ObjectReference }, void>(
      "ChangePassword", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createGroup(args: {
  group: HostAccountSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  group: HostAccountSpec
} & { _this: ObjectReference }, void>(
      "CreateGroup", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createUser(args: {
  user: HostAccountSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  user: HostAccountSpec
} & { _this: ObjectReference }, void>(
      "CreateUser", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeGroup(args: {
  groupName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  groupName: string
} & { _this: ObjectReference }, void>(
      "RemoveGroup", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeUser(args: {
  userName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  userName: string
} & { _this: ObjectReference }, void>(
      "RemoveUser", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unassignUserFromGroup(args: {
  user: string;
    group: string
}): Promise<void> {
    const result = await this.connection.exec<{
  user: string;
    group: string
} & { _this: ObjectReference }, void>(
      "UnassignUserFromGroup", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateUser(args: {
  user: HostAccountSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  user: HostAccountSpec
} & { _this: ObjectReference }, void>(
      "UpdateUser", { _this: { attributes: { type: "HostLocalAccountManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostLocalAuthentication extends HostAuthenticationStore {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostLocalAuthentication>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class HostMemorySystem extends ExtensibleManagedObject {
  consoleReservationInfo?: ServiceConsoleReservationInfo;
  virtualMachineReservationInfo?: VirtualMachineMemoryReservationInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostMemorySystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async reconfigureServiceConsoleReservation(args: {
  cfgBytes: number
}): Promise<void> {
    const result = await this.connection.exec<{
  cfgBytes: number
} & { _this: ObjectReference }, void>(
      "ReconfigureServiceConsoleReservation", { _this: { attributes: { type: "HostMemorySystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async reconfigureVirtualMachineReservation(args: {
  spec: VirtualMachineMemoryReservationSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: VirtualMachineMemoryReservationSpec
} & { _this: ObjectReference }, void>(
      "ReconfigureVirtualMachineReservation", { _this: { attributes: { type: "HostMemorySystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class MessageBusProxy extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<MessageBusProxy>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class HostNvdimmSystem extends ManagedObject {
  nvdimmSystemInfo!: NvdimmSystemInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostNvdimmSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async createNamespace(args: {
  createSpec: NvdimmNamespaceCreateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  createSpec: NvdimmNamespaceCreateSpec
} & { _this: ObjectReference }, Task>(
      "CreateNvdimmNamespace_Task", { _this: { attributes: { type: "HostNvdimmSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createPMemNamespace(args: {
  createSpec: NvdimmPMemNamespaceCreateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  createSpec: NvdimmPMemNamespaceCreateSpec
} & { _this: ObjectReference }, Task>(
      "CreateNvdimmPMemNamespace_Task", { _this: { attributes: { type: "HostNvdimmSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteBlockNamespaces(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "DeleteNvdimmBlockNamespaces_Task", { _this: { attributes: { type: "HostNvdimmSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteNamespace(args: {
  deleteSpec: NvdimmNamespaceDeleteSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  deleteSpec: NvdimmNamespaceDeleteSpec
} & { _this: ObjectReference }, Task>(
      "DeleteNvdimmNamespace_Task", { _this: { attributes: { type: "HostNvdimmSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HostPatchManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostPatchManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async Check(args: {
  metaUrls?: string[];
    bundleUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  metaUrls?: string[];
    bundleUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
} & { _this: ObjectReference }, Task>(
      "CheckHostPatch_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async InstallV2(args: {
  metaUrls?: string[];
    bundleUrls?: string[];
    vibUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  metaUrls?: string[];
    bundleUrls?: string[];
    vibUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
} & { _this: ObjectReference }, Task>(
      "InstallHostPatchV2_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async Install(args: {
  repository: HostPatchManagerLocator;
    updateID: string;
    force?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  repository: HostPatchManagerLocator;
    updateID: string;
    force?: boolean
} & { _this: ObjectReference }, Task>(
      "InstallHostPatch_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async Query(args: {
  spec?: HostPatchManagerPatchManagerOperationSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec?: HostPatchManagerPatchManagerOperationSpec
} & { _this: ObjectReference }, Task>(
      "QueryHostPatch_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async ScanV2(args: {
  metaUrls?: string[];
    bundleUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  metaUrls?: string[];
    bundleUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
} & { _this: ObjectReference }, Task | undefined>(
      "ScanHostPatchV2_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async Scan(args: {
  repository: HostPatchManagerLocator;
    updateID?: string[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  repository: HostPatchManagerLocator;
    updateID?: string[]
} & { _this: ObjectReference }, Task | undefined>(
      "ScanHostPatch_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async Stage(args: {
  metaUrls?: string[];
    bundleUrls?: string[];
    vibUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  metaUrls?: string[];
    bundleUrls?: string[];
    vibUrls?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
} & { _this: ObjectReference }, Task>(
      "StageHostPatch_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async Uninstall(args: {
  bulletinIds?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  bulletinIds?: string[];
    spec?: HostPatchManagerPatchManagerOperationSpec
} & { _this: ObjectReference }, Task>(
      "UninstallHostPatch_Task", { _this: { attributes: { type: "HostPatchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HostPciPassthruSystem extends ExtensibleManagedObject {
  pciPassthruInfo!: HostPciPassthruInfo[];
  sriovDevicePoolInfo?: HostSriovDevicePoolInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostPciPassthruSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "Refresh", { _this: { attributes: { type: "HostPciPassthruSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async updatePassthruConfig(args: {
  config: HostPciPassthruConfig[]
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostPciPassthruConfig[]
} & { _this: ObjectReference }, void>(
      "UpdatePassthruConfig", { _this: { attributes: { type: "HostPciPassthruSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostPowerSystem extends ManagedObject {
  capability!: PowerSystemCapability;
  info!: PowerSystemInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostPowerSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async configurePolicy(args: {
  key: number
}): Promise<void> {
    const result = await this.connection.exec<{
  key: number
} & { _this: ObjectReference }, void>(
      "ConfigurePowerPolicy", { _this: { attributes: { type: "HostPowerSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostServiceSystem extends ExtensibleManagedObject {
  serviceInfo!: HostServiceInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostServiceSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshServices", { _this: { attributes: { type: "HostServiceSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async restart(args: {
  id: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, void>(
      "RestartService", { _this: { attributes: { type: "HostServiceSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async start(args: {
  id: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, void>(
      "StartService", { _this: { attributes: { type: "HostServiceSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async stop(args: {
  id: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, void>(
      "StopService", { _this: { attributes: { type: "HostServiceSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async uninstall(args: {
  id: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, void>(
      "UninstallService", { _this: { attributes: { type: "HostServiceSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updatePolicy(args: {
  id: string;
    policy: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string;
    policy: string
} & { _this: ObjectReference }, void>(
      "UpdateServicePolicy", { _this: { attributes: { type: "HostServiceSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostSnmpSystem extends ManagedObject {
  configuration!: HostSnmpConfigSpec;
  limits!: HostSnmpSystemAgentLimits;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostSnmpSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async reconfigureSnmpAgent(args: {
  spec: HostSnmpConfigSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: HostSnmpConfigSpec
} & { _this: ObjectReference }, void>(
      "ReconfigureSnmpAgent", { _this: { attributes: { type: "HostSnmpSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async sendTestNotification(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "SendTestNotification", { _this: { attributes: { type: "HostSnmpSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class HostVMotionSystem extends ExtensibleManagedObject {
  netConfig?: HostVMotionNetConfig;
  ipConfig?: HostIpConfig;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostVMotionSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async deselectVnic(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DeselectVnic", { _this: { attributes: { type: "HostVMotionSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async selectVnic(args: {
  device: string
}): Promise<void> {
    const result = await this.connection.exec<{
  device: string
} & { _this: ObjectReference }, void>(
      "SelectVnic", { _this: { attributes: { type: "HostVMotionSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateIpConfig(args: {
  ipConfig: HostIpConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  ipConfig: HostIpConfig
} & { _this: ObjectReference }, void>(
      "UpdateIpConfig", { _this: { attributes: { type: "HostVMotionSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostVirtualNicManager extends ExtensibleManagedObject {
  info!: HostVirtualNicManagerInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostVirtualNicManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async deselectVnic(args: {
  nicType: string;
    device: string
}): Promise<void> {
    const result = await this.connection.exec<{
  nicType: string;
    device: string
} & { _this: ObjectReference }, void>(
      "DeselectVnicForNicType", { _this: { attributes: { type: "HostVirtualNicManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryNetConfig(args: {
  nicType: string
}): Promise<VirtualNicManagerNetConfig | undefined> {
    const result = await this.connection.exec<{
  nicType: string
} & { _this: ObjectReference }, VirtualNicManagerNetConfig | undefined>(
      "QueryNetConfig", { _this: { attributes: { type: "HostVirtualNicManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { nicType: undefined,
        multiSelectAllowed: undefined,
        candidateVnic: undefined,
        selectedVnic: undefined });
  }
  async selectVnic(args: {
  nicType: string;
    device: string
}): Promise<void> {
    const result = await this.connection.exec<{
  nicType: string;
    device: string
} & { _this: ObjectReference }, void>(
      "SelectVnicForNicType", { _this: { attributes: { type: "HostVirtualNicManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostVsanInternalSystem extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostVsanInternalSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async abdicateDomOwnership(args: {
  uuids: string[]
}): Promise<string[] | undefined> {
    const result = await this.connection.exec<{
  uuids: string[]
} & { _this: ObjectReference }, string[] | undefined>(
      "AbdicateDomOwnership", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async canProvisionObjects(args: {
  npbs: VsanNewPolicyBatch[];
    ignoreSatisfiability?: boolean
}): Promise<VsanPolicySatisfiability[]> {
    const result = await this.connection.exec<{
  npbs: VsanNewPolicyBatch[];
    ignoreSatisfiability?: boolean
} & { _this: ObjectReference }, VsanPolicySatisfiability[]>(
      "CanProvisionObjects", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteVsanObjects(args: {
  uuids: string[];
    force?: boolean
}): Promise<HostVsanInternalSystemDeleteVsanObjectsResult[]> {
    const result = await this.connection.exec<{
  uuids: string[];
    force?: boolean
} & { _this: ObjectReference }, HostVsanInternalSystemDeleteVsanObjectsResult[]>(
      "DeleteVsanObjects", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getVsanObjExtAttrs(args: {
  uuids: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  uuids: string[]
} & { _this: ObjectReference }, string>(
      "GetVsanObjExtAttrs", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCmmds(args: {
  queries: HostVsanInternalSystemCmmdsQuery[]
}): Promise<string> {
    const result = await this.connection.exec<{
  queries: HostVsanInternalSystemCmmdsQuery[]
} & { _this: ObjectReference }, string>(
      "QueryCmmds", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryObjectsOnPhysicalVsanDisk(args: {
  disks: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  disks: string[]
} & { _this: ObjectReference }, string>(
      "QueryObjectsOnPhysicalVsanDisk", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryPhysicalVsanDisks(args: {
  props?: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  props?: string[]
} & { _this: ObjectReference }, string>(
      "QueryPhysicalVsanDisks", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async querySyncingVsanObjects(args: {
  uuids?: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  uuids?: string[]
} & { _this: ObjectReference }, string>(
      "QuerySyncingVsanObjects", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryVsanObjectUuidsByFilter(args: {
  uuids?: string[];
    limit?: number;
    version?: number
}): Promise<string[] | undefined> {
    const result = await this.connection.exec<{
  uuids?: string[];
    limit?: number;
    version?: number
} & { _this: ObjectReference }, string[] | undefined>(
      "QueryVsanObjectUuidsByFilter", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryVsanObjects(args: {
  uuids?: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  uuids?: string[]
} & { _this: ObjectReference }, string>(
      "QueryVsanObjects", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryVsanStatistics(args: {
  labels: string[]
}): Promise<string> {
    const result = await this.connection.exec<{
  labels: string[]
} & { _this: ObjectReference }, string>(
      "QueryVsanStatistics", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async reconfigurationSatisfiable(args: {
  pcbs: VsanPolicyChangeBatch[];
    ignoreSatisfiability?: boolean
}): Promise<VsanPolicySatisfiability[]> {
    const result = await this.connection.exec<{
  pcbs: VsanPolicyChangeBatch[];
    ignoreSatisfiability?: boolean
} & { _this: ObjectReference }, VsanPolicySatisfiability[]>(
      "ReconfigurationSatisfiable", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async reconfigureDomObject(args: {
  uuid: string;
    policy: string
}): Promise<void> {
    const result = await this.connection.exec<{
  uuid: string;
    policy: string
} & { _this: ObjectReference }, void>(
      "ReconfigureDomObject", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async runVsanPhysicalDiskDiagnostics(args: {
  disks?: string[]
}): Promise<HostVsanInternalSystemVsanPhysicalDiskDiagnosticsResult[]> {
    const result = await this.connection.exec<{
  disks?: string[]
} & { _this: ObjectReference }, HostVsanInternalSystemVsanPhysicalDiskDiagnosticsResult[]>(
      "RunVsanPhysicalDiskDiagnostics", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async upgradeVsanObjects(args: {
  uuids: string[];
    newVersion: number
}): Promise<HostVsanInternalSystemVsanObjectOperationResult[] | undefined> {
    const result = await this.connection.exec<{
  uuids: string[];
    newVersion: number
} & { _this: ObjectReference }, HostVsanInternalSystemVsanObjectOperationResult[] | undefined>(
      "UpgradeVsanObjects", { _this: { attributes: { type: "HostVsanInternalSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostVsanSystem extends ManagedObject {
  config!: VsanHostConfigInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostVsanSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addDisks(args: {
  disk: HostScsiDisk[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  disk: HostScsiDisk[]
} & { _this: ObjectReference }, Task | undefined>(
      "AddDisks_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async evacuateNode(args: {
  maintenanceSpec: HostMaintenanceSpec;
    timeout: number
}): Promise<Task> {
    const result = await this.connection.exec<{
  maintenanceSpec: HostMaintenanceSpec;
    timeout: number
} & { _this: ObjectReference }, Task>(
      "EvacuateVsanNode_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async initializeDisks(args: {
  mapping: VsanHostDiskMapping[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  mapping: VsanHostDiskMapping[]
} & { _this: ObjectReference }, Task | undefined>(
      "InitializeDisks_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryDisksForVsan(args: {
  canonicalName?: string[]
}): Promise<VsanHostDiskResult[] | undefined> {
    const result = await this.connection.exec<{
  canonicalName?: string[]
} & { _this: ObjectReference }, VsanHostDiskResult[] | undefined>(
      "QueryDisksForVsan", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryHostStatus(): Promise<VsanHostClusterStatus> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VsanHostClusterStatus>(
      "QueryHostStatus", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { uuid: undefined,
        nodeUuid: undefined,
        health: undefined,
        nodeState: undefined,
        memberUuid: undefined });
  }
  async recommissionNode(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "RecommissionVsanNode_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async removeDiskMapping(args: {
  mapping: VsanHostDiskMapping[];
    maintenanceSpec?: HostMaintenanceSpec;
    timeout?: number
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  mapping: VsanHostDiskMapping[];
    maintenanceSpec?: HostMaintenanceSpec;
    timeout?: number
} & { _this: ObjectReference }, Task | undefined>(
      "RemoveDiskMapping_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async removeDisk(args: {
  disk: HostScsiDisk[];
    maintenanceSpec?: HostMaintenanceSpec;
    timeout?: number
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  disk: HostScsiDisk[];
    maintenanceSpec?: HostMaintenanceSpec;
    timeout?: number
} & { _this: ObjectReference }, Task | undefined>(
      "RemoveDisk_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async unmountDiskMapping(args: {
  mapping: VsanHostDiskMapping[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  mapping: VsanHostDiskMapping[]
} & { _this: ObjectReference }, Task>(
      "UnmountDiskMapping_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async update(args: {
  config: VsanHostConfigInfo
}): Promise<Task> {
    const result = await this.connection.exec<{
  config: VsanHostConfigInfo
} & { _this: ObjectReference }, Task>(
      "UpdateVsan_Task", { _this: { attributes: { type: "HostVsanSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class OptionManager extends ManagedObject {
  supportedOption?: OptionDef[];
  setting?: OptionValue[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<OptionManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryView(args: {
  name?: string
}): Promise<OptionValue[] | undefined> {
    const result = await this.connection.exec<{
  name?: string
} & { _this: ObjectReference }, OptionValue[] | undefined>(
      "QueryOptions", { _this: { attributes: { type: "OptionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateValues(args: {
  changedValue: OptionValue[]
}): Promise<void> {
    const result = await this.connection.exec<{
  changedValue: OptionValue[]
} & { _this: ObjectReference }, void>(
      "UpdateOptions", { _this: { attributes: { type: "OptionManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ProfileComplianceManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ProfileComplianceManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async checkCompliance(args: {
  profile?: Profile[];
    entity?: ManagedEntity[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  profile?: Profile[];
    entity?: ManagedEntity[]
} & { _this: ObjectReference }, Task>(
      "CheckCompliance_Task", { _this: { attributes: { type: "ProfileComplianceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async clearComplianceStatus(args: {
  profile?: Profile[];
    entity?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  profile?: Profile[];
    entity?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "ClearComplianceStatus", { _this: { attributes: { type: "ProfileComplianceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryComplianceStatus(args: {
  profile?: Profile[];
    entity?: ManagedEntity[]
}): Promise<ComplianceResult[] | undefined> {
    const result = await this.connection.exec<{
  profile?: Profile[];
    entity?: ManagedEntity[]
} & { _this: ObjectReference }, ComplianceResult[] | undefined>(
      "QueryComplianceStatus", { _this: { attributes: { type: "ProfileComplianceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryExpressionMetadata(args: {
  expressionName?: string[];
    profile?: Profile
}): Promise<ProfileExpressionMetadata[] | undefined> {
    const result = await this.connection.exec<{
  expressionName?: string[];
    profile?: Profile
} & { _this: ObjectReference }, ProfileExpressionMetadata[] | undefined>(
      "QueryExpressionMetadata", { _this: { attributes: { type: "ProfileComplianceManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class Profile extends ManagedObject {
  config!: ProfileConfigInfo;
  description?: ProfileDescription;
  name!: string;
  createdTime!: Date;
  modifiedTime!: Date;
  entity?: ManagedEntity[];
  complianceStatus!: string;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<Profile>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { config: undefined,
        description: undefined,
        name: undefined,
        createdTime: undefined,
        modifiedTime: undefined,
        entity: ManagedEntity,
        complianceStatus: undefined });
    }
  }
  async associateEntities(args: {
  entity: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  entity: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "AssociateProfile", { _this: { attributes: { type: "Profile" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async checkCompliance(args: {
  entity?: ManagedEntity[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity[]
} & { _this: ObjectReference }, Task>(
      "CheckProfileCompliance_Task", { _this: { attributes: { type: "Profile" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async destroy(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyProfile", { _this: { attributes: { type: "Profile" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async dissociateEntities(args: {
  entity?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "DissociateProfile", { _this: { attributes: { type: "Profile" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async exportProfile(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "ExportProfile", { _this: { attributes: { type: "Profile" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async retrieveDescription(): Promise<ProfileDescription | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ProfileDescription | undefined>(
      "RetrieveDescription", { _this: { attributes: { type: "Profile" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { section: undefined });
  };
}
export class ProfileManager extends ManagedObject {
  profile?: Profile[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ProfileManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { profile: Profile });
    }
  }
  async createProfile(args: {
  createSpec: ProfileCreateSpec
}): Promise<Profile> {
    const result = await this.connection.exec<{
  createSpec: ProfileCreateSpec
} & { _this: ObjectReference }, Profile>(
      "CreateProfile", { _this: { attributes: { type: "ProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Profile(this.connection, result);
  }
  async findAssociatedProfile(args: {
  entity: ManagedEntity
}): Promise<Profile[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity
} & { _this: ObjectReference }, Profile[] | undefined>(
      "FindAssociatedProfile", { _this: { attributes: { type: "ProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryPolicyMetadata(args: {
  policyName?: string[];
    profile?: Profile
}): Promise<ProfilePolicyMetadata[] | undefined> {
    const result = await this.connection.exec<{
  policyName?: string[];
    profile?: Profile
} & { _this: ObjectReference }, ProfilePolicyMetadata[] | undefined>(
      "QueryPolicyMetadata", { _this: { attributes: { type: "ProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ClusterProfile extends Profile {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ClusterProfile>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async update(args: {
  config: ClusterProfileConfigSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  config: ClusterProfileConfigSpec
} & { _this: ObjectReference }, void>(
      "UpdateClusterProfile", { _this: { attributes: { type: "ClusterProfile" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ClusterProfileManager extends ProfileManager {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ClusterProfileManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class HostSpecificationManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostSpecificationManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async deleteHostSpecification(args: {
  host: HostSystem
}): Promise<void> {
    const result = await this.connection.exec<{
  host: HostSystem
} & { _this: ObjectReference }, void>(
      "DeleteHostSpecification", { _this: { attributes: { type: "HostSpecificationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteHostSubSpecification(args: {
  host: HostSystem;
    subSpecName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  host: HostSystem;
    subSpecName: string
} & { _this: ObjectReference }, void>(
      "DeleteHostSubSpecification", { _this: { attributes: { type: "HostSpecificationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getUpdatedHosts(args: {
  startChangeID?: string;
    endChangeID?: string
}): Promise<HostSystem[] | undefined> {
    const result = await this.connection.exec<{
  startChangeID?: string;
    endChangeID?: string
} & { _this: ObjectReference }, HostSystem[] | undefined>(
      "HostSpecGetUpdatedHosts", { _this: { attributes: { type: "HostSpecificationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveHostSpecification(args: {
  host: HostSystem;
    fromHost: boolean
}): Promise<HostSpecification> {
    const result = await this.connection.exec<{
  host: HostSystem;
    fromHost: boolean
} & { _this: ObjectReference }, HostSpecification>(
      "RetrieveHostSpecification", { _this: { attributes: { type: "HostSpecificationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { createdTime: undefined,
        lastModified: undefined,
        host: HostSystem,
        subSpecs: undefined,
        changeID: undefined });
  }
  async updateHostSpecification(args: {
  host: HostSystem;
    hostSpec: HostSpecification
}): Promise<void> {
    const result = await this.connection.exec<{
  host: HostSystem;
    hostSpec: HostSpecification
} & { _this: ObjectReference }, void>(
      "UpdateHostSpecification", { _this: { attributes: { type: "HostSpecificationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateHostSubSpecification(args: {
  host: HostSystem;
    hostSubSpec: HostSubSpecification
}): Promise<void> {
    const result = await this.connection.exec<{
  host: HostSystem;
    hostSubSpec: HostSubSpecification
} & { _this: ObjectReference }, void>(
      "UpdateHostSubSpecification", { _this: { attributes: { type: "HostSpecificationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ScheduledTask extends ExtensibleManagedObject {
  info!: ScheduledTaskInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ScheduledTask>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async reconfigure(args: {
  spec: ScheduledTaskSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: ScheduledTaskSpec
} & { _this: ObjectReference }, void>(
      "ReconfigureScheduledTask", { _this: { attributes: { type: "ScheduledTask" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async remove(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RemoveScheduledTask", { _this: { attributes: { type: "ScheduledTask" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async run(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RunScheduledTask", { _this: { attributes: { type: "ScheduledTask" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class ScheduledTaskManager extends ManagedObject {
  scheduledTask?: ScheduledTask[];
  description!: ScheduledTaskDescription;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ScheduledTaskManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { scheduledTask: ScheduledTask,
        description: undefined });
    }
  }
  async createObjectScheduledTask(args: {
  obj: ManagedObject;
    spec: ScheduledTaskSpec
}): Promise<ScheduledTask> {
    const result = await this.connection.exec<{
  obj: ManagedObject;
    spec: ScheduledTaskSpec
} & { _this: ObjectReference }, ScheduledTask>(
      "CreateObjectScheduledTask", { _this: { attributes: { type: "ScheduledTaskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ScheduledTask(this.connection, result);
  }
  async create(args: {
  entity: ManagedEntity;
    spec: ScheduledTaskSpec
}): Promise<ScheduledTask> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    spec: ScheduledTaskSpec
} & { _this: ObjectReference }, ScheduledTask>(
      "CreateScheduledTask", { _this: { attributes: { type: "ScheduledTaskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ScheduledTask(this.connection, result);
  }
  async retrieveEntityScheduledTask(args: {
  entity?: ManagedEntity
}): Promise<ScheduledTask[] | undefined> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity
} & { _this: ObjectReference }, ScheduledTask[] | undefined>(
      "RetrieveEntityScheduledTask", { _this: { attributes: { type: "ScheduledTaskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveObjectScheduledTask(args: {
  obj?: ManagedObject
}): Promise<ScheduledTask[] | undefined> {
    const result = await this.connection.exec<{
  obj?: ManagedObject
} & { _this: ObjectReference }, ScheduledTask[] | undefined>(
      "RetrieveObjectScheduledTask", { _this: { attributes: { type: "ScheduledTaskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class TenantTenantManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<TenantTenantManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async markServiceProviderEntities(args: {
  entity?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "MarkServiceProviderEntities", { _this: { attributes: { type: "TenantTenantManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveServiceProviderEntities(): Promise<ManagedEntity[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ManagedEntity[] | undefined>(
      "RetrieveServiceProviderEntities", { _this: { attributes: { type: "TenantTenantManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async unmarkServiceProviderEntities(args: {
  entity?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "UnmarkServiceProviderEntities", { _this: { attributes: { type: "TenantTenantManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class FailoverClusterConfigurator extends ManagedObject {
  disabledConfigureMethod?: string[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<FailoverClusterConfigurator>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async configure(args: {
  configSpec: VchaClusterConfigSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  configSpec: VchaClusterConfigSpec
} & { _this: ObjectReference }, Task>(
      "configureVcha_Task", { _this: { attributes: { type: "FailoverClusterConfigurator" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createPassiveNode(args: {
  passiveDeploymentSpec: PassiveNodeDeploymentSpec;
    sourceVcSpec: SourceNodeSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  passiveDeploymentSpec: PassiveNodeDeploymentSpec;
    sourceVcSpec: SourceNodeSpec
} & { _this: ObjectReference }, Task>(
      "createPassiveNode_Task", { _this: { attributes: { type: "FailoverClusterConfigurator" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createWitnessNode(args: {
  witnessDeploymentSpec: NodeDeploymentSpec;
    sourceVcSpec: SourceNodeSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  witnessDeploymentSpec: NodeDeploymentSpec;
    sourceVcSpec: SourceNodeSpec
} & { _this: ObjectReference }, Task>(
      "createWitnessNode_Task", { _this: { attributes: { type: "FailoverClusterConfigurator" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deploy(args: {
  deploymentSpec: VchaClusterDeploymentSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  deploymentSpec: VchaClusterDeploymentSpec
} & { _this: ObjectReference }, Task>(
      "deployVcha_Task", { _this: { attributes: { type: "FailoverClusterConfigurator" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async destroy(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "destroyVcha_Task", { _this: { attributes: { type: "FailoverClusterConfigurator" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async getConfig(): Promise<VchaClusterConfigInfo> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VchaClusterConfigInfo>(
      "getVchaConfig", { _this: { attributes: { type: "FailoverClusterConfigurator" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { failoverNodeInfo1: undefined,
        failoverNodeInfo2: undefined,
        witnessNodeInfo: undefined,
        state: undefined });
  }
  async prepare(args: {
  networkSpec: VchaClusterNetworkSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  networkSpec: VchaClusterNetworkSpec
} & { _this: ObjectReference }, Task>(
      "prepareVcha_Task", { _this: { attributes: { type: "FailoverClusterConfigurator" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class FailoverClusterManager extends ManagedObject {
  disabledClusterMethod?: string[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<FailoverClusterManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async getClusterHealth(): Promise<VchaClusterHealth> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VchaClusterHealth>(
      "GetVchaClusterHealth", { _this: { attributes: { type: "FailoverClusterManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { runtimeInfo: undefined,
        healthMessages: undefined,
        additionalInformation: undefined });
  }
  async getClusterMode(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "getClusterMode", { _this: { attributes: { type: "FailoverClusterManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async initiateFailover(args: {
  planned: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  planned: boolean
} & { _this: ObjectReference }, Task>(
      "initiateFailover_Task", { _this: { attributes: { type: "FailoverClusterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async setClusterMode(args: {
  mode: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  mode: string
} & { _this: ObjectReference }, Task>(
      "setClusterMode_Task", { _this: { attributes: { type: "FailoverClusterManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class View extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<View>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async destroy(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyView", { _this: { attributes: { type: "View" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class ViewManager extends ManagedObject {
  viewList?: View[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ViewManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { viewList: View });
    }
  }
  async createContainerView(args: {
  container: ManagedEntity;
    type?: string[];
    recursive: boolean
}): Promise<ContainerView> {
    const result = await this.connection.exec<{
  container: ManagedEntity;
    type?: string[];
    recursive: boolean
} & { _this: ObjectReference }, ContainerView>(
      "CreateContainerView", { _this: { attributes: { type: "ViewManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ContainerView(this.connection, result);
  }
  async createInventoryView(): Promise<InventoryView> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, InventoryView>(
      "CreateInventoryView", { _this: { attributes: { type: "ViewManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return new InventoryView(this.connection, result);
  }
  async createListView(args: {
  obj?: ManagedObject[]
}): Promise<ListView> {
    const result = await this.connection.exec<{
  obj?: ManagedObject[]
} & { _this: ObjectReference }, ListView>(
      "CreateListView", { _this: { attributes: { type: "ViewManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ListView(this.connection, result);
  }
  async createListViewFromView(args: {
  view: View
}): Promise<ListView> {
    const result = await this.connection.exec<{
  view: View
} & { _this: ObjectReference }, ListView>(
      "CreateListViewFromView", { _this: { attributes: { type: "ViewManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ListView(this.connection, result);
  };
}
export class VirtualMachineGuestCustomizationManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualMachineGuestCustomizationManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async abortCustomization(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication
} & { _this: ObjectReference }, Task>(
      "AbortCustomization_Task", { _this: { attributes: { type: "VirtualMachineGuestCustomizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async customize(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    spec: CustomizationSpec;
    configParams?: OptionValue[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    spec: CustomizationSpec;
    configParams?: OptionValue[]
} & { _this: ObjectReference }, Task>(
      "CustomizeGuest_Task", { _this: { attributes: { type: "VirtualMachineGuestCustomizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async startNetwork(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication
} & { _this: ObjectReference }, Task>(
      "StartGuestNetwork_Task", { _this: { attributes: { type: "VirtualMachineGuestCustomizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class VirtualMachineSnapshot extends ExtensibleManagedObject {
  config!: VirtualMachineConfigInfo;
  childSnapshot?: VirtualMachineSnapshot[];
  vm!: VirtualMachine;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualMachineSnapshot>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { config: undefined,
        childSnapshot: VirtualMachineSnapshot,
        vm: VirtualMachine });
    }
  }
  async exportSnapshot(): Promise<HttpNfcLease> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HttpNfcLease>(
      "ExportSnapshot", { _this: { attributes: { type: "VirtualMachineSnapshot" }, $value: this.$value },  }
    ).then(r => r.result);
    return new HttpNfcLease(this.connection, result);
  }
  async remove(args: {
  removeChildren: boolean;
    consolidate?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  removeChildren: boolean;
    consolidate?: boolean
} & { _this: ObjectReference }, Task>(
      "RemoveSnapshot_Task", { _this: { attributes: { type: "VirtualMachineSnapshot" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async rename(args: {
  name?: string;
    description?: string
}): Promise<void> {
    const result = await this.connection.exec<{
  name?: string;
    description?: string
} & { _this: ObjectReference }, void>(
      "RenameSnapshot", { _this: { attributes: { type: "VirtualMachineSnapshot" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async revert(args: {
  host?: HostSystem;
    suppressPowerOn?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    suppressPowerOn?: boolean
} & { _this: ObjectReference }, Task>(
      "RevertToSnapshot_Task", { _this: { attributes: { type: "VirtualMachineSnapshot" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class VirtualMachineCompatibilityChecker extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualMachineCompatibilityChecker>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async checkCompatibility(args: {
  vm: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    testType?: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    testType?: string[]
} & { _this: ObjectReference }, Task>(
      "CheckCompatibility_Task", { _this: { attributes: { type: "VirtualMachineCompatibilityChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkPowerOn(args: {
  vm: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    testType?: string[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    testType?: string[]
} & { _this: ObjectReference }, Task | undefined>(
      "CheckPowerOn_Task", { _this: { attributes: { type: "VirtualMachineCompatibilityChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkVmConfig(args: {
  spec: VirtualMachineConfigSpec;
    vm?: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    testType?: string[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  spec: VirtualMachineConfigSpec;
    vm?: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    testType?: string[]
} & { _this: ObjectReference }, Task | undefined>(
      "CheckVmConfig_Task", { _this: { attributes: { type: "VirtualMachineCompatibilityChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class GuestAliasManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<GuestAliasManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addAlias(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string;
    mapCert: boolean;
    base64Cert: string;
    aliasInfo: GuestAuthAliasInfo
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string;
    mapCert: boolean;
    base64Cert: string;
    aliasInfo: GuestAuthAliasInfo
} & { _this: ObjectReference }, void>(
      "AddGuestAlias", { _this: { attributes: { type: "GuestAliasManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listAliases(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string
}): Promise<GuestAliases[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string
} & { _this: ObjectReference }, GuestAliases[] | undefined>(
      "ListGuestAliases", { _this: { attributes: { type: "GuestAliasManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listMappedAliases(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication
}): Promise<GuestMappedAliases[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication
} & { _this: ObjectReference }, GuestMappedAliases[] | undefined>(
      "ListGuestMappedAliases", { _this: { attributes: { type: "GuestAliasManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeAlias(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string;
    base64Cert: string;
    subject: GuestAuthSubject
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string;
    base64Cert: string;
    subject: GuestAuthSubject
} & { _this: ObjectReference }, void>(
      "RemoveGuestAlias", { _this: { attributes: { type: "GuestAliasManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeAliasByCert(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string;
    base64Cert: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    username: string;
    base64Cert: string
} & { _this: ObjectReference }, void>(
      "RemoveGuestAliasByCert", { _this: { attributes: { type: "GuestAliasManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class GuestAuthManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<GuestAuthManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async acquireCredentials(args: {
  vm: VirtualMachine;
    requestedAuth: GuestAuthentication;
    sessionID?: number
}): Promise<GuestAuthentication> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    requestedAuth: GuestAuthentication;
    sessionID?: number
} & { _this: ObjectReference }, GuestAuthentication>(
      "AcquireCredentialsInGuest", { _this: { attributes: { type: "GuestAuthManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { interactiveSession: undefined });
  }
  async releaseCredentials(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication
} & { _this: ObjectReference }, void>(
      "ReleaseCredentialsInGuest", { _this: { attributes: { type: "GuestAuthManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async validateCredentials(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication
} & { _this: ObjectReference }, void>(
      "ValidateCredentialsInGuest", { _this: { attributes: { type: "GuestAuthManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class GuestFileManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<GuestFileManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async changeFileAttributes(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    guestFilePath: string;
    fileAttributes: GuestFileAttributes
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    guestFilePath: string;
    fileAttributes: GuestFileAttributes
} & { _this: ObjectReference }, void>(
      "ChangeFileAttributesInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createTemporaryDirectory(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    prefix: string;
    suffix: string;
    directoryPath?: string
}): Promise<string> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    prefix: string;
    suffix: string;
    directoryPath?: string
} & { _this: ObjectReference }, string>(
      "CreateTemporaryDirectoryInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createTemporaryFile(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    prefix: string;
    suffix: string;
    directoryPath?: string
}): Promise<string> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    prefix: string;
    suffix: string;
    directoryPath?: string
} & { _this: ObjectReference }, string>(
      "CreateTemporaryFileInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteDirectory(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    directoryPath: string;
    recursive: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    directoryPath: string;
    recursive: boolean
} & { _this: ObjectReference }, void>(
      "DeleteDirectoryInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteFile(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    filePath: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    filePath: string
} & { _this: ObjectReference }, void>(
      "DeleteFileInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async initiateFileTransferFromGuest(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    guestFilePath: string
}): Promise<FileTransferInformation> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    guestFilePath: string
} & { _this: ObjectReference }, FileTransferInformation>(
      "InitiateFileTransferFromGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { attributes: undefined,
        size: undefined,
        url: undefined });
  }
  async initiateFileTransferToGuest(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    guestFilePath: string;
    fileAttributes: GuestFileAttributes;
    fileSize: number;
    overwrite: boolean
}): Promise<string> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    guestFilePath: string;
    fileAttributes: GuestFileAttributes;
    fileSize: number;
    overwrite: boolean
} & { _this: ObjectReference }, string>(
      "InitiateFileTransferToGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listFiles(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    filePath: string;
    index?: number;
    maxResults?: number;
    matchPattern?: string
}): Promise<GuestListFileInfo> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    filePath: string;
    index?: number;
    maxResults?: number;
    matchPattern?: string
} & { _this: ObjectReference }, GuestListFileInfo>(
      "ListFilesInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { files: undefined,
        remaining: undefined });
  }
  async makeDirectory(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    directoryPath: string;
    createParentDirectories: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    directoryPath: string;
    createParentDirectories: boolean
} & { _this: ObjectReference }, void>(
      "MakeDirectoryInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async moveDirectory(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    srcDirectoryPath: string;
    dstDirectoryPath: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    srcDirectoryPath: string;
    dstDirectoryPath: string
} & { _this: ObjectReference }, void>(
      "MoveDirectoryInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async moveFile(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    srcFilePath: string;
    dstFilePath: string;
    overwrite: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    srcFilePath: string;
    dstFilePath: string;
    overwrite: boolean
} & { _this: ObjectReference }, void>(
      "MoveFileInGuest", { _this: { attributes: { type: "GuestFileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class GuestOperationsManager extends ManagedObject {
  authManager?: GuestAuthManager;
  fileManager?: GuestFileManager;
  processManager?: GuestProcessManager;
  guestWindowsRegistryManager?: GuestWindowsRegistryManager;
  aliasManager?: GuestAliasManager;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<GuestOperationsManager>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { authManager: GuestAuthManager,
        fileManager: GuestFileManager,
        processManager: GuestProcessManager,
        guestWindowsRegistryManager: GuestWindowsRegistryManager,
        aliasManager: GuestAliasManager });
    }
  }
  
}
export class GuestProcessManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<GuestProcessManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async listProcesses(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    pids?: number[]
}): Promise<GuestProcessInfo[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    pids?: number[]
} & { _this: ObjectReference }, GuestProcessInfo[] | undefined>(
      "ListProcessesInGuest", { _this: { attributes: { type: "GuestProcessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async readEnvironmentVariable(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    names?: string[]
}): Promise<string[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    names?: string[]
} & { _this: ObjectReference }, string[] | undefined>(
      "ReadEnvironmentVariableInGuest", { _this: { attributes: { type: "GuestProcessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async startProgram(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    spec: GuestProgramSpec
}): Promise<number> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    spec: GuestProgramSpec
} & { _this: ObjectReference }, number>(
      "StartProgramInGuest", { _this: { attributes: { type: "GuestProcessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async terminateProcess(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    pid: number
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    pid: number
} & { _this: ObjectReference }, void>(
      "TerminateProcessInGuest", { _this: { attributes: { type: "GuestProcessManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class GuestWindowsRegistryManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<GuestWindowsRegistryManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async createRegistryKey(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    isVolatile: boolean;
    classType?: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    isVolatile: boolean;
    classType?: string
} & { _this: ObjectReference }, void>(
      "CreateRegistryKeyInGuest", { _this: { attributes: { type: "GuestWindowsRegistryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteRegistryKey(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    recursive: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    recursive: boolean
} & { _this: ObjectReference }, void>(
      "DeleteRegistryKeyInGuest", { _this: { attributes: { type: "GuestWindowsRegistryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteRegistryValue(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    valueName: GuestRegValueNameSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    valueName: GuestRegValueNameSpec
} & { _this: ObjectReference }, void>(
      "DeleteRegistryValueInGuest", { _this: { attributes: { type: "GuestWindowsRegistryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listRegistryKeys(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    recursive: boolean;
    matchPattern?: string
}): Promise<GuestRegKeyRecordSpec[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    recursive: boolean;
    matchPattern?: string
} & { _this: ObjectReference }, GuestRegKeyRecordSpec[] | undefined>(
      "ListRegistryKeysInGuest", { _this: { attributes: { type: "GuestWindowsRegistryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listRegistryValues(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    expandStrings: boolean;
    matchPattern?: string
}): Promise<GuestRegValueSpec[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    keyName: GuestRegKeyNameSpec;
    expandStrings: boolean;
    matchPattern?: string
} & { _this: ObjectReference }, GuestRegValueSpec[] | undefined>(
      "ListRegistryValuesInGuest", { _this: { attributes: { type: "GuestWindowsRegistryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setRegistryValue(args: {
  vm: VirtualMachine;
    auth: GuestAuthentication;
    value: GuestRegValueSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    auth: GuestAuthentication;
    value: GuestRegValueSpec
} & { _this: ObjectReference }, void>(
      "SetRegistryValueInGuest", { _this: { attributes: { type: "GuestWindowsRegistryManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class VStorageObjectManagerBase extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VStorageObjectManagerBase>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class AuthorizationManager extends ManagedObject {
  privilegeList?: AuthorizationPrivilege[];
  roleList?: AuthorizationRole[];
  description!: AuthorizationDescription;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<AuthorizationManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addRole(args: {
  name: string;
    privIds?: string[]
}): Promise<number> {
    const result = await this.connection.exec<{
  name: string;
    privIds?: string[]
} & { _this: ObjectReference }, number>(
      "AddAuthorizationRole", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async fetchUserPrivilegeOnEntities(args: {
  entities: ManagedEntity[];
    userName: string
}): Promise<UserPrivilegeResult[] | undefined> {
    const result = await this.connection.exec<{
  entities: ManagedEntity[];
    userName: string
} & { _this: ObjectReference }, UserPrivilegeResult[] | undefined>(
      "FetchUserPrivilegeOnEntities", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async hasPrivilegeOnEntities(args: {
  entity: ManagedEntity[];
    sessionId: string;
    privId?: string[]
}): Promise<EntityPrivilege[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity[];
    sessionId: string;
    privId?: string[]
} & { _this: ObjectReference }, EntityPrivilege[] | undefined>(
      "HasPrivilegeOnEntities", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async hasPrivilegeOnEntity(args: {
  entity: ManagedEntity;
    sessionId: string;
    privId?: string[]
}): Promise<boolean[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    sessionId: string;
    privId?: string[]
} & { _this: ObjectReference }, boolean[] | undefined>(
      "HasPrivilegeOnEntity", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async hasUserPrivilegeOnEntities(args: {
  entities: ManagedObject[];
    userName: string;
    privId?: string[]
}): Promise<EntityPrivilege[] | undefined> {
    const result = await this.connection.exec<{
  entities: ManagedObject[];
    userName: string;
    privId?: string[]
} & { _this: ObjectReference }, EntityPrivilege[] | undefined>(
      "HasUserPrivilegeOnEntities", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async mergePermissions(args: {
  srcRoleId: number;
    dstRoleId: number
}): Promise<void> {
    const result = await this.connection.exec<{
  srcRoleId: number;
    dstRoleId: number
} & { _this: ObjectReference }, void>(
      "MergePermissions", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeRole(args: {
  roleId: number;
    failIfUsed: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  roleId: number;
    failIfUsed: boolean
} & { _this: ObjectReference }, void>(
      "RemoveAuthorizationRole", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeEntityPermission(args: {
  entity: ManagedEntity;
    user: string;
    isGroup: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    user: string;
    isGroup: boolean
} & { _this: ObjectReference }, void>(
      "RemoveEntityPermission", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async resetEntityPermissions(args: {
  entity: ManagedEntity;
    permission?: Permission[]
}): Promise<void> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    permission?: Permission[]
} & { _this: ObjectReference }, void>(
      "ResetEntityPermissions", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveAllPermissions(): Promise<Permission[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Permission[] | undefined>(
      "RetrieveAllPermissions", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async retrieveEntityPermissions(args: {
  entity: ManagedEntity;
    inherited: boolean
}): Promise<Permission[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    inherited: boolean
} & { _this: ObjectReference }, Permission[] | undefined>(
      "RetrieveEntityPermissions", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveRolePermissions(args: {
  roleId: number
}): Promise<Permission[] | undefined> {
    const result = await this.connection.exec<{
  roleId: number
} & { _this: ObjectReference }, Permission[] | undefined>(
      "RetrieveRolePermissions", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setEntityPermissions(args: {
  entity: ManagedEntity;
    permission?: Permission[]
}): Promise<void> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    permission?: Permission[]
} & { _this: ObjectReference }, void>(
      "SetEntityPermissions", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateRole(args: {
  roleId: number;
    newName: string;
    privIds?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  roleId: number;
    newName: string;
    privIds?: string[]
} & { _this: ObjectReference }, void>(
      "UpdateAuthorizationRole", { _this: { attributes: { type: "AuthorizationManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class LicenseAssignmentManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<LicenseAssignmentManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async queryAssignedLicenses(args: {
  entityId?: string
}): Promise<LicenseAssignmentManagerLicenseAssignment[] | undefined> {
    const result = await this.connection.exec<{
  entityId?: string
} & { _this: ObjectReference }, LicenseAssignmentManagerLicenseAssignment[] | undefined>(
      "QueryAssignedLicenses", { _this: { attributes: { type: "LicenseAssignmentManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeAssignedLicense(args: {
  entityId: string
}): Promise<void> {
    const result = await this.connection.exec<{
  entityId: string
} & { _this: ObjectReference }, void>(
      "RemoveAssignedLicense", { _this: { attributes: { type: "LicenseAssignmentManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateAssignedLicense(args: {
  entity: string;
    licenseKey: string;
    entityDisplayName?: string
}): Promise<LicenseManagerLicenseInfo> {
    const result = await this.connection.exec<{
  entity: string;
    licenseKey: string;
    entityDisplayName?: string
} & { _this: ObjectReference }, LicenseManagerLicenseInfo>(
      "UpdateAssignedLicense", { _this: { attributes: { type: "LicenseAssignmentManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { licenseKey: undefined,
        editionKey: undefined,
        name: undefined,
        total: undefined,
        used: undefined,
        costUnit: undefined,
        properties: undefined,
        labels: undefined });
  };
}
export class ManagedEntity extends ExtensibleManagedObject {
  parent?: ManagedEntity;
  customValue?: CustomFieldValue[];
  overallStatus!: ManagedEntityStatus;
  configStatus!: ManagedEntityStatus;
  configIssue?: Event[];
  effectiveRole?: number[];
  permission?: Permission[];
  name!: string;
  disabledMethod?: string[];
  recentTask?: Task[];
  declaredAlarmState?: AlarmState[];
  triggeredAlarmState?: AlarmState[];
  alarmActionsEnabled?: boolean;
  tag?: Tag[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ManagedEntity>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { parent: ManagedEntity,
        customValue: undefined,
        overallStatus: undefined,
        configStatus: undefined,
        configIssue: undefined,
        effectiveRole: undefined,
        permission: undefined,
        name: undefined,
        disabledMethod: undefined,
        recentTask: Task,
        declaredAlarmState: undefined,
        triggeredAlarmState: undefined,
        alarmActionsEnabled: undefined,
        tag: undefined });
    }
  }
  async destroy(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "Destroy_Task", { _this: { attributes: { type: "ManagedEntity" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async reload(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "Reload", { _this: { attributes: { type: "ManagedEntity" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async rename(args: {
  newName: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  newName: string
} & { _this: ObjectReference }, Task>(
      "Rename_Task", { _this: { attributes: { type: "ManagedEntity" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class Network extends ManagedEntity {
  summary!: NetworkSummary;
  host?: HostSystem[];
  vm?: VirtualMachine[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<Network>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { summary: undefined,
        host: HostSystem,
        vm: VirtualMachine });
    }
  }
  async destroyNetwork(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyNetwork", { _this: { attributes: { type: "Network" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class OpaqueNetwork extends Network {
  capability?: OpaqueNetworkCapability;
  extraConfig?: OptionValue[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<OpaqueNetwork>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class ResourcePool extends ManagedEntity {
  summary!: ResourcePoolSummary;
  runtime!: ResourcePoolRuntimeInfo;
  owner!: ComputeResource;
  resourcePool?: ResourcePool[];
  vm?: VirtualMachine[];
  config!: ResourceConfigSpec;
  namespace?: string;
  childConfiguration?: ResourceConfigSpec[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ResourcePool>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { summary: undefined,
        runtime: undefined,
        owner: ComputeResource,
        resourcePool: ResourcePool,
        vm: VirtualMachine,
        config: undefined,
        namespace: undefined,
        childConfiguration: undefined });
    }
  }
  async createVm(args: {
  config: VirtualMachineConfigSpec;
    host?: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  config: VirtualMachineConfigSpec;
    host?: HostSystem
} & { _this: ObjectReference }, Task>(
      "CreateChildVM_Task", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createResourcePool(args: {
  name: string;
    spec: ResourceConfigSpec
}): Promise<ResourcePool> {
    const result = await this.connection.exec<{
  name: string;
    spec: ResourceConfigSpec
} & { _this: ObjectReference }, ResourcePool>(
      "CreateResourcePool", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ResourcePool(this.connection, result);
  }
  async createVApp(args: {
  name: string;
    resSpec: ResourceConfigSpec;
    configSpec: VAppConfigSpec;
    vmFolder?: Folder
}): Promise<VirtualApp> {
    const result = await this.connection.exec<{
  name: string;
    resSpec: ResourceConfigSpec;
    configSpec: VAppConfigSpec;
    vmFolder?: Folder
} & { _this: ObjectReference }, VirtualApp>(
      "CreateVApp", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new VirtualApp(this.connection, result);
  }
  async destroyChildren(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyChildren", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async importVApp(args: {
  spec: ImportSpec;
    folder?: Folder;
    host?: HostSystem
}): Promise<HttpNfcLease> {
    const result = await this.connection.exec<{
  spec: ImportSpec;
    folder?: Folder;
    host?: HostSystem
} & { _this: ObjectReference }, HttpNfcLease>(
      "ImportVApp", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new HttpNfcLease(this.connection, result);
  }
  async moveInto(args: {
  list: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  list: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "MoveIntoResourcePool", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryResourceConfigOption(): Promise<ResourceConfigOption> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ResourceConfigOption>(
      "QueryResourceConfigOption", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { cpuAllocationOption: undefined,
        memoryAllocationOption: undefined });
  }
  async refreshRuntime(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshRuntime", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async registerVm(args: {
  path: string;
    name?: string;
    host?: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  path: string;
    name?: string;
    host?: HostSystem
} & { _this: ObjectReference }, Task>(
      "RegisterChildVM_Task", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateChildResourceConfiguration(args: {
  spec: ResourceConfigSpec[]
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: ResourceConfigSpec[]
} & { _this: ObjectReference }, void>(
      "UpdateChildResourceConfiguration", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateConfig(args: {
  name?: string;
    config?: ResourceConfigSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  name?: string;
    config?: ResourceConfigSpec
} & { _this: ObjectReference }, void>(
      "UpdateConfig", { _this: { attributes: { type: "ResourcePool" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class Task extends ExtensibleManagedObject {
  info!: TaskInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<Task>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async cancel(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "CancelTask", { _this: { attributes: { type: "Task" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async UpdateDescription(args: {
  description: LocalizableMessage
}): Promise<void> {
    const result = await this.connection.exec<{
  description: LocalizableMessage
} & { _this: ObjectReference }, void>(
      "SetTaskDescription", { _this: { attributes: { type: "Task" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setState(args: {
  state: TaskInfoState;
    result?: any;
    fault?: MethodFault
}): Promise<void> {
    const result = await this.connection.exec<{
  state: TaskInfoState;
    result?: any;
    fault?: MethodFault
} & { _this: ObjectReference }, void>(
      "SetTaskState", { _this: { attributes: { type: "Task" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async UpdateProgress(args: {
  percentDone: number
}): Promise<void> {
    const result = await this.connection.exec<{
  percentDone: number
} & { _this: ObjectReference }, void>(
      "UpdateProgress", { _this: { attributes: { type: "Task" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class VirtualApp extends ResourcePool {
  parentFolder?: Folder;
  datastore?: Datastore[];
  network?: Network[];
  vAppConfig?: VAppConfigInfo;
  parentVApp?: ManagedEntity;
  childLink?: VirtualAppLinkInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualApp>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { parentFolder: Folder,
        datastore: Datastore,
        network: Network,
        vAppConfig: undefined,
        parentVApp: ManagedEntity,
        childLink: undefined });
    }
  }
  async clone(args: {
  name: string;
    target: ResourcePool;
    spec: VAppCloneSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    target: ResourcePool;
    spec: VAppCloneSpec
} & { _this: ObjectReference }, Task>(
      "CloneVApp_Task", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async exportVApp(): Promise<HttpNfcLease> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HttpNfcLease>(
      "ExportVApp", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value },  }
    ).then(r => r.result);
    return new HttpNfcLease(this.connection, result);
  }
  async powerOff(args: {
  force: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  force: boolean
} & { _this: ObjectReference }, Task>(
      "PowerOffVApp_Task", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async powerOn(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "PowerOnVApp_Task", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async suspend(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "SuspendVApp_Task", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateLinkedChildren(args: {
  addChangeSet?: VirtualAppLinkInfo[];
    removeSet?: ManagedEntity[]
}): Promise<void> {
    const result = await this.connection.exec<{
  addChangeSet?: VirtualAppLinkInfo[];
    removeSet?: ManagedEntity[]
} & { _this: ObjectReference }, void>(
      "UpdateLinkedChildren", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVAppConfig(args: {
  spec: VAppConfigSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: VAppConfigSpec
} & { _this: ObjectReference }, void>(
      "UpdateVAppConfig", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unregister(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "unregisterVApp_Task", { _this: { attributes: { type: "VirtualApp" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class VirtualDiskManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualDiskManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async copyVirtualDisk(args: {
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destName: string;
    destDatacenter?: Datacenter;
    destSpec?: VirtualDiskSpec;
    force?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destName: string;
    destDatacenter?: Datacenter;
    destSpec?: VirtualDiskSpec;
    force?: boolean
} & { _this: ObjectReference }, Task>(
      "CopyVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter;
    spec: VirtualDiskSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter;
    spec: VirtualDiskSpec
} & { _this: ObjectReference }, Task>(
      "CreateVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async defragmentVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, Task>(
      "DefragmentVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, Task>(
      "DeleteVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async eagerZeroVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, Task>(
      "EagerZeroVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async extendVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter;
    newCapacityKb: number;
    eagerZero?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter;
    newCapacityKb: number;
    eagerZero?: boolean
} & { _this: ObjectReference }, Task>(
      "ExtendVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async importUnmanagedSnapshot(args: {
  vdisk: string;
    datacenter?: Datacenter;
    vvolId: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vdisk: string;
    datacenter?: Datacenter;
    vvolId: string
} & { _this: ObjectReference }, void>(
      "ImportUnmanagedSnapshot", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async inflateVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, Task>(
      "InflateVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async moveVirtualDisk(args: {
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destName: string;
    destDatacenter?: Datacenter;
    force?: boolean;
    profile?: VirtualMachineProfileSpec[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  sourceName: string;
    sourceDatacenter?: Datacenter;
    destName: string;
    destDatacenter?: Datacenter;
    force?: boolean;
    profile?: VirtualMachineProfileSpec[]
} & { _this: ObjectReference }, Task>(
      "MoveVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryVirtualDiskFragmentation(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<number> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, number>(
      "QueryVirtualDiskFragmentation", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryVirtualDiskGeometry(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<HostDiskDimensionsChs> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, HostDiskDimensionsChs>(
      "QueryVirtualDiskGeometry", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { cylinder: undefined,
        head: undefined,
        sector: undefined });
  }
  async queryVirtualDiskUuid(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<string> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, string>(
      "QueryVirtualDiskUuid", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async releaseManagedSnapshot(args: {
  vdisk: string;
    datacenter?: Datacenter
}): Promise<void> {
    const result = await this.connection.exec<{
  vdisk: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, void>(
      "ReleaseManagedSnapshot", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setVirtualDiskUuid(args: {
  name: string;
    datacenter?: Datacenter;
    uuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter;
    uuid: string
} & { _this: ObjectReference }, void>(
      "SetVirtualDiskUuid", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async shrinkVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter;
    copy?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter;
    copy?: boolean
} & { _this: ObjectReference }, Task>(
      "ShrinkVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async zeroFillVirtualDisk(args: {
  name: string;
    datacenter?: Datacenter
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    datacenter?: Datacenter
} & { _this: ObjectReference }, Task>(
      "ZeroFillVirtualDisk_Task", { _this: { attributes: { type: "VirtualDiskManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class VirtualMachine extends ManagedEntity {
  capability!: VirtualMachineCapability;
  config?: VirtualMachineConfigInfo;
  layout?: VirtualMachineFileLayout;
  layoutEx?: VirtualMachineFileLayoutEx;
  storage?: VirtualMachineStorageInfo;
  environmentBrowser!: EnvironmentBrowser;
  resourcePool?: ResourcePool;
  parentVApp?: ManagedEntity;
  resourceConfig?: ResourceConfigSpec;
  runtime!: VirtualMachineRuntimeInfo;
  guest?: GuestInfo;
  summary!: VirtualMachineSummary;
  datastore?: Datastore[];
  network?: Network[];
  snapshot?: VirtualMachineSnapshotInfo;
  rootSnapshot?: VirtualMachineSnapshot[];
  guestHeartbeatStatus!: ManagedEntityStatus;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualMachine>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { capability: undefined,
        config: undefined,
        layout: undefined,
        layoutEx: undefined,
        storage: undefined,
        environmentBrowser: EnvironmentBrowser,
        resourcePool: ResourcePool,
        parentVApp: ManagedEntity,
        resourceConfig: undefined,
        runtime: undefined,
        guest: undefined,
        summary: undefined,
        datastore: Datastore,
        network: Network,
        snapshot: undefined,
        rootSnapshot: VirtualMachineSnapshot,
        guestHeartbeatStatus: undefined });
    }
  }
  async acquireMksTicket(): Promise<VirtualMachineMksTicket> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VirtualMachineMksTicket>(
      "AcquireMksTicket", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { ticket: undefined,
        cfgFile: undefined,
        host: undefined,
        port: undefined,
        sslThumbprint: undefined });
  }
  async acquireTicket(args: {
  ticketType: string
}): Promise<VirtualMachineTicket> {
    const result = await this.connection.exec<{
  ticketType: string
} & { _this: ObjectReference }, VirtualMachineTicket>(
      "AcquireTicket", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { ticket: undefined,
        cfgFile: undefined,
        host: undefined,
        port: undefined,
        sslThumbprint: undefined,
        url: undefined });
  }
  async answer(args: {
  questionId: string;
    answerChoice: string
}): Promise<void> {
    const result = await this.connection.exec<{
  questionId: string;
    answerChoice: string
} & { _this: ObjectReference }, void>(
      "AnswerVM", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async applyEvcMode(args: {
  mask?: HostFeatureMask[];
    completeMasks?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  mask?: HostFeatureMask[];
    completeMasks?: boolean
} & { _this: ObjectReference }, Task>(
      "ApplyEvcModeVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async attachDisk(args: {
  diskId: ID;
    datastore: Datastore;
    controllerKey?: number;
    unitNumber?: number
}): Promise<Task> {
    const result = await this.connection.exec<{
  diskId: ID;
    datastore: Datastore;
    controllerKey?: number;
    unitNumber?: number
} & { _this: ObjectReference }, Task>(
      "AttachDisk_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkCustomizationSpec(args: {
  spec: CustomizationSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: CustomizationSpec
} & { _this: ObjectReference }, void>(
      "CheckCustomizationSpec", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async clone(args: {
  folder: Folder;
    name: string;
    spec: VirtualMachineCloneSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  folder: Folder;
    name: string;
    spec: VirtualMachineCloneSpec
} & { _this: ObjectReference }, Task>(
      "CloneVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async consolidateDisks(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "ConsolidateVMDisks_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createScreenshot(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "CreateScreenshot_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createSecondaryEx(args: {
  host?: HostSystem;
    spec?: FaultToleranceConfigSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    spec?: FaultToleranceConfigSpec
} & { _this: ObjectReference }, Task>(
      "CreateSecondaryVMEx_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createSecondary(args: {
  host?: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, Task>(
      "CreateSecondaryVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createSnapshotEx(args: {
  name: string;
    description?: string;
    memory: boolean;
    quiesceSpec?: VirtualMachineGuestQuiesceSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    description?: string;
    memory: boolean;
    quiesceSpec?: VirtualMachineGuestQuiesceSpec
} & { _this: ObjectReference }, Task>(
      "CreateSnapshotEx_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createSnapshot(args: {
  name: string;
    description?: string;
    memory: boolean;
    quiesce: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    description?: string;
    memory: boolean;
    quiesce: boolean
} & { _this: ObjectReference }, Task>(
      "CreateSnapshot_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async cryptoUnlock(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "CryptoUnlock_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async customize(args: {
  spec: CustomizationSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: CustomizationSpec
} & { _this: ObjectReference }, Task>(
      "CustomizeVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async defragmentAllDisks(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DefragmentAllDisks", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async detachDisk(args: {
  diskId: ID
}): Promise<Task> {
    const result = await this.connection.exec<{
  diskId: ID
} & { _this: ObjectReference }, Task>(
      "DetachDisk_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async disableSecondary(args: {
  vm: VirtualMachine
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine
} & { _this: ObjectReference }, Task>(
      "DisableSecondaryVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async dropConnections(args: {
  listOfConnections?: VirtualMachineConnection[]
}): Promise<boolean> {
    const result = await this.connection.exec<{
  listOfConnections?: VirtualMachineConnection[]
} & { _this: ObjectReference }, boolean>(
      "DropConnections", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async enableSecondary(args: {
  vm: VirtualMachine;
    host?: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    host?: HostSystem
} & { _this: ObjectReference }, Task>(
      "EnableSecondaryVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async estimateStorageRequirementForConsolidate(): Promise<Task | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task | undefined>(
      "EstimateStorageForConsolidateSnapshots_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async exportVm(): Promise<HttpNfcLease> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HttpNfcLease>(
      "ExportVm", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new HttpNfcLease(this.connection, result);
  }
  async extractOvfEnvironment(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "ExtractOvfEnvironment", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async instantClone(args: {
  spec: VirtualMachineInstantCloneSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: VirtualMachineInstantCloneSpec
} & { _this: ObjectReference }, Task>(
      "InstantClone_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async makePrimary(args: {
  vm: VirtualMachine
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine
} & { _this: ObjectReference }, Task>(
      "MakePrimaryVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async markAsTemplate(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "MarkAsTemplate", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async markAsVirtualMachine(args: {
  pool: ResourcePool;
    host?: HostSystem
}): Promise<void> {
    const result = await this.connection.exec<{
  pool: ResourcePool;
    host?: HostSystem
} & { _this: ObjectReference }, void>(
      "MarkAsVirtualMachine", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async migrate(args: {
  pool?: ResourcePool;
    host?: HostSystem;
    priority: VirtualMachineMovePriority;
    state?: VirtualMachinePowerState
}): Promise<Task> {
    const result = await this.connection.exec<{
  pool?: ResourcePool;
    host?: HostSystem;
    priority: VirtualMachineMovePriority;
    state?: VirtualMachinePowerState
} & { _this: ObjectReference }, Task>(
      "MigrateVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async mountToolsInstaller(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "MountToolsInstaller", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async powerOff(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "PowerOffVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async powerOn(args: {
  host?: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, Task>(
      "PowerOnVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async promoteDisks(args: {
  unlink: boolean;
    disks?: VirtualDisk[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  unlink: boolean;
    disks?: VirtualDisk[]
} & { _this: ObjectReference }, Task>(
      "PromoteDisks_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async putUsbScanCodes(args: {
  spec: UsbScanCodeSpec
}): Promise<number> {
    const result = await this.connection.exec<{
  spec: UsbScanCodeSpec
} & { _this: ObjectReference }, number>(
      "PutUsbScanCodes", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryChangedDiskAreas(args: {
  snapshot?: VirtualMachineSnapshot;
    deviceKey: number;
    startOffset: number;
    changeId: string
}): Promise<DiskChangeInfo> {
    const result = await this.connection.exec<{
  snapshot?: VirtualMachineSnapshot;
    deviceKey: number;
    startOffset: number;
    changeId: string
} & { _this: ObjectReference }, DiskChangeInfo>(
      "QueryChangedDiskAreas", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { startOffset: undefined,
        length: undefined,
        changedArea: undefined });
  }
  async queryConnections(): Promise<VirtualMachineConnection[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VirtualMachineConnection[] | undefined>(
      "QueryConnections", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryFaultToleranceCompatibility(): Promise<MethodFault[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, MethodFault[] | undefined>(
      "QueryFaultToleranceCompatibility", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryFaultToleranceCompatibilityEx(args: {
  forLegacyFt?: boolean
}): Promise<MethodFault[] | undefined> {
    const result = await this.connection.exec<{
  forLegacyFt?: boolean
} & { _this: ObjectReference }, MethodFault[] | undefined>(
      "QueryFaultToleranceCompatibilityEx", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryUnownedFiles(): Promise<string[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string[] | undefined>(
      "QueryUnownedFiles", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async rebootGuest(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RebootGuest", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async reconfigure(args: {
  spec: VirtualMachineConfigSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: VirtualMachineConfigSpec
} & { _this: ObjectReference }, Task>(
      "ReconfigVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async refreshStorageInfo(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshStorageInfo", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async relocate(args: {
  spec: VirtualMachineRelocateSpec;
    priority?: VirtualMachineMovePriority
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: VirtualMachineRelocateSpec;
    priority?: VirtualMachineMovePriority
} & { _this: ObjectReference }, Task>(
      "RelocateVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async removeAllSnapshots(args: {
  consolidate?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  consolidate?: boolean
} & { _this: ObjectReference }, Task>(
      "RemoveAllSnapshots_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async resetGuestInformation(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ResetGuestInformation", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async reset(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "ResetVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async revertToCurrentSnapshot(args: {
  host?: HostSystem;
    suppressPowerOn?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    suppressPowerOn?: boolean
} & { _this: ObjectReference }, Task>(
      "RevertToCurrentSnapshot_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async sendNMI(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "SendNMI", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async setDisplayTopology(args: {
  displays: VirtualMachineDisplayTopology[]
}): Promise<void> {
    const result = await this.connection.exec<{
  displays: VirtualMachineDisplayTopology[]
} & { _this: ObjectReference }, void>(
      "SetDisplayTopology", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setScreenResolution(args: {
  width: number;
    height: number
}): Promise<void> {
    const result = await this.connection.exec<{
  width: number;
    height: number
} & { _this: ObjectReference }, void>(
      "SetScreenResolution", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async shutdownGuest(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ShutdownGuest", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async standbyGuest(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "StandbyGuest", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async startRecording(args: {
  name: string;
    description?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  name: string;
    description?: string
} & { _this: ObjectReference }, Task>(
      "StartRecording_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async startReplaying(args: {
  replaySnapshot: VirtualMachineSnapshot
}): Promise<Task> {
    const result = await this.connection.exec<{
  replaySnapshot: VirtualMachineSnapshot
} & { _this: ObjectReference }, Task>(
      "StartReplaying_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async stopRecording(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "StopRecording_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async stopReplaying(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "StopReplaying_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async suspend(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "SuspendVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async terminateFaultTolerantVM(args: {
  vm?: VirtualMachine
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm?: VirtualMachine
} & { _this: ObjectReference }, Task>(
      "TerminateFaultTolerantVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async terminate(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "TerminateVM", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async turnOffFaultTolerance(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "TurnOffFaultToleranceForVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async unmountToolsInstaller(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "UnmountToolsInstaller", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async unregister(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "UnregisterVM", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async upgradeTools(args: {
  installerOptions?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  installerOptions?: string
} & { _this: ObjectReference }, Task>(
      "UpgradeTools_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async upgradeVirtualHardware(args: {
  version?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  version?: string
} & { _this: ObjectReference }, Task>(
      "UpgradeVM_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async reloadFromPath(args: {
  configurationPath: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  configurationPath: string
} & { _this: ObjectReference }, Task>(
      "reloadVirtualMachineFromPath_Task", { _this: { attributes: { type: "VirtualMachine" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class AlarmManager extends ManagedObject {
  defaultExpression?: AlarmExpression[];
  description!: AlarmDescription;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<AlarmManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async acknowledgeAlarm(args: {
  alarm: Alarm;
    entity: ManagedEntity
}): Promise<void> {
    const result = await this.connection.exec<{
  alarm: Alarm;
    entity: ManagedEntity
} & { _this: ObjectReference }, void>(
      "AcknowledgeAlarm", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getAlarmActionsEnabled(args: {
  entity: ManagedEntity
}): Promise<boolean> {
    const result = await this.connection.exec<{
  entity: ManagedEntity
} & { _this: ObjectReference }, boolean>(
      "AreAlarmActionsEnabled", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async clearTriggeredAlarms(args: {
  filter: AlarmFilterSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  filter: AlarmFilterSpec
} & { _this: ObjectReference }, void>(
      "ClearTriggeredAlarms", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async create(args: {
  entity: ManagedEntity;
    spec: AlarmSpec
}): Promise<Alarm> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    spec: AlarmSpec
} & { _this: ObjectReference }, Alarm>(
      "CreateAlarm", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Alarm(this.connection, result);
  }
  async disableAlarm(args: {
  alarm: Alarm;
    entity: ManagedEntity
}): Promise<void> {
    const result = await this.connection.exec<{
  alarm: Alarm;
    entity: ManagedEntity
} & { _this: ObjectReference }, void>(
      "DisableAlarm", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async enableAlarm(args: {
  alarm: Alarm;
    entity: ManagedEntity
}): Promise<void> {
    const result = await this.connection.exec<{
  alarm: Alarm;
    entity: ManagedEntity
} & { _this: ObjectReference }, void>(
      "EnableAlarm", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setAlarmActionsEnabled(args: {
  entity: ManagedEntity;
    enabled: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  entity: ManagedEntity;
    enabled: boolean
} & { _this: ObjectReference }, void>(
      "EnableAlarmActions", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getAlarm(args: {
  entity?: ManagedEntity
}): Promise<Alarm[] | undefined> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity
} & { _this: ObjectReference }, Alarm[] | undefined>(
      "GetAlarm", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getAlarmState(args: {
  entity: ManagedEntity
}): Promise<AlarmState[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity
} & { _this: ObjectReference }, AlarmState[] | undefined>(
      "GetAlarmState", { _this: { attributes: { type: "AlarmManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class DistributedVirtualPortgroup extends Network {
  key!: string;
  config!: DVPortgroupConfigInfo;
  portKeys?: string[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<DistributedVirtualPortgroup>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async rollback(args: {
  entityBackup?: EntityBackupConfig
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  entityBackup?: EntityBackupConfig
} & { _this: ObjectReference }, Task | undefined>(
      "DVPortgroupRollback_Task", { _this: { attributes: { type: "DistributedVirtualPortgroup" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async reconfigure(args: {
  spec: DVPortgroupConfigSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: DVPortgroupConfigSpec
} & { _this: ObjectReference }, Task>(
      "ReconfigureDVPortgroup_Task", { _this: { attributes: { type: "DistributedVirtualPortgroup" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class CryptoManagerKmip extends CryptoManager {
  kmipServers?: KmipClusterInfo[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<CryptoManagerKmip>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async generateClientCsr(args: {
  cluster: KeyProviderId
}): Promise<string> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId
} & { _this: ObjectReference }, string>(
      "GenerateClientCsr", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async generateKey(args: {
  keyProvider?: KeyProviderId
}): Promise<CryptoKeyResult> {
    const result = await this.connection.exec<{
  keyProvider?: KeyProviderId
} & { _this: ObjectReference }, CryptoKeyResult>(
      "GenerateKey", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { keyId: undefined,
        success: undefined,
        reason: undefined,
        fault: undefined });
  }
  async generateSelfSignedClientCert(args: {
  cluster: KeyProviderId
}): Promise<string> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId
} & { _this: ObjectReference }, string>(
      "GenerateSelfSignedClientCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getDefaultKmsCluster(args: {
  entity?: ManagedEntity;
    defaultsToParent?: boolean
}): Promise<KeyProviderId | undefined> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity;
    defaultsToParent?: boolean
} & { _this: ObjectReference }, KeyProviderId | undefined>(
      "GetDefaultKmsCluster", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { id: undefined });
  }
  async IsKmsClusterActive(args: {
  cluster?: KeyProviderId
}): Promise<boolean> {
    const result = await this.connection.exec<{
  cluster?: KeyProviderId
} & { _this: ObjectReference }, boolean>(
      "IsKmsClusterActive", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listKmipServers(args: {
  limit?: number
}): Promise<KmipClusterInfo[] | undefined> {
    const result = await this.connection.exec<{
  limit?: number
} & { _this: ObjectReference }, KmipClusterInfo[] | undefined>(
      "ListKmipServers", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listKmsClusters(args: {
  includeKmsServers?: boolean;
    managementTypeFilter?: number;
    statusFilter?: number
}): Promise<KmipClusterInfo[] | undefined> {
    const result = await this.connection.exec<{
  includeKmsServers?: boolean;
    managementTypeFilter?: number;
    statusFilter?: number
} & { _this: ObjectReference }, KmipClusterInfo[] | undefined>(
      "ListKmsClusters", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async markDefault(args: {
  clusterId: KeyProviderId
}): Promise<void> {
    const result = await this.connection.exec<{
  clusterId: KeyProviderId
} & { _this: ObjectReference }, void>(
      "MarkDefault", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCryptoKeyStatus(args: {
  keyIds?: CryptoKeyId[];
    checkKeyBitMap: number
}): Promise<CryptoManagerKmipCryptoKeyStatus[] | undefined> {
    const result = await this.connection.exec<{
  keyIds?: CryptoKeyId[];
    checkKeyBitMap: number
} & { _this: ObjectReference }, CryptoManagerKmipCryptoKeyStatus[] | undefined>(
      "QueryCryptoKeyStatus", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async registerKmipServer(args: {
  server: KmipServerSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  server: KmipServerSpec
} & { _this: ObjectReference }, void>(
      "RegisterKmipServer", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async registerKmsCluster(args: {
  clusterId: KeyProviderId;
    managementType?: string
}): Promise<void> {
    const result = await this.connection.exec<{
  clusterId: KeyProviderId;
    managementType?: string
} & { _this: ObjectReference }, void>(
      "RegisterKmsCluster", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeKmipServer(args: {
  clusterId: KeyProviderId;
    serverName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  clusterId: KeyProviderId;
    serverName: string
} & { _this: ObjectReference }, void>(
      "RemoveKmipServer", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveClientCert(args: {
  cluster: KeyProviderId
}): Promise<string> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId
} & { _this: ObjectReference }, string>(
      "RetrieveClientCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveClientCsr(args: {
  cluster: KeyProviderId
}): Promise<string> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId
} & { _this: ObjectReference }, string>(
      "RetrieveClientCsr", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveKmipServerCert(args: {
  keyProvider: KeyProviderId;
    server: KmipServerInfo
}): Promise<CryptoManagerKmipServerCertInfo> {
    const result = await this.connection.exec<{
  keyProvider: KeyProviderId;
    server: KmipServerInfo
} & { _this: ObjectReference }, CryptoManagerKmipServerCertInfo>(
      "RetrieveKmipServerCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { certificate: undefined,
        certInfo: undefined,
        clientTrustServer: undefined });
  }
  async retrieveKmipServersStatus(args: {
  clusters?: KmipClusterInfo[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  clusters?: KmipClusterInfo[]
} & { _this: ObjectReference }, Task | undefined>(
      "RetrieveKmipServersStatus_Task", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async retrieveSelfSignedClientCert(args: {
  cluster: KeyProviderId
}): Promise<string> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId
} & { _this: ObjectReference }, string>(
      "RetrieveSelfSignedClientCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setDefaultKmsCluster(args: {
  entity?: ManagedEntity;
    clusterId?: KeyProviderId
}): Promise<void> {
    const result = await this.connection.exec<{
  entity?: ManagedEntity;
    clusterId?: KeyProviderId
} & { _this: ObjectReference }, void>(
      "SetDefaultKmsCluster", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unregisterKmsCluster(args: {
  clusterId: KeyProviderId
}): Promise<void> {
    const result = await this.connection.exec<{
  clusterId: KeyProviderId
} & { _this: ObjectReference }, void>(
      "UnregisterKmsCluster", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateKmipServer(args: {
  server: KmipServerSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  server: KmipServerSpec
} & { _this: ObjectReference }, void>(
      "UpdateKmipServer", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateKmsSignedCsrClientCert(args: {
  cluster: KeyProviderId;
    certificate: string
}): Promise<void> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId;
    certificate: string
} & { _this: ObjectReference }, void>(
      "UpdateKmsSignedCsrClientCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateSelfSignedClientCert(args: {
  cluster: KeyProviderId;
    certificate: string
}): Promise<void> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId;
    certificate: string
} & { _this: ObjectReference }, void>(
      "UpdateSelfSignedClientCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async uploadClientCert(args: {
  cluster: KeyProviderId;
    certificate: string;
    privateKey: string
}): Promise<void> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId;
    certificate: string;
    privateKey: string
} & { _this: ObjectReference }, void>(
      "UploadClientCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async uploadKmipServerCert(args: {
  cluster: KeyProviderId;
    certificate: string
}): Promise<void> {
    const result = await this.connection.exec<{
  cluster: KeyProviderId;
    certificate: string
} & { _this: ObjectReference }, void>(
      "UploadKmipServerCert", { _this: { attributes: { type: "CryptoManagerKmip" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostActiveDirectoryAuthentication extends HostDirectoryStore {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostActiveDirectoryAuthentication>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async disableSmartCardAuthentication(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DisableSmartCardAuthentication", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async enableSmartCardAuthentication(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "EnableSmartCardAuthentication", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async importCertificateForCAM(args: {
  certPath: string;
    camServer: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  certPath: string;
    camServer: string
} & { _this: ObjectReference }, Task>(
      "ImportCertificateForCAM_Task", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async installSmartCardTrustAnchor(args: {
  cert: string
}): Promise<void> {
    const result = await this.connection.exec<{
  cert: string
} & { _this: ObjectReference }, void>(
      "InstallSmartCardTrustAnchor", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async joinDomainWithCAM(args: {
  domainName: string;
    camServer: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  domainName: string;
    camServer: string
} & { _this: ObjectReference }, Task>(
      "JoinDomainWithCAM_Task", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async joinDomain(args: {
  domainName: string;
    userName: string;
    password: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  domainName: string;
    userName: string;
    password: string
} & { _this: ObjectReference }, Task>(
      "JoinDomain_Task", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async leaveCurrentDomain(args: {
  force: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  force: boolean
} & { _this: ObjectReference }, Task>(
      "LeaveCurrentDomain_Task", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async listSmartCardTrustAnchors(): Promise<string[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string[] | undefined>(
      "ListSmartCardTrustAnchors", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async removeSmartCardTrustAnchor(args: {
  issuer: string;
    serial: string
}): Promise<void> {
    const result = await this.connection.exec<{
  issuer: string;
    serial: string
} & { _this: ObjectReference }, void>(
      "RemoveSmartCardTrustAnchor", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeSmartCardTrustAnchorByFingerprint(args: {
  fingerprint: string;
    digest: string
}): Promise<void> {
    const result = await this.connection.exec<{
  fingerprint: string;
    digest: string
} & { _this: ObjectReference }, void>(
      "RemoveSmartCardTrustAnchorByFingerprint", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async replaceSmartCardTrustAnchors(args: {
  certs?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  certs?: string[]
} & { _this: ObjectReference }, void>(
      "ReplaceSmartCardTrustAnchors", { _this: { attributes: { type: "HostActiveDirectoryAuthentication" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostDatastoreSystem extends ManagedObject {
  datastore?: Datastore[];
  capabilities!: HostDatastoreSystemCapabilities;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostDatastoreSystem>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { datastore: Datastore,
        capabilities: undefined });
    }
  }
  async configureDatastorePrincipal(args: {
  userName: string;
    password?: string
}): Promise<void> {
    const result = await this.connection.exec<{
  userName: string;
    password?: string
} & { _this: ObjectReference }, void>(
      "ConfigureDatastorePrincipal", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createLocalDatastore(args: {
  name: string;
    path: string
}): Promise<Datastore> {
    const result = await this.connection.exec<{
  name: string;
    path: string
} & { _this: ObjectReference }, Datastore>(
      "CreateLocalDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Datastore(this.connection, result);
  }
  async createNasDatastore(args: {
  spec: HostNasVolumeSpec
}): Promise<Datastore> {
    const result = await this.connection.exec<{
  spec: HostNasVolumeSpec
} & { _this: ObjectReference }, Datastore>(
      "CreateNasDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Datastore(this.connection, result);
  }
  async createVmfsDatastore(args: {
  spec: VmfsDatastoreCreateSpec
}): Promise<Datastore> {
    const result = await this.connection.exec<{
  spec: VmfsDatastoreCreateSpec
} & { _this: ObjectReference }, Datastore>(
      "CreateVmfsDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Datastore(this.connection, result);
  }
  async createVvolDatastore(args: {
  spec: HostDatastoreSystemVvolDatastoreSpec
}): Promise<Datastore> {
    const result = await this.connection.exec<{
  spec: HostDatastoreSystemVvolDatastoreSpec
} & { _this: ObjectReference }, Datastore>(
      "CreateVvolDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Datastore(this.connection, result);
  }
  async disableClusteredVmdkSupport(args: {
  datastore: Datastore
}): Promise<void> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, void>(
      "DisableClusteredVmdkSupport", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async enableClusteredVmdkSupport(args: {
  datastore: Datastore
}): Promise<void> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, void>(
      "EnableClusteredVmdkSupport", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async expandVmfsDatastore(args: {
  datastore: Datastore;
    spec: VmfsDatastoreExpandSpec
}): Promise<Datastore> {
    const result = await this.connection.exec<{
  datastore: Datastore;
    spec: VmfsDatastoreExpandSpec
} & { _this: ObjectReference }, Datastore>(
      "ExpandVmfsDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Datastore(this.connection, result);
  }
  async extendVmfsDatastore(args: {
  datastore: Datastore;
    spec: VmfsDatastoreExtendSpec
}): Promise<Datastore> {
    const result = await this.connection.exec<{
  datastore: Datastore;
    spec: VmfsDatastoreExtendSpec
} & { _this: ObjectReference }, Datastore>(
      "ExtendVmfsDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Datastore(this.connection, result);
  }
  async queryAvailableDisksForVmfs(args: {
  datastore?: Datastore
}): Promise<HostScsiDisk[] | undefined> {
    const result = await this.connection.exec<{
  datastore?: Datastore
} & { _this: ObjectReference }, HostScsiDisk[] | undefined>(
      "QueryAvailableDisksForVmfs", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryUnresolvedVmfsVolumes(): Promise<HostUnresolvedVmfsVolume[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostUnresolvedVmfsVolume[] | undefined>(
      "QueryUnresolvedVmfsVolumes", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryVmfsDatastoreCreateOptions(args: {
  devicePath: string;
    vmfsMajorVersion?: number
}): Promise<VmfsDatastoreOption[] | undefined> {
    const result = await this.connection.exec<{
  devicePath: string;
    vmfsMajorVersion?: number
} & { _this: ObjectReference }, VmfsDatastoreOption[] | undefined>(
      "QueryVmfsDatastoreCreateOptions", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryVmfsDatastoreExpandOptions(args: {
  datastore: Datastore
}): Promise<VmfsDatastoreOption[] | undefined> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, VmfsDatastoreOption[] | undefined>(
      "QueryVmfsDatastoreExpandOptions", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryVmfsDatastoreExtendOptions(args: {
  datastore: Datastore;
    devicePath: string;
    suppressExpandCandidates?: boolean
}): Promise<VmfsDatastoreOption[] | undefined> {
    const result = await this.connection.exec<{
  datastore: Datastore;
    devicePath: string;
    suppressExpandCandidates?: boolean
} & { _this: ObjectReference }, VmfsDatastoreOption[] | undefined>(
      "QueryVmfsDatastoreExtendOptions", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeDatastore(args: {
  datastore: Datastore
}): Promise<void> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, void>(
      "RemoveDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeDatastoreEx(args: {
  datastore: Datastore[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  datastore: Datastore[]
} & { _this: ObjectReference }, Task>(
      "RemoveDatastoreEx_Task", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async resignatureUnresolvedVmfsVolume(args: {
  resolutionSpec: HostUnresolvedVmfsResignatureSpec
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  resolutionSpec: HostUnresolvedVmfsResignatureSpec
} & { _this: ObjectReference }, Task | undefined>(
      "ResignatureUnresolvedVmfsVolume_Task", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateLocalSwapDatastore(args: {
  datastore?: Datastore
}): Promise<void> {
    const result = await this.connection.exec<{
  datastore?: Datastore
} & { _this: ObjectReference }, void>(
      "UpdateLocalSwapDatastore", { _this: { attributes: { type: "HostDatastoreSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostFirewallSystem extends ExtensibleManagedObject {
  firewallInfo?: HostFirewallInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostFirewallSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async disableRuleset(args: {
  id: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, void>(
      "DisableRuleset", { _this: { attributes: { type: "HostFirewallSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async enableRuleset(args: {
  id: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string
} & { _this: ObjectReference }, void>(
      "EnableRuleset", { _this: { attributes: { type: "HostFirewallSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshFirewall", { _this: { attributes: { type: "HostFirewallSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async updateDefaultPolicy(args: {
  defaultPolicy: HostFirewallDefaultPolicy
}): Promise<void> {
    const result = await this.connection.exec<{
  defaultPolicy: HostFirewallDefaultPolicy
} & { _this: ObjectReference }, void>(
      "UpdateDefaultPolicy", { _this: { attributes: { type: "HostFirewallSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateRuleset(args: {
  id: string;
    spec: HostFirewallRulesetRulesetSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  id: string;
    spec: HostFirewallRulesetRulesetSpec
} & { _this: ObjectReference }, void>(
      "UpdateRuleset", { _this: { attributes: { type: "HostFirewallSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostNetworkSystem extends ExtensibleManagedObject {
  capabilities?: HostNetCapabilities;
  networkInfo?: HostNetworkInfo;
  offloadCapabilities?: HostNetOffloadCapabilities;
  networkConfig?: HostNetworkConfig;
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  consoleIpRouteConfig?: HostIpRouteConfig;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostNetworkSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addPortGroup(args: {
  portgrp: HostPortGroupSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  portgrp: HostPortGroupSpec
} & { _this: ObjectReference }, void>(
      "AddPortGroup", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addServiceConsoleVirtualNic(args: {
  portgroup: string;
    nic: HostVirtualNicSpec
}): Promise<string> {
    const result = await this.connection.exec<{
  portgroup: string;
    nic: HostVirtualNicSpec
} & { _this: ObjectReference }, string>(
      "AddServiceConsoleVirtualNic", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addVirtualNic(args: {
  portgroup: string;
    nic: HostVirtualNicSpec
}): Promise<string> {
    const result = await this.connection.exec<{
  portgroup: string;
    nic: HostVirtualNicSpec
} & { _this: ObjectReference }, string>(
      "AddVirtualNic", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addVirtualSwitch(args: {
  vswitchName: string;
    spec?: HostVirtualSwitchSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  vswitchName: string;
    spec?: HostVirtualSwitchSpec
} & { _this: ObjectReference }, void>(
      "AddVirtualSwitch", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryNetworkHint(args: {
  device?: string[]
}): Promise<PhysicalNicHintInfo[] | undefined> {
    const result = await this.connection.exec<{
  device?: string[]
} & { _this: ObjectReference }, PhysicalNicHintInfo[] | undefined>(
      "QueryNetworkHint", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshNetworkSystem", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async removePortGroup(args: {
  pgName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  pgName: string
} & { _this: ObjectReference }, void>(
      "RemovePortGroup", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeServiceConsoleVirtualNic(args: {
  device: string
}): Promise<void> {
    const result = await this.connection.exec<{
  device: string
} & { _this: ObjectReference }, void>(
      "RemoveServiceConsoleVirtualNic", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeVirtualNic(args: {
  device: string
}): Promise<void> {
    const result = await this.connection.exec<{
  device: string
} & { _this: ObjectReference }, void>(
      "RemoveVirtualNic", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeVirtualSwitch(args: {
  vswitchName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vswitchName: string
} & { _this: ObjectReference }, void>(
      "RemoveVirtualSwitch", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async restartServiceConsoleVirtualNic(args: {
  device: string
}): Promise<void> {
    const result = await this.connection.exec<{
  device: string
} & { _this: ObjectReference }, void>(
      "RestartServiceConsoleVirtualNic", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateConsoleIpRouteConfig(args: {
  config: HostIpRouteConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostIpRouteConfig
} & { _this: ObjectReference }, void>(
      "UpdateConsoleIpRouteConfig", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateDnsConfig(args: {
  config: HostDnsConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostDnsConfig
} & { _this: ObjectReference }, void>(
      "UpdateDnsConfig", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateIpRouteConfig(args: {
  config: HostIpRouteConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostIpRouteConfig
} & { _this: ObjectReference }, void>(
      "UpdateIpRouteConfig", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateIpRouteTableConfig(args: {
  config: HostIpRouteTableConfig
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostIpRouteTableConfig
} & { _this: ObjectReference }, void>(
      "UpdateIpRouteTableConfig", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateNetworkConfig(args: {
  config: HostNetworkConfig;
    changeMode: string
}): Promise<HostNetworkConfigResult> {
    const result = await this.connection.exec<{
  config: HostNetworkConfig;
    changeMode: string
} & { _this: ObjectReference }, HostNetworkConfigResult>(
      "UpdateNetworkConfig", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { vnicDevice: undefined,
        consoleVnicDevice: undefined });
  }
  async updatePhysicalNicLinkSpeed(args: {
  device: string;
    linkSpeed?: PhysicalNicLinkInfo
}): Promise<void> {
    const result = await this.connection.exec<{
  device: string;
    linkSpeed?: PhysicalNicLinkInfo
} & { _this: ObjectReference }, void>(
      "UpdatePhysicalNicLinkSpeed", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updatePortGroup(args: {
  pgName: string;
    portgrp: HostPortGroupSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  pgName: string;
    portgrp: HostPortGroupSpec
} & { _this: ObjectReference }, void>(
      "UpdatePortGroup", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateServiceConsoleVirtualNic(args: {
  device: string;
    nic: HostVirtualNicSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  device: string;
    nic: HostVirtualNicSpec
} & { _this: ObjectReference }, void>(
      "UpdateServiceConsoleVirtualNic", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVirtualNic(args: {
  device: string;
    nic: HostVirtualNicSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  device: string;
    nic: HostVirtualNicSpec
} & { _this: ObjectReference }, void>(
      "UpdateVirtualNic", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVirtualSwitch(args: {
  vswitchName: string;
    spec: HostVirtualSwitchSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  vswitchName: string;
    spec: HostVirtualSwitchSpec
} & { _this: ObjectReference }, void>(
      "UpdateVirtualSwitch", { _this: { attributes: { type: "HostNetworkSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostVFlashManager extends ManagedObject {
  vFlashConfigInfo?: HostVFlashManagerVFlashConfigInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostVFlashManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async configureVFlashResourceEx(args: {
  devicePath?: string[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  devicePath?: string[]
} & { _this: ObjectReference }, Task | undefined>(
      "ConfigureVFlashResourceEx_Task", { _this: { attributes: { type: "HostVFlashManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async configureHostVFlashCache(args: {
  spec: HostVFlashManagerVFlashCacheConfigSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: HostVFlashManagerVFlashCacheConfigSpec
} & { _this: ObjectReference }, void>(
      "HostConfigVFlashCache", { _this: { attributes: { type: "HostVFlashManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async configureVFlashResource(args: {
  spec: HostVFlashManagerVFlashResourceConfigSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: HostVFlashManagerVFlashResourceConfigSpec
} & { _this: ObjectReference }, void>(
      "HostConfigureVFlashResource", { _this: { attributes: { type: "HostVFlashManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getVFlashModuleDefaultConfig(args: {
  vFlashModule: string
}): Promise<VirtualDiskVFlashCacheConfigInfo> {
    const result = await this.connection.exec<{
  vFlashModule: string
} & { _this: ObjectReference }, VirtualDiskVFlashCacheConfigInfo>(
      "HostGetVFlashModuleDefaultConfig", { _this: { attributes: { type: "HostVFlashManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { vFlashModule: undefined,
        reservationInMB: undefined,
        cacheConsistencyType: undefined,
        cacheMode: undefined,
        blockSizeInKB: undefined });
  }
  async removeVFlashResource(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "HostRemoveVFlashResource", { _this: { attributes: { type: "HostVFlashManager" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class HostProfile extends Profile {
  validationState?: string;
  validationStateUpdateTime?: Date;
  validationFailureInfo?: HostProfileValidationFailureInfo;
  referenceHost?: HostSystem;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostProfile>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { validationState: undefined,
        validationStateUpdateTime: undefined,
        validationFailureInfo: undefined,
        referenceHost: HostSystem });
    }
  }
  async execute(args: {
  host: HostSystem;
    deferredParam?: ProfileDeferredPolicyOptionParameter[]
}): Promise<ProfileExecuteResult> {
    const result = await this.connection.exec<{
  host: HostSystem;
    deferredParam?: ProfileDeferredPolicyOptionParameter[]
} & { _this: ObjectReference }, ProfileExecuteResult>(
      "ExecuteHostProfile", { _this: { attributes: { type: "HostProfile" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { status: undefined,
        configSpec: undefined,
        inapplicablePath: undefined,
        requireInput: undefined,
        error: undefined });
  }
  async ResetValidationState(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "HostProfileResetValidationState", { _this: { attributes: { type: "HostProfile" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async update(args: {
  config: HostProfileConfigSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  config: HostProfileConfigSpec
} & { _this: ObjectReference }, void>(
      "UpdateHostProfile", { _this: { attributes: { type: "HostProfile" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateReferenceHost(args: {
  host?: HostSystem
}): Promise<void> {
    const result = await this.connection.exec<{
  host?: HostSystem
} & { _this: ObjectReference }, void>(
      "UpdateReferenceHost", { _this: { attributes: { type: "HostProfile" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostProfileManager extends ProfileManager {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostProfileManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async applyEntitiesConfiguration(args: {
  applyConfigSpecs?: ApplyHostProfileConfigurationSpec[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  applyConfigSpecs?: ApplyHostProfileConfigurationSpec[]
} & { _this: ObjectReference }, Task | undefined>(
      "ApplyEntitiesConfig_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async applyHostConfiguration(args: {
  host: HostSystem;
    configSpec: HostConfigSpec;
    userInput?: ProfileDeferredPolicyOptionParameter[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem;
    configSpec: HostConfigSpec;
    userInput?: ProfileDeferredPolicyOptionParameter[]
} & { _this: ObjectReference }, Task>(
      "ApplyHostConfig_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkAnswerFileStatus(args: {
  host: HostSystem[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  host: HostSystem[]
} & { _this: ObjectReference }, Task | undefined>(
      "CheckAnswerFileStatus_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async compositeProfile(args: {
  source: Profile;
    targets?: Profile[];
    toBeMerged?: HostApplyProfile;
    toBeReplacedWith?: HostApplyProfile;
    toBeDeleted?: HostApplyProfile;
    enableStatusToBeCopied?: HostApplyProfile
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  source: Profile;
    targets?: Profile[];
    toBeMerged?: HostApplyProfile;
    toBeReplacedWith?: HostApplyProfile;
    toBeDeleted?: HostApplyProfile;
    enableStatusToBeCopied?: HostApplyProfile
} & { _this: ObjectReference }, Task | undefined>(
      "CompositeHostProfile_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createDefaultProfile(args: {
  profileType: string;
    profileTypeName?: string;
    profile?: Profile
}): Promise<ApplyProfile> {
    const result = await this.connection.exec<{
  profileType: string;
    profileTypeName?: string;
    profile?: Profile
} & { _this: ObjectReference }, ApplyProfile>(
      "CreateDefaultProfile", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { enabled: undefined,
        policy: undefined,
        profileTypeName: undefined,
        profileVersion: undefined,
        property: undefined,
        favorite: undefined,
        toBeMerged: undefined,
        toReplaceWith: undefined,
        toBeDeleted: undefined,
        copyEnableStatus: undefined,
        hidden: undefined });
  }
  async exportAnswerFile(args: {
  host: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem
} & { _this: ObjectReference }, Task>(
      "ExportAnswerFile_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async generateConfigTaskList(args: {
  configSpec: HostConfigSpec;
    host: HostSystem
}): Promise<HostProfileManagerConfigTaskList> {
    const result = await this.connection.exec<{
  configSpec: HostConfigSpec;
    host: HostSystem
} & { _this: ObjectReference }, HostProfileManagerConfigTaskList>(
      "GenerateConfigTaskList", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { configSpec: undefined,
        taskDescription: undefined,
        taskListRequirement: undefined });
  }
  async generateHostConfigTaskSpec(args: {
  hostsInfo?: StructuredCustomizations[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  hostsInfo?: StructuredCustomizations[]
} & { _this: ObjectReference }, Task | undefined>(
      "GenerateHostConfigTaskSpec_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async generateTaskList(args: {
  configSpec: HostConfigSpec;
    host: HostSystem
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  configSpec: HostConfigSpec;
    host: HostSystem
} & { _this: ObjectReference }, Task | undefined>(
      "GenerateHostProfileTaskList_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryAnswerFileStatus(args: {
  host: HostSystem[]
}): Promise<AnswerFileStatusResult[] | undefined> {
    const result = await this.connection.exec<{
  host: HostSystem[]
} & { _this: ObjectReference }, AnswerFileStatusResult[] | undefined>(
      "QueryAnswerFileStatus", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryProfileMetadata(args: {
  profileName?: string[];
    profile?: Profile
}): Promise<ProfileMetadata[] | undefined> {
    const result = await this.connection.exec<{
  profileName?: string[];
    profile?: Profile
} & { _this: ObjectReference }, ProfileMetadata[] | undefined>(
      "QueryHostProfileMetadata", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryProfileStructure(args: {
  profile?: Profile
}): Promise<ProfileProfileStructure> {
    const result = await this.connection.exec<{
  profile?: Profile
} & { _this: ObjectReference }, ProfileProfileStructure>(
      "QueryProfileStructure", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { profileTypeName: undefined,
        child: undefined });
  }
  async retrieveAnswerFile(args: {
  host: HostSystem
}): Promise<AnswerFile | undefined> {
    const result = await this.connection.exec<{
  host: HostSystem
} & { _this: ObjectReference }, AnswerFile | undefined>(
      "RetrieveAnswerFile", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { userInput: undefined,
        createdTime: undefined,
        modifiedTime: undefined });
  }
  async retrieveAnswerFileForProfile(args: {
  host: HostSystem;
    applyProfile: HostApplyProfile
}): Promise<AnswerFile | undefined> {
    const result = await this.connection.exec<{
  host: HostSystem;
    applyProfile: HostApplyProfile
} & { _this: ObjectReference }, AnswerFile | undefined>(
      "RetrieveAnswerFileForProfile", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { userInput: undefined,
        createdTime: undefined,
        modifiedTime: undefined });
  }
  async retrieveHostCustomizations(args: {
  hosts?: HostSystem[]
}): Promise<StructuredCustomizations[] | undefined> {
    const result = await this.connection.exec<{
  hosts?: HostSystem[]
} & { _this: ObjectReference }, StructuredCustomizations[] | undefined>(
      "RetrieveHostCustomizations", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveHostCustomizationsForProfile(args: {
  hosts?: HostSystem[];
    applyProfile: HostApplyProfile
}): Promise<StructuredCustomizations[] | undefined> {
    const result = await this.connection.exec<{
  hosts?: HostSystem[];
    applyProfile: HostApplyProfile
} & { _this: ObjectReference }, StructuredCustomizations[] | undefined>(
      "RetrieveHostCustomizationsForProfile", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateAnswerFile(args: {
  host: HostSystem;
    configSpec: AnswerFileCreateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem;
    configSpec: AnswerFileCreateSpec
} & { _this: ObjectReference }, Task>(
      "UpdateAnswerFile_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateHostCustomizations(args: {
  hostToConfigSpecMap?: HostProfileManagerHostToConfigSpecMap[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  hostToConfigSpecMap?: HostProfileManagerHostToConfigSpecMap[]
} & { _this: ObjectReference }, Task | undefined>(
      "UpdateHostCustomizations_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async validateComposition(args: {
  source: Profile;
    targets?: Profile[];
    toBeMerged?: HostApplyProfile;
    toReplaceWith?: HostApplyProfile;
    toBeDeleted?: HostApplyProfile;
    enableStatusToBeCopied?: HostApplyProfile;
    errorOnly?: boolean
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  source: Profile;
    targets?: Profile[];
    toBeMerged?: HostApplyProfile;
    toReplaceWith?: HostApplyProfile;
    toBeDeleted?: HostApplyProfile;
    enableStatusToBeCopied?: HostApplyProfile;
    errorOnly?: boolean
} & { _this: ObjectReference }, Task | undefined>(
      "ValidateHostProfileComposition_Task", { _this: { attributes: { type: "HostProfileManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class ManagedObjectView extends View {
  view?: ManagedObject[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ManagedObjectView>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class VirtualMachineProvisioningChecker extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VirtualMachineProvisioningChecker>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async checkClone(args: {
  vm: VirtualMachine;
    folder: Folder;
    name: string;
    spec: VirtualMachineCloneSpec;
    testType?: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    folder: Folder;
    name: string;
    spec: VirtualMachineCloneSpec;
    testType?: string[]
} & { _this: ObjectReference }, Task>(
      "CheckClone_Task", { _this: { attributes: { type: "VirtualMachineProvisioningChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkInstantClone(args: {
  vm: VirtualMachine;
    spec: VirtualMachineInstantCloneSpec;
    testType?: string[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    spec: VirtualMachineInstantCloneSpec;
    testType?: string[]
} & { _this: ObjectReference }, Task | undefined>(
      "CheckInstantClone_Task", { _this: { attributes: { type: "VirtualMachineProvisioningChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkMigrate(args: {
  vm: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    state?: VirtualMachinePowerState;
    testType?: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    host?: HostSystem;
    pool?: ResourcePool;
    state?: VirtualMachinePowerState;
    testType?: string[]
} & { _this: ObjectReference }, Task>(
      "CheckMigrate_Task", { _this: { attributes: { type: "VirtualMachineProvisioningChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async checkRelocate(args: {
  vm: VirtualMachine;
    spec: VirtualMachineRelocateSpec;
    testType?: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    spec: VirtualMachineRelocateSpec;
    testType?: string[]
} & { _this: ObjectReference }, Task>(
      "CheckRelocate_Task", { _this: { attributes: { type: "VirtualMachineProvisioningChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryVMotionCompatibilityEx(args: {
  vm: VirtualMachine[];
    host: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine[];
    host: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "QueryVMotionCompatibilityEx_Task", { _this: { attributes: { type: "VirtualMachineProvisioningChecker" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HostVStorageObjectManager extends VStorageObjectManagerBase {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostVStorageObjectManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async clearVStorageObjectControlFlags(args: {
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
} & { _this: ObjectReference }, void>(
      "HostClearVStorageObjectControlFlags", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async cloneVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    spec: VslmCloneSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    spec: VslmCloneSpec
} & { _this: ObjectReference }, Task>(
      "HostCloneVStorageObject_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createDisk(args: {
  spec: VslmCreateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: VslmCreateSpec
} & { _this: ObjectReference }, Task>(
      "HostCreateDisk_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteVStorageObject(args: {
  id: ID;
    datastore: Datastore
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, Task>(
      "HostDeleteVStorageObject_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async extendDisk(args: {
  id: ID;
    datastore: Datastore;
    newCapacityInMB: number
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    newCapacityInMB: number
} & { _this: ObjectReference }, Task>(
      "HostExtendDisk_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async inflateDisk(args: {
  id: ID;
    datastore: Datastore
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, Task>(
      "HostInflateDisk_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async listVStorageObject(args: {
  datastore: Datastore
}): Promise<ID[] | undefined> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, ID[] | undefined>(
      "HostListVStorageObject", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async reconcileDatastoreInventory(args: {
  datastore: Datastore
}): Promise<Task> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, Task>(
      "HostReconcileDatastoreInventory_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async registerDisk(args: {
  path: string;
    name?: string
}): Promise<VStorageObject> {
    const result = await this.connection.exec<{
  path: string;
    name?: string
} & { _this: ObjectReference }, VStorageObject>(
      "HostRegisterDisk", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { config: undefined });
  }
  async relocateVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    spec: VslmRelocateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    spec: VslmRelocateSpec
} & { _this: ObjectReference }, Task>(
      "HostRelocateVStorageObject_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async renameVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    name: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    name: string
} & { _this: ObjectReference }, void>(
      "HostRenameVStorageObject", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveVStorageInfrastructureObjectPolicy(args: {
  datastore: Datastore
}): Promise<vslmInfrastructureObjectPolicy[] | undefined> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, vslmInfrastructureObjectPolicy[] | undefined>(
      "HostRetrieveVStorageInfrastructureObjectPolicy", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveVStorageObject(args: {
  id: ID;
    datastore: Datastore
}): Promise<VStorageObject> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, VStorageObject>(
      "HostRetrieveVStorageObject", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { config: undefined });
  }
  async retrieveVStorageObjectMetadata(args: {
  id: ID;
    datastore: Datastore;
    snapshotId?: ID;
    prefix?: string
}): Promise<KeyValue[] | undefined> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId?: ID;
    prefix?: string
} & { _this: ObjectReference }, KeyValue[] | undefined>(
      "HostRetrieveVStorageObjectMetadata", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveVStorageObjectMetadataValue(args: {
  id: ID;
    datastore: Datastore;
    snapshotId?: ID;
    key: string
}): Promise<string> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId?: ID;
    key: string
} & { _this: ObjectReference }, string>(
      "HostRetrieveVStorageObjectMetadataValue", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveVStorageObjectState(args: {
  id: ID;
    datastore: Datastore
}): Promise<VStorageObjectStateInfo> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, VStorageObjectStateInfo>(
      "HostRetrieveVStorageObjectState", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { tentative: undefined });
  }
  async scheduleReconcileDatastoreInventory(args: {
  datastore: Datastore
}): Promise<void> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, void>(
      "HostScheduleReconcileDatastoreInventory", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setVStorageObjectControlFlags(args: {
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
} & { _this: ObjectReference }, void>(
      "HostSetVStorageObjectControlFlags", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVStorageObjectMetadata(args: {
  id: ID;
    datastore: Datastore;
    metadata?: KeyValue[];
    deleteKeys?: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    metadata?: KeyValue[];
    deleteKeys?: string[]
} & { _this: ObjectReference }, Task>(
      "HostUpdateVStorageObjectMetadata_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createDiskFromSnapshot(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID;
    name: string;
    profile?: VirtualMachineProfileSpec[];
    crypto?: CryptoSpec;
    path?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID;
    name: string;
    profile?: VirtualMachineProfileSpec[];
    crypto?: CryptoSpec;
    path?: string
} & { _this: ObjectReference }, Task>(
      "HostVStorageObjectCreateDiskFromSnapshot_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createSnapshot(args: {
  id: ID;
    datastore: Datastore;
    description: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    description: string
} & { _this: ObjectReference }, Task>(
      "HostVStorageObjectCreateSnapshot_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteSnapshot(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID
} & { _this: ObjectReference }, Task>(
      "HostVStorageObjectDeleteSnapshot_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async retrieveSnapshotInfo(args: {
  id: ID;
    datastore: Datastore
}): Promise<VStorageObjectSnapshotInfo> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, VStorageObjectSnapshotInfo>(
      "HostVStorageObjectRetrieveSnapshotInfo", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { snapshots: undefined });
  }
  async RevertVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID
} & { _this: ObjectReference }, Task>(
      "HostVStorageObjectRevert_Task", { _this: { attributes: { type: "HostVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class VcenterVStorageObjectManager extends VStorageObjectManagerBase {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VcenterVStorageObjectManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async attachTagToVStorageObject(args: {
  id: ID;
    category: string;
    tag: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    category: string;
    tag: string
} & { _this: ObjectReference }, void>(
      "AttachTagToVStorageObject", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async clearVStorageObjectControlFlags(args: {
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
} & { _this: ObjectReference }, void>(
      "ClearVStorageObjectControlFlags", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async cloneVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    spec: VslmCloneSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    spec: VslmCloneSpec
} & { _this: ObjectReference }, Task>(
      "CloneVStorageObject_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createDiskFromSnapshot(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID;
    name: string;
    profile?: VirtualMachineProfileSpec[];
    crypto?: CryptoSpec;
    path?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID;
    name: string;
    profile?: VirtualMachineProfileSpec[];
    crypto?: CryptoSpec;
    path?: string
} & { _this: ObjectReference }, Task>(
      "CreateDiskFromSnapshot_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createDisk(args: {
  spec: VslmCreateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: VslmCreateSpec
} & { _this: ObjectReference }, Task>(
      "CreateDisk_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteSnapshot(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID
} & { _this: ObjectReference }, Task>(
      "DeleteSnapshot_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async deleteVStorageObject(args: {
  id: ID;
    datastore: Datastore
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, Task>(
      "DeleteVStorageObject_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async detachTagFromVStorageObject(args: {
  id: ID;
    category: string;
    tag: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    category: string;
    tag: string
} & { _this: ObjectReference }, void>(
      "DetachTagFromVStorageObject", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async extendDisk(args: {
  id: ID;
    datastore: Datastore;
    newCapacityInMB: number
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    newCapacityInMB: number
} & { _this: ObjectReference }, Task>(
      "ExtendDisk_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async inflateDisk(args: {
  id: ID;
    datastore: Datastore
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, Task>(
      "InflateDisk_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async listTagsAttachedToVStorageObject(args: {
  id: ID
}): Promise<VslmTagEntry[] | undefined> {
    const result = await this.connection.exec<{
  id: ID
} & { _this: ObjectReference }, VslmTagEntry[] | undefined>(
      "ListTagsAttachedToVStorageObject", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listVStorageObject(args: {
  datastore: Datastore
}): Promise<ID[] | undefined> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, ID[] | undefined>(
      "ListVStorageObject", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async listVStorageObjectsAttachedToTag(args: {
  category: string;
    tag: string
}): Promise<ID[] | undefined> {
    const result = await this.connection.exec<{
  category: string;
    tag: string
} & { _this: ObjectReference }, ID[] | undefined>(
      "ListVStorageObjectsAttachedToTag", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async reconcileDatastoreInventory(args: {
  datastore: Datastore
}): Promise<Task> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, Task>(
      "ReconcileDatastoreInventory_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async registerDisk(args: {
  path: string;
    name?: string
}): Promise<VStorageObject> {
    const result = await this.connection.exec<{
  path: string;
    name?: string
} & { _this: ObjectReference }, VStorageObject>(
      "RegisterDisk", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { config: undefined });
  }
  async relocateVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    spec: VslmRelocateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    spec: VslmRelocateSpec
} & { _this: ObjectReference }, Task>(
      "RelocateVStorageObject_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async renameVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    name: string
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    name: string
} & { _this: ObjectReference }, void>(
      "RenameVStorageObject", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveSnapshotDetails(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID
}): Promise<VStorageObjectSnapshotDetails> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID
} & { _this: ObjectReference }, VStorageObjectSnapshotDetails>(
      "RetrieveSnapshotDetails", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { path: undefined,
        changedBlockTrackingId: undefined });
  }
  async retrieveSnapshotInfo(args: {
  id: ID;
    datastore: Datastore
}): Promise<VStorageObjectSnapshotInfo> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, VStorageObjectSnapshotInfo>(
      "RetrieveSnapshotInfo", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { snapshots: undefined });
  }
  async retrieveVStorageInfrastructureObjectPolicy(args: {
  datastore: Datastore
}): Promise<vslmInfrastructureObjectPolicy[] | undefined> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, vslmInfrastructureObjectPolicy[] | undefined>(
      "RetrieveVStorageInfrastructureObjectPolicy", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveVStorageObject(args: {
  id: ID;
    datastore: Datastore
}): Promise<VStorageObject> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, VStorageObject>(
      "RetrieveVStorageObject", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { config: undefined });
  }
  async retrieveVStorageObjectAssociations(args: {
  ids?: RetrieveVStorageObjSpec[]
}): Promise<VStorageObjectAssociations[] | undefined> {
    const result = await this.connection.exec<{
  ids?: RetrieveVStorageObjSpec[]
} & { _this: ObjectReference }, VStorageObjectAssociations[] | undefined>(
      "RetrieveVStorageObjectAssociations", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveVStorageObjectState(args: {
  id: ID;
    datastore: Datastore
}): Promise<VStorageObjectStateInfo> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore
} & { _this: ObjectReference }, VStorageObjectStateInfo>(
      "RetrieveVStorageObjectState", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { tentative: undefined });
  }
  async RevertVStorageObject(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID
} & { _this: ObjectReference }, Task>(
      "RevertVStorageObject_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async scheduleReconcileDatastoreInventory(args: {
  datastore: Datastore
}): Promise<void> {
    const result = await this.connection.exec<{
  datastore: Datastore
} & { _this: ObjectReference }, void>(
      "ScheduleReconcileDatastoreInventory", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setVStorageObjectControlFlags(args: {
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    controlFlags?: string[]
} & { _this: ObjectReference }, void>(
      "SetVStorageObjectControlFlags", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVStorageInfrastructureObjectPolicy(args: {
  spec: vslmInfrastructureObjectPolicySpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: vslmInfrastructureObjectPolicySpec
} & { _this: ObjectReference }, Task>(
      "UpdateVStorageInfrastructureObjectPolicy_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateVStorageObjectCrypto(args: {
  id: ID;
    datastore: Datastore;
    profile?: VirtualMachineProfileSpec[];
    disksCrypto?: DiskCryptoSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    profile?: VirtualMachineProfileSpec[];
    disksCrypto?: DiskCryptoSpec
} & { _this: ObjectReference }, Task>(
      "UpdateVStorageObjectCrypto_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateVStorageObjectPolicy(args: {
  id: ID;
    datastore: Datastore;
    profile?: VirtualMachineProfileSpec[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    profile?: VirtualMachineProfileSpec[]
} & { _this: ObjectReference }, Task>(
      "UpdateVStorageObjectPolicy_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createSnapshot(args: {
  id: ID;
    datastore: Datastore;
    description: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    description: string
} & { _this: ObjectReference }, Task>(
      "VStorageObjectCreateSnapshot_Task", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryChangedDiskAreas(args: {
  id: ID;
    datastore: Datastore;
    snapshotId: ID;
    startOffset: number;
    changeId: string
}): Promise<DiskChangeInfo> {
    const result = await this.connection.exec<{
  id: ID;
    datastore: Datastore;
    snapshotId: ID;
    startOffset: number;
    changeId: string
} & { _this: ObjectReference }, DiskChangeInfo>(
      "VstorageObjectVCenterQueryChangedDiskAreas", { _this: { attributes: { type: "VcenterVStorageObjectManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { startOffset: undefined,
        length: undefined,
        changedArea: undefined });
  };
}
export class ComputeResource extends ManagedEntity {
  resourcePool?: ResourcePool;
  host?: HostSystem[];
  datastore?: Datastore[];
  network?: Network[];
  summary!: ComputeResourceSummary;
  environmentBrowser?: EnvironmentBrowser;
  configurationEx!: ComputeResourceConfigInfo;
  lifecycleManaged?: boolean;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ComputeResource>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { resourcePool: ResourcePool,
        host: HostSystem,
        datastore: Datastore,
        network: Network,
        summary: undefined,
        environmentBrowser: EnvironmentBrowser,
        configurationEx: undefined,
        lifecycleManaged: undefined });
    }
  }
  async reconfigureEx(args: {
  spec: ComputeResourceConfigSpec;
    modify: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: ComputeResourceConfigSpec;
    modify: boolean
} & { _this: ObjectReference }, Task>(
      "ReconfigureComputeResource_Task", { _this: { attributes: { type: "ComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class Datacenter extends ManagedEntity {
  vmFolder!: Folder;
  hostFolder!: Folder;
  datastoreFolder!: Folder;
  networkFolder!: Folder;
  datastore?: Datastore[];
  network?: Network[];
  configuration!: DatacenterConfigInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<Datacenter>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { vmFolder: Folder,
        hostFolder: Folder,
        datastoreFolder: Folder,
        networkFolder: Folder,
        datastore: Datastore,
        network: Network,
        configuration: undefined });
    }
  }
  async batchQueryConnectInfo(args: {
  hostSpecs?: HostConnectSpec[]
}): Promise<DatacenterBasicConnectInfo[] | undefined> {
    const result = await this.connection.exec<{
  hostSpecs?: HostConnectSpec[]
} & { _this: ObjectReference }, DatacenterBasicConnectInfo[] | undefined>(
      "BatchQueryConnectInfo", { _this: { attributes: { type: "Datacenter" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async powerOnVm(args: {
  vm: VirtualMachine[];
    option?: OptionValue[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vm: VirtualMachine[];
    option?: OptionValue[]
} & { _this: ObjectReference }, Task>(
      "PowerOnMultiVM_Task", { _this: { attributes: { type: "Datacenter" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryConnectionInfo(args: {
  hostname: string;
    port: number;
    username: string;
    password: string;
    sslThumbprint?: string
}): Promise<HostConnectInfo> {
    const result = await this.connection.exec<{
  hostname: string;
    port: number;
    username: string;
    password: string;
    sslThumbprint?: string
} & { _this: ObjectReference }, HostConnectInfo>(
      "QueryConnectionInfo", { _this: { attributes: { type: "Datacenter" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { serverIp: undefined,
        inDasCluster: undefined,
        host: undefined,
        vm: undefined,
        vimAccountNameRequired: undefined,
        clusterSupported: undefined,
        network: undefined,
        datastore: undefined,
        license: undefined,
        capability: undefined });
  }
  async queryConnectionInfoViaSpec(args: {
  spec: HostConnectSpec
}): Promise<HostConnectInfo> {
    const result = await this.connection.exec<{
  spec: HostConnectSpec
} & { _this: ObjectReference }, HostConnectInfo>(
      "QueryConnectionInfoViaSpec", { _this: { attributes: { type: "Datacenter" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { serverIp: undefined,
        inDasCluster: undefined,
        host: undefined,
        vm: undefined,
        vimAccountNameRequired: undefined,
        clusterSupported: undefined,
        network: undefined,
        datastore: undefined,
        license: undefined,
        capability: undefined });
  }
  async reconfigure(args: {
  spec: DatacenterConfigSpec;
    modify: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: DatacenterConfigSpec;
    modify: boolean
} & { _this: ObjectReference }, Task>(
      "ReconfigureDatacenter_Task", { _this: { attributes: { type: "Datacenter" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryConfigOptionDescriptor(): Promise<VirtualMachineConfigOptionDescriptor[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VirtualMachineConfigOptionDescriptor[] | undefined>(
      "queryDatacenterConfigOptionDescriptor", { _this: { attributes: { type: "Datacenter" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  };
}
export class Datastore extends ManagedEntity {
  info!: DatastoreInfo;
  summary!: DatastoreSummary;
  host?: DatastoreHostMount[];
  vm?: VirtualMachine[];
  browser!: HostDatastoreBrowser;
  capability!: DatastoreCapability;
  iormConfiguration?: StorageIORMInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<Datastore>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { info: undefined,
        summary: undefined,
        host: undefined,
        vm: VirtualMachine,
        browser: HostDatastoreBrowser,
        capability: undefined,
        iormConfiguration: undefined });
    }
  }
  async enterMaintenanceMode(): Promise<StoragePlacementResult> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, StoragePlacementResult>(
      "DatastoreEnterMaintenanceMode", { _this: { attributes: { type: "Datastore" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { recommendations: undefined,
        drsFault: undefined,
        task: Task });
  }
  async exitMaintenanceMode(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "DatastoreExitMaintenanceMode_Task", { _this: { attributes: { type: "Datastore" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async destroyDatastore(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "DestroyDatastore", { _this: { attributes: { type: "Datastore" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshDatastore", { _this: { attributes: { type: "Datastore" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async refreshStorageInfo(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshDatastoreStorageInfo", { _this: { attributes: { type: "Datastore" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async renameDatastore(args: {
  newName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  newName: string
} & { _this: ObjectReference }, void>(
      "RenameDatastore", { _this: { attributes: { type: "Datastore" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVVolVirtualMachineFiles(args: {
  failoverPair?: DatastoreVVolContainerFailoverPair[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  failoverPair?: DatastoreVVolContainerFailoverPair[]
} & { _this: ObjectReference }, Task>(
      "UpdateVVolVirtualMachineFiles_Task", { _this: { attributes: { type: "Datastore" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateVirtualMachineFiles(args: {
  mountPathDatastoreMapping: DatastoreMountPathDatastorePair[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  mountPathDatastoreMapping: DatastoreMountPathDatastorePair[]
} & { _this: ObjectReference }, Task>(
      "UpdateVirtualMachineFiles_Task", { _this: { attributes: { type: "Datastore" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class DistributedVirtualSwitch extends ManagedEntity {
  uuid!: string;
  capability!: DVSCapability;
  summary!: DVSSummary;
  config!: DVSConfigInfo;
  networkResourcePool?: DVSNetworkResourcePool[];
  portgroup?: DistributedVirtualPortgroup[];
  runtime?: DVSRuntimeInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<DistributedVirtualSwitch>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { uuid: undefined,
        capability: undefined,
        summary: undefined,
        config: undefined,
        networkResourcePool: undefined,
        portgroup: DistributedVirtualPortgroup,
        runtime: undefined });
    }
  }
  async addPortgroups(args: {
  spec: DVPortgroupConfigSpec[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: DVPortgroupConfigSpec[]
} & { _this: ObjectReference }, Task>(
      "AddDVPortgroup_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async addNetworkResourcePool(args: {
  configSpec: DVSNetworkResourcePoolConfigSpec[]
}): Promise<void> {
    const result = await this.connection.exec<{
  configSpec: DVSNetworkResourcePoolConfigSpec[]
} & { _this: ObjectReference }, void>(
      "AddNetworkResourcePool", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addPortgroup(args: {
  spec: DVPortgroupConfigSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: DVPortgroupConfigSpec
} & { _this: ObjectReference }, Task>(
      "CreateDVPortgroup_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async rollback(args: {
  entityBackup?: EntityBackupConfig
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  entityBackup?: EntityBackupConfig
} & { _this: ObjectReference }, Task | undefined>(
      "DVSRollback_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async reconfigureVmVnicNetworkResourcePool(args: {
  configSpec: DvsVmVnicResourcePoolConfigSpec[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  configSpec: DvsVmVnicResourcePoolConfigSpec[]
} & { _this: ObjectReference }, Task>(
      "DvsReconfigureVmVnicNetworkResourcePool_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async enableNetworkResourceManagement(args: {
  enable: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  enable: boolean
} & { _this: ObjectReference }, void>(
      "EnableNetworkResourceManagement", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async fetchPortKeys(args: {
  criteria?: DistributedVirtualSwitchPortCriteria
}): Promise<string[] | undefined> {
    const result = await this.connection.exec<{
  criteria?: DistributedVirtualSwitchPortCriteria
} & { _this: ObjectReference }, string[] | undefined>(
      "FetchDVPortKeys", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async fetchPorts(args: {
  criteria?: DistributedVirtualSwitchPortCriteria
}): Promise<DistributedVirtualPort[] | undefined> {
    const result = await this.connection.exec<{
  criteria?: DistributedVirtualSwitchPortCriteria
} & { _this: ObjectReference }, DistributedVirtualPort[] | undefined>(
      "FetchDVPorts", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async lookupPortgroup(args: {
  portgroupKey: string
}): Promise<DistributedVirtualPortgroup | undefined> {
    const result = await this.connection.exec<{
  portgroupKey: string
} & { _this: ObjectReference }, DistributedVirtualPortgroup | undefined>(
      "LookupDvPortGroup", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new DistributedVirtualPortgroup(this.connection, result);
  }
  async merge(args: {
  dvs: DistributedVirtualSwitch
}): Promise<Task> {
    const result = await this.connection.exec<{
  dvs: DistributedVirtualSwitch
} & { _this: ObjectReference }, Task>(
      "MergeDvs_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async movePort(args: {
  portKey: string[];
    destinationPortgroupKey?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  portKey: string[];
    destinationPortgroupKey?: string
} & { _this: ObjectReference }, Task>(
      "MoveDVPort_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async performProductSpecOperation(args: {
  operation: string;
    productSpec?: DistributedVirtualSwitchProductSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  operation: string;
    productSpec?: DistributedVirtualSwitchProductSpec
} & { _this: ObjectReference }, Task>(
      "PerformDvsProductSpecOperation_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryUsedVlanId(): Promise<number[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, number[] | undefined>(
      "QueryUsedVlanIdInDvs", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async reconfigurePort(args: {
  port: DVPortConfigSpec[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  port: DVPortConfigSpec[]
} & { _this: ObjectReference }, Task>(
      "ReconfigureDVPort_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async reconfigure(args: {
  spec: DVSConfigSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: DVSConfigSpec
} & { _this: ObjectReference }, Task>(
      "ReconfigureDvs_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async rectifyHost(args: {
  hosts?: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  hosts?: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "RectifyDvsHost_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async refreshPortState(args: {
  portKeys?: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  portKeys?: string[]
} & { _this: ObjectReference }, void>(
      "RefreshDVPortState", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeNetworkResourcePool(args: {
  key: string[]
}): Promise<void> {
    const result = await this.connection.exec<{
  key: string[]
} & { _this: ObjectReference }, void>(
      "RemoveNetworkResourcePool", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateHealthCheckConfig(args: {
  healthCheckConfig: DVSHealthCheckConfig[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  healthCheckConfig: DVSHealthCheckConfig[]
} & { _this: ObjectReference }, Task>(
      "UpdateDVSHealthCheckConfig_Task", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateCapability(args: {
  capability: DVSCapability
}): Promise<void> {
    const result = await this.connection.exec<{
  capability: DVSCapability
} & { _this: ObjectReference }, void>(
      "UpdateDvsCapability", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateNetworkResourcePool(args: {
  configSpec: DVSNetworkResourcePoolConfigSpec[]
}): Promise<void> {
    const result = await this.connection.exec<{
  configSpec: DVSNetworkResourcePoolConfigSpec[]
} & { _this: ObjectReference }, void>(
      "UpdateNetworkResourcePool", { _this: { attributes: { type: "DistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class Folder extends ManagedEntity {
  childType?: string[];
  childEntity?: ManagedEntity[];
  namespace?: string;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<Folder>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { childType: undefined,
        childEntity: ManagedEntity,
        namespace: undefined });
    }
  }
  async addStandaloneHost(args: {
  spec: HostConnectSpec;
    compResSpec?: ComputeResourceConfigSpec;
    addConnected: boolean;
    license?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: HostConnectSpec;
    compResSpec?: ComputeResourceConfigSpec;
    addConnected: boolean;
    license?: string
} & { _this: ObjectReference }, Task>(
      "AddStandaloneHost_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async batchAddHostsToCluster(args: {
  cluster: ClusterComputeResource;
    newHosts?: FolderNewHostSpec[];
    existingHosts?: HostSystem[];
    compResSpec?: ComputeResourceConfigSpec;
    desiredState?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  cluster: ClusterComputeResource;
    newHosts?: FolderNewHostSpec[];
    existingHosts?: HostSystem[];
    compResSpec?: ComputeResourceConfigSpec;
    desiredState?: string
} & { _this: ObjectReference }, Task>(
      "BatchAddHostsToCluster_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async batchAddStandaloneHosts(args: {
  newHosts?: FolderNewHostSpec[];
    compResSpec?: ComputeResourceConfigSpec;
    addConnected: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  newHosts?: FolderNewHostSpec[];
    compResSpec?: ComputeResourceConfigSpec;
    addConnected: boolean
} & { _this: ObjectReference }, Task>(
      "BatchAddStandaloneHosts_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createCluster(args: {
  name: string;
    spec: ClusterConfigSpec
}): Promise<ClusterComputeResource> {
    const result = await this.connection.exec<{
  name: string;
    spec: ClusterConfigSpec
} & { _this: ObjectReference }, ClusterComputeResource>(
      "CreateCluster", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ClusterComputeResource(this.connection, result);
  }
  async createClusterEx(args: {
  name: string;
    spec: ClusterConfigSpecEx
}): Promise<ClusterComputeResource> {
    const result = await this.connection.exec<{
  name: string;
    spec: ClusterConfigSpecEx
} & { _this: ObjectReference }, ClusterComputeResource>(
      "CreateClusterEx", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new ClusterComputeResource(this.connection, result);
  }
  async createDistributedVirtualSwitch(args: {
  spec: DVSCreateSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: DVSCreateSpec
} & { _this: ObjectReference }, Task>(
      "CreateDVS_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async createDatacenter(args: {
  name: string
}): Promise<Datacenter> {
    const result = await this.connection.exec<{
  name: string
} & { _this: ObjectReference }, Datacenter>(
      "CreateDatacenter", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Datacenter(this.connection, result);
  }
  async createFolder(args: {
  name: string
}): Promise<Folder> {
    const result = await this.connection.exec<{
  name: string
} & { _this: ObjectReference }, Folder>(
      "CreateFolder", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Folder(this.connection, result);
  }
  async createStoragePod(args: {
  name: string
}): Promise<StoragePod> {
    const result = await this.connection.exec<{
  name: string
} & { _this: ObjectReference }, StoragePod>(
      "CreateStoragePod", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new StoragePod(this.connection, result);
  }
  async createVm(args: {
  config: VirtualMachineConfigSpec;
    pool: ResourcePool;
    host?: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  config: VirtualMachineConfigSpec;
    pool: ResourcePool;
    host?: HostSystem
} & { _this: ObjectReference }, Task>(
      "CreateVM_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async moveInto(args: {
  list: ManagedEntity[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  list: ManagedEntity[]
} & { _this: ObjectReference }, Task>(
      "MoveIntoFolder_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async registerVm(args: {
  path: string;
    name?: string;
    asTemplate: boolean;
    pool?: ResourcePool;
    host?: HostSystem
}): Promise<Task> {
    const result = await this.connection.exec<{
  path: string;
    name?: string;
    asTemplate: boolean;
    pool?: ResourcePool;
    host?: HostSystem
} & { _this: ObjectReference }, Task>(
      "RegisterVM_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async unregisterAndDestroy(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "UnregisterAndDestroy_Task", { _this: { attributes: { type: "Folder" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HostSystem extends ManagedEntity {
  runtime!: HostRuntimeInfo;
  summary!: HostListSummary;
  hardware?: HostHardwareInfo;
  capability?: HostCapability;
  licensableResource!: HostLicensableResourceInfo;
  remediationState?: HostSystemRemediationState;
  precheckRemediationResult?: ApplyHostProfileConfigurationSpec;
  remediationResult?: ApplyHostProfileConfigurationResult;
  complianceCheckState?: HostSystemComplianceCheckState;
  complianceCheckResult?: ComplianceResult;
  configManager!: HostConfigManager;
  config?: HostConfigInfo;
  vm?: VirtualMachine[];
  datastore?: Datastore[];
  network?: Network[];
  datastoreBrowser!: HostDatastoreBrowser;
  systemResources?: HostSystemResourceInfo;
  answerFileValidationState?: AnswerFileStatusResult;
  answerFileValidationResult?: AnswerFileStatusResult;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostSystem>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { runtime: undefined,
        summary: undefined,
        hardware: undefined,
        capability: undefined,
        licensableResource: undefined,
        remediationState: undefined,
        precheckRemediationResult: undefined,
        remediationResult: undefined,
        complianceCheckState: undefined,
        complianceCheckResult: undefined,
        configManager: undefined,
        config: undefined,
        vm: VirtualMachine,
        datastore: Datastore,
        network: Network,
        datastoreBrowser: HostDatastoreBrowser,
        systemResources: undefined,
        answerFileValidationState: undefined,
        answerFileValidationResult: undefined });
    }
  }
  async acquireCimServicesTicket(): Promise<HostServiceTicket> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostServiceTicket>(
      "AcquireCimServicesTicket", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { host: undefined,
        port: undefined,
        sslThumbprint: undefined,
        service: undefined,
        serviceVersion: undefined,
        sessionId: undefined });
  }
  async configureCryptoKey(args: {
  keyId?: CryptoKeyId
}): Promise<void> {
    const result = await this.connection.exec<{
  keyId?: CryptoKeyId
} & { _this: ObjectReference }, void>(
      "ConfigureCryptoKey", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async disconnect(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "DisconnectHost_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async enableCrypto(args: {
  keyPlain: CryptoKeyPlain
}): Promise<void> {
    const result = await this.connection.exec<{
  keyPlain: CryptoKeyPlain
} & { _this: ObjectReference }, void>(
      "EnableCrypto", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async enterLockdownMode(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "EnterLockdownMode", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async enterMaintenanceMode(args: {
  timeout: number;
    evacuatePoweredOffVms?: boolean;
    maintenanceSpec?: HostMaintenanceSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  timeout: number;
    evacuatePoweredOffVms?: boolean;
    maintenanceSpec?: HostMaintenanceSpec
} & { _this: ObjectReference }, Task>(
      "EnterMaintenanceMode_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async exitLockdownMode(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ExitLockdownMode", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async exitMaintenanceMode(args: {
  timeout: number
}): Promise<Task> {
    const result = await this.connection.exec<{
  timeout: number
} & { _this: ObjectReference }, Task>(
      "ExitMaintenanceMode_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async enterStandbyMode(args: {
  timeoutSec: number;
    evacuatePoweredOffVms?: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  timeoutSec: number;
    evacuatePoweredOffVms?: boolean
} & { _this: ObjectReference }, Task>(
      "PowerDownHostToStandBy_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async exitStandbyMode(args: {
  timeoutSec: number
}): Promise<Task> {
    const result = await this.connection.exec<{
  timeoutSec: number
} & { _this: ObjectReference }, Task>(
      "PowerUpHostFromStandBy_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async prepareCrypto(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "PrepareCrypto", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryConnectionInfo(): Promise<HostConnectInfo> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostConnectInfo>(
      "QueryHostConnectionInfo", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { serverIp: undefined,
        inDasCluster: undefined,
        host: undefined,
        vm: undefined,
        vimAccountNameRequired: undefined,
        clusterSupported: undefined,
        network: undefined,
        datastore: undefined,
        license: undefined,
        capability: undefined });
  }
  async queryOverhead(args: {
  memorySize: number;
    videoRamSize?: number;
    numVcpus: number
}): Promise<number> {
    const result = await this.connection.exec<{
  memorySize: number;
    videoRamSize?: number;
    numVcpus: number
} & { _this: ObjectReference }, number>(
      "QueryMemoryOverhead", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryOverheadEx(args: {
  vmConfigInfo: VirtualMachineConfigInfo
}): Promise<number> {
    const result = await this.connection.exec<{
  vmConfigInfo: VirtualMachineConfigInfo
} & { _this: ObjectReference }, number>(
      "QueryMemoryOverheadEx", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryProductLockerLocation(): Promise<string> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, string>(
      "QueryProductLockerLocation", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryTpmAttestationReport(): Promise<HostTpmAttestationReport | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostTpmAttestationReport | undefined>(
      "QueryTpmAttestationReport", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { tpmPcrValues: undefined,
        tpmEvents: undefined,
        tpmLogReliable: undefined });
  }
  async reboot(args: {
  force: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  force: boolean
} & { _this: ObjectReference }, Task>(
      "RebootHost_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async reconfigureDAS(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "ReconfigureHostForDAS_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async reconnect(args: {
  cnxSpec?: HostConnectSpec;
    reconnectSpec?: HostSystemReconnectSpec
}): Promise<Task> {
    const result = await this.connection.exec<{
  cnxSpec?: HostConnectSpec;
    reconnectSpec?: HostSystemReconnectSpec
} & { _this: ObjectReference }, Task>(
      "ReconnectHost_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async retrieveFreeEpcMemory(): Promise<number> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, number>(
      "RetrieveFreeEpcMemory", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async retrieveHardwareUptime(): Promise<number> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, number>(
      "RetrieveHardwareUptime", { _this: { attributes: { type: "HostSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async shutdown(args: {
  force: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  force: boolean
} & { _this: ObjectReference }, Task>(
      "ShutdownHost_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateFlags(args: {
  flagInfo: HostFlagInfo
}): Promise<void> {
    const result = await this.connection.exec<{
  flagInfo: HostFlagInfo
} & { _this: ObjectReference }, void>(
      "UpdateFlags", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateIpmi(args: {
  ipmiInfo: HostIpmiInfo
}): Promise<void> {
    const result = await this.connection.exec<{
  ipmiInfo: HostIpmiInfo
} & { _this: ObjectReference }, void>(
      "UpdateIpmi", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateProductLockerLocation(args: {
  path: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  path: string
} & { _this: ObjectReference }, Task>(
      "UpdateProductLockerLocation_Task", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateSystemResources(args: {
  resourceInfo: HostSystemResourceInfo
}): Promise<void> {
    const result = await this.connection.exec<{
  resourceInfo: HostSystemResourceInfo
} & { _this: ObjectReference }, void>(
      "UpdateSystemResources", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateSystemSwapConfiguration(args: {
  sysSwapConfig: HostSystemSwapConfiguration
}): Promise<void> {
    const result = await this.connection.exec<{
  sysSwapConfig: HostSystemSwapConfiguration
} & { _this: ObjectReference }, void>(
      "UpdateSystemSwapConfiguration", { _this: { attributes: { type: "HostSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ServiceInstance extends ManagedObject {
  serverClock!: Date;
  capability!: Capability;
  content!: ServiceContent;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ServiceInstance>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async currentTime(): Promise<Date> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Date>(
      "CurrentTime", { _this: "ServiceInstance",  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, {  });
  }
  async queryVMotionCompatibility(args: {
  vm: VirtualMachine;
    host: HostSystem[];
    compatibility?: string[]
}): Promise<HostVMotionCompatibility[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    host: HostSystem[];
    compatibility?: string[]
} & { _this: ObjectReference }, HostVMotionCompatibility[] | undefined>(
      "QueryVMotionCompatibility", { _this: "ServiceInstance", ...args }
    ).then(r => r.result);
    return result;
  }
  async retrieveProductComponents(): Promise<ProductComponentInfo[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ProductComponentInfo[] | undefined>(
      "RetrieveProductComponents", { _this: "ServiceInstance",  }
    ).then(r => r.result);
    return result;
  }
  async retrieveContent(): Promise<ServiceContent> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ServiceContent>(
      "RetrieveServiceContent", { _this: "ServiceInstance",  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { rootFolder: Folder,
        propertyCollector: PropertyCollector,
        viewManager: ViewManager,
        about: undefined,
        setting: OptionManager,
        userDirectory: UserDirectory,
        sessionManager: SessionManager,
        authorizationManager: AuthorizationManager,
        serviceManager: ServiceManager,
        perfManager: PerformanceManager,
        scheduledTaskManager: ScheduledTaskManager,
        alarmManager: AlarmManager,
        eventManager: EventManager,
        taskManager: TaskManager,
        extensionManager: ExtensionManager,
        customizationSpecManager: CustomizationSpecManager,
        guestCustomizationManager: VirtualMachineGuestCustomizationManager,
        customFieldsManager: CustomFieldsManager,
        accountManager: HostLocalAccountManager,
        diagnosticManager: DiagnosticManager,
        licenseManager: LicenseManager,
        searchIndex: SearchIndex,
        fileManager: FileManager,
        datastoreNamespaceManager: DatastoreNamespaceManager,
        virtualDiskManager: VirtualDiskManager,
        virtualizationManager: VirtualizationManager,
        snmpSystem: HostSnmpSystem,
        vmProvisioningChecker: VirtualMachineProvisioningChecker,
        vmCompatibilityChecker: VirtualMachineCompatibilityChecker,
        ovfManager: OvfManager,
        ipPoolManager: IpPoolManager,
        dvSwitchManager: DistributedVirtualSwitchManager,
        hostProfileManager: HostProfileManager,
        clusterProfileManager: ClusterProfileManager,
        complianceManager: ProfileComplianceManager,
        localizationManager: LocalizationManager,
        storageResourceManager: StorageResourceManager,
        guestOperationsManager: GuestOperationsManager,
        overheadMemoryManager: OverheadMemoryManager,
        certificateManager: CertificateManager,
        ioFilterManager: IoFilterManager,
        vStorageObjectManager: VStorageObjectManagerBase,
        hostSpecManager: HostSpecificationManager,
        cryptoManager: CryptoManager,
        healthUpdateManager: HealthUpdateManager,
        failoverClusterConfigurator: FailoverClusterConfigurator,
        failoverClusterManager: FailoverClusterManager,
        tenantManager: TenantTenantManager,
        siteInfoManager: SiteInfoManager,
        storageQueryManager: StorageQueryManager });
  }
  async validateMigration(args: {
  vm: VirtualMachine[];
    state?: VirtualMachinePowerState;
    testType?: string[];
    pool?: ResourcePool;
    host?: HostSystem
}): Promise<Event[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine[];
    state?: VirtualMachinePowerState;
    testType?: string[];
    pool?: ResourcePool;
    host?: HostSystem
} & { _this: ObjectReference }, Event[] | undefined>(
      "ValidateMigration", { _this: "ServiceInstance", ...args }
    ).then(r => r.result);
    return result;
  };
}
export class StoragePod extends Folder {
  summary?: StoragePodSummary;
  podStorageDrsEntry?: PodStorageDrsEntry;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<StoragePod>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  
}
export class DistributedVirtualSwitchManager extends ManagedObject {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<DistributedVirtualSwitchManager>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async exportEntity(args: {
  selectionSet: SelectionSet[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  selectionSet: SelectionSet[]
} & { _this: ObjectReference }, Task | undefined>(
      "DVSManagerExportEntity_Task", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async importEntity(args: {
  entityBackup: EntityBackupConfig[];
    importType: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  entityBackup: EntityBackupConfig[];
    importType: string
} & { _this: ObjectReference }, Task>(
      "DVSManagerImportEntity_Task", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async lookupPortgroup(args: {
  switchUuid: string;
    portgroupKey: string
}): Promise<DistributedVirtualPortgroup | undefined> {
    const result = await this.connection.exec<{
  switchUuid: string;
    portgroupKey: string
} & { _this: ObjectReference }, DistributedVirtualPortgroup | undefined>(
      "DVSManagerLookupDvPortGroup", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new DistributedVirtualPortgroup(this.connection, result);
  }
  async querySupportedSwitchSpec(args: {
  recommended?: boolean
}): Promise<DistributedVirtualSwitchProductSpec[] | undefined> {
    const result = await this.connection.exec<{
  recommended?: boolean
} & { _this: ObjectReference }, DistributedVirtualSwitchProductSpec[] | undefined>(
      "QueryAvailableDvsSpec", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCompatibleHostForExistingDvs(args: {
  container: ManagedEntity;
    recursive: boolean;
    dvs: DistributedVirtualSwitch
}): Promise<HostSystem[] | undefined> {
    const result = await this.connection.exec<{
  container: ManagedEntity;
    recursive: boolean;
    dvs: DistributedVirtualSwitch
} & { _this: ObjectReference }, HostSystem[] | undefined>(
      "QueryCompatibleHostForExistingDvs", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCompatibleHostForNewDvs(args: {
  container: ManagedEntity;
    recursive: boolean;
    switchProductSpec?: DistributedVirtualSwitchProductSpec
}): Promise<HostSystem[] | undefined> {
    const result = await this.connection.exec<{
  container: ManagedEntity;
    recursive: boolean;
    switchProductSpec?: DistributedVirtualSwitchProductSpec
} & { _this: ObjectReference }, HostSystem[] | undefined>(
      "QueryCompatibleHostForNewDvs", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async querySwitchByUuid(args: {
  uuid: string
}): Promise<DistributedVirtualSwitch | undefined> {
    const result = await this.connection.exec<{
  uuid: string
} & { _this: ObjectReference }, DistributedVirtualSwitch | undefined>(
      "QueryDvsByUuid", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new DistributedVirtualSwitch(this.connection, result);
  }
  async checkCompatibility(args: {
  hostContainer: DistributedVirtualSwitchManagerHostContainer;
    dvsProductSpec?: DistributedVirtualSwitchManagerDvsProductSpec;
    hostFilterSpec?: DistributedVirtualSwitchManagerHostDvsFilterSpec[]
}): Promise<DistributedVirtualSwitchManagerCompatibilityResult[] | undefined> {
    const result = await this.connection.exec<{
  hostContainer: DistributedVirtualSwitchManagerHostContainer;
    dvsProductSpec?: DistributedVirtualSwitchManagerDvsProductSpec;
    hostFilterSpec?: DistributedVirtualSwitchManagerHostDvsFilterSpec[]
} & { _this: ObjectReference }, DistributedVirtualSwitchManagerCompatibilityResult[] | undefined>(
      "QueryDvsCheckCompatibility", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryCompatibleHostSpec(args: {
  switchProductSpec?: DistributedVirtualSwitchProductSpec
}): Promise<DistributedVirtualSwitchHostProductSpec[] | undefined> {
    const result = await this.connection.exec<{
  switchProductSpec?: DistributedVirtualSwitchProductSpec
} & { _this: ObjectReference }, DistributedVirtualSwitchHostProductSpec[] | undefined>(
      "QueryDvsCompatibleHostSpec", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryDvsConfigTarget(args: {
  host?: HostSystem;
    dvs?: DistributedVirtualSwitch
}): Promise<DVSManagerDvsConfigTarget> {
    const result = await this.connection.exec<{
  host?: HostSystem;
    dvs?: DistributedVirtualSwitch
} & { _this: ObjectReference }, DVSManagerDvsConfigTarget>(
      "QueryDvsConfigTarget", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { distributedVirtualPortgroup: undefined,
        distributedVirtualSwitch: undefined });
  }
  async queryFeatureCapability(args: {
  switchProductSpec?: DistributedVirtualSwitchProductSpec
}): Promise<DVSFeatureCapability | undefined> {
    const result = await this.connection.exec<{
  switchProductSpec?: DistributedVirtualSwitchProductSpec
} & { _this: ObjectReference }, DVSFeatureCapability | undefined>(
      "QueryDvsFeatureCapability", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { networkResourceManagementSupported: undefined,
        vmDirectPathGen2Supported: undefined,
        nicTeamingPolicy: undefined,
        networkResourcePoolHighShareValue: undefined,
        networkResourceManagementCapability: undefined,
        healthCheckCapability: undefined,
        rollbackCapability: undefined,
        backupRestoreCapability: undefined,
        networkFilterSupported: undefined,
        macLearningSupported: undefined });
  }
  async rectifyHost(args: {
  hosts: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  hosts: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "RectifyDvsOnHost_Task", { _this: { attributes: { type: "DistributedVirtualSwitchManager" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class VmwareDistributedVirtualSwitch extends DistributedVirtualSwitch {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<VmwareDistributedVirtualSwitch>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async updateLacpGroupConfig(args: {
  lacpGroupSpec: VMwareDvsLacpGroupSpec[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  lacpGroupSpec: VMwareDvsLacpGroupSpec[]
} & { _this: ObjectReference }, Task>(
      "UpdateDVSLacpGroupConfig_Task", { _this: { attributes: { type: "VmwareDistributedVirtualSwitch" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  };
}
export class HostDiagnosticSystem extends ManagedObject {
  activePartition?: HostDiagnosticPartition;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostDiagnosticSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async createDiagnosticPartition(args: {
  spec: HostDiagnosticPartitionCreateSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  spec: HostDiagnosticPartitionCreateSpec
} & { _this: ObjectReference }, void>(
      "CreateDiagnosticPartition", { _this: { attributes: { type: "HostDiagnosticSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryAvailablePartition(): Promise<HostDiagnosticPartition[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostDiagnosticPartition[] | undefined>(
      "QueryAvailablePartition", { _this: { attributes: { type: "HostDiagnosticSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryPartitionCreateDesc(args: {
  diskUuid: string;
    diagnosticType: string
}): Promise<HostDiagnosticPartitionCreateDescription> {
    const result = await this.connection.exec<{
  diskUuid: string;
    diagnosticType: string
} & { _this: ObjectReference }, HostDiagnosticPartitionCreateDescription>(
      "QueryPartitionCreateDesc", { _this: { attributes: { type: "HostDiagnosticSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { layout: undefined,
        diskUuid: undefined,
        spec: undefined });
  }
  async queryPartitionCreateOptions(args: {
  storageType: string;
    diagnosticType: string
}): Promise<HostDiagnosticPartitionCreateOption[] | undefined> {
    const result = await this.connection.exec<{
  storageType: string;
    diagnosticType: string
} & { _this: ObjectReference }, HostDiagnosticPartitionCreateOption[] | undefined>(
      "QueryPartitionCreateOptions", { _this: { attributes: { type: "HostDiagnosticSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async selectActivePartition(args: {
  partition?: HostScsiDiskPartition
}): Promise<void> {
    const result = await this.connection.exec<{
  partition?: HostScsiDiskPartition
} & { _this: ObjectReference }, void>(
      "SelectActivePartition", { _this: { attributes: { type: "HostDiagnosticSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class HostStorageSystem extends ExtensibleManagedObject {
  storageDeviceInfo?: HostStorageDeviceInfo;
  fileSystemVolumeInfo!: HostFileSystemVolumeInfo;
  systemFile?: string[];
  multipathStateInfo?: HostMultipathStateInfo;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<HostStorageSystem>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async addInternetScsiSendTargets(args: {
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaSendTarget[]
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaSendTarget[]
} & { _this: ObjectReference }, void>(
      "AddInternetScsiSendTargets", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async addInternetScsiStaticTargets(args: {
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaStaticTarget[]
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaStaticTarget[]
} & { _this: ObjectReference }, void>(
      "AddInternetScsiStaticTargets", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async attachScsiLun(args: {
  lunUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  lunUuid: string
} & { _this: ObjectReference }, void>(
      "AttachScsiLun", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async attachScsiLunEx(args: {
  lunUuid: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  lunUuid: string[]
} & { _this: ObjectReference }, Task>(
      "AttachScsiLunEx_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async attachVmfsExtent(args: {
  vmfsPath: string;
    extent: HostScsiDiskPartition
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsPath: string;
    extent: HostScsiDiskPartition
} & { _this: ObjectReference }, void>(
      "AttachVmfsExtent", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async changeNFSUserPassword(args: {
  password: string
}): Promise<void> {
    const result = await this.connection.exec<{
  password: string
} & { _this: ObjectReference }, void>(
      "ChangeNFSUserPassword", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async clearNFSUser(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "ClearNFSUser", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async computeDiskPartitionInfo(args: {
  devicePath: string;
    layout: HostDiskPartitionLayout;
    partitionFormat?: string
}): Promise<HostDiskPartitionInfo> {
    const result = await this.connection.exec<{
  devicePath: string;
    layout: HostDiskPartitionLayout;
    partitionFormat?: string
} & { _this: ObjectReference }, HostDiskPartitionInfo>(
      "ComputeDiskPartitionInfo", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { deviceName: undefined,
        spec: undefined,
        layout: undefined });
  }
  async computeDiskPartitionInfoForResize(args: {
  partition: HostScsiDiskPartition;
    blockRange: HostDiskPartitionBlockRange;
    partitionFormat?: string
}): Promise<HostDiskPartitionInfo> {
    const result = await this.connection.exec<{
  partition: HostScsiDiskPartition;
    blockRange: HostDiskPartitionBlockRange;
    partitionFormat?: string
} & { _this: ObjectReference }, HostDiskPartitionInfo>(
      "ComputeDiskPartitionInfoForResize", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { deviceName: undefined,
        spec: undefined,
        layout: undefined });
  }
  async connectNvmeController(args: {
  connectSpec: HostNvmeConnectSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  connectSpec: HostNvmeConnectSpec
} & { _this: ObjectReference }, void>(
      "ConnectNvmeController", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async createNvmeOverRdmaAdapter(args: {
  rdmaDeviceName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  rdmaDeviceName: string
} & { _this: ObjectReference }, void>(
      "CreateNvmeOverRdmaAdapter", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteScsiLunState(args: {
  lunCanonicalName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  lunCanonicalName: string
} & { _this: ObjectReference }, void>(
      "DeleteScsiLunState", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteVffsVolumeState(args: {
  vffsUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vffsUuid: string
} & { _this: ObjectReference }, void>(
      "DeleteVffsVolumeState", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async deleteVmfsVolumeState(args: {
  vmfsUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsUuid: string
} & { _this: ObjectReference }, void>(
      "DeleteVmfsVolumeState", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async destroyVffs(args: {
  vffsPath: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vffsPath: string
} & { _this: ObjectReference }, void>(
      "DestroyVffs", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async detachScsiLun(args: {
  lunUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  lunUuid: string
} & { _this: ObjectReference }, void>(
      "DetachScsiLun", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async detachScsiLunEx(args: {
  lunUuid: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  lunUuid: string[]
} & { _this: ObjectReference }, Task>(
      "DetachScsiLunEx_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async disableMultipathPath(args: {
  pathName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  pathName: string
} & { _this: ObjectReference }, void>(
      "DisableMultipathPath", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async disconnectNvmeController(args: {
  disconnectSpec: HostNvmeDisconnectSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  disconnectSpec: HostNvmeDisconnectSpec
} & { _this: ObjectReference }, void>(
      "DisconnectNvmeController", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async discoverFcoeHbas(args: {
  fcoeSpec: FcoeConfigFcoeSpecification
}): Promise<void> {
    const result = await this.connection.exec<{
  fcoeSpec: FcoeConfigFcoeSpecification
} & { _this: ObjectReference }, void>(
      "DiscoverFcoeHbas", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async discoverNvmeControllers(args: {
  discoverSpec: HostNvmeDiscoverSpec
}): Promise<HostNvmeDiscoveryLog> {
    const result = await this.connection.exec<{
  discoverSpec: HostNvmeDiscoverSpec
} & { _this: ObjectReference }, HostNvmeDiscoveryLog>(
      "DiscoverNvmeControllers", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { entry: undefined,
        complete: undefined });
  }
  async enableMultipathPath(args: {
  pathName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  pathName: string
} & { _this: ObjectReference }, void>(
      "EnableMultipathPath", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async expandVmfsExtent(args: {
  vmfsPath: string;
    extent: HostScsiDiskPartition
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsPath: string;
    extent: HostScsiDiskPartition
} & { _this: ObjectReference }, void>(
      "ExpandVmfsExtent", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async extendVffs(args: {
  vffsPath: string;
    devicePath: string;
    spec?: HostDiskPartitionSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  vffsPath: string;
    devicePath: string;
    spec?: HostDiskPartitionSpec
} & { _this: ObjectReference }, void>(
      "ExtendVffs", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async formatVffs(args: {
  createSpec: HostVffsSpec
}): Promise<HostVffsVolume> {
    const result = await this.connection.exec<{
  createSpec: HostVffsSpec
} & { _this: ObjectReference }, HostVffsVolume>(
      "FormatVffs", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { majorVersion: undefined,
        version: undefined,
        uuid: undefined,
        extent: undefined });
  }
  async formatVmfs(args: {
  createSpec: HostVmfsSpec
}): Promise<HostVmfsVolume> {
    const result = await this.connection.exec<{
  createSpec: HostVmfsSpec
} & { _this: ObjectReference }, HostVmfsVolume>(
      "FormatVmfs", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { blockSizeMb: undefined,
        blockSize: undefined,
        unmapGranularity: undefined,
        unmapPriority: undefined,
        unmapBandwidthSpec: undefined,
        maxBlocks: undefined,
        majorVersion: undefined,
        version: undefined,
        uuid: undefined,
        extent: undefined,
        vmfsUpgradable: undefined,
        forceMountedInfo: undefined,
        ssd: undefined,
        local: undefined,
        scsiDiskType: undefined });
  }
  async markAsLocal(args: {
  scsiDiskUuid: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  scsiDiskUuid: string
} & { _this: ObjectReference }, Task>(
      "MarkAsLocal_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async markAsNonLocal(args: {
  scsiDiskUuid: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  scsiDiskUuid: string
} & { _this: ObjectReference }, Task>(
      "MarkAsNonLocal_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async markAsNonSsd(args: {
  scsiDiskUuid: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  scsiDiskUuid: string
} & { _this: ObjectReference }, Task>(
      "MarkAsNonSsd_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async markAsSsd(args: {
  scsiDiskUuid: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  scsiDiskUuid: string
} & { _this: ObjectReference }, Task>(
      "MarkAsSsd_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async markForRemoval(args: {
  hbaName: string;
    remove: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  hbaName: string;
    remove: boolean
} & { _this: ObjectReference }, void>(
      "MarkForRemoval", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async markPerenniallyReserved(args: {
  lunUuid: string;
    state: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  lunUuid: string;
    state: boolean
} & { _this: ObjectReference }, void>(
      "MarkPerenniallyReserved", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async markPerenniallyReservedEx(args: {
  lunUuid?: string[];
    state: boolean
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  lunUuid?: string[];
    state: boolean
} & { _this: ObjectReference }, Task | undefined>(
      "MarkPerenniallyReservedEx_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async mountVffsVolume(args: {
  vffsUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vffsUuid: string
} & { _this: ObjectReference }, void>(
      "MountVffsVolume", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async mountVmfsVolume(args: {
  vmfsUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsUuid: string
} & { _this: ObjectReference }, void>(
      "MountVmfsVolume", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async mountVmfsVolumeEx(args: {
  vmfsUuid: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vmfsUuid: string[]
} & { _this: ObjectReference }, Task>(
      "MountVmfsVolumeEx_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async queryAvailableSsds(args: {
  vffsPath?: string
}): Promise<HostScsiDisk[] | undefined> {
    const result = await this.connection.exec<{
  vffsPath?: string
} & { _this: ObjectReference }, HostScsiDisk[] | undefined>(
      "QueryAvailableSsds", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async queryNFSUser(): Promise<HostNasVolumeUserInfo | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostNasVolumeUserInfo | undefined>(
      "QueryNFSUser", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { user: undefined });
  }
  async queryPathSelectionPolicyOptions(): Promise<HostPathSelectionPolicyOption[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostPathSelectionPolicyOption[] | undefined>(
      "QueryPathSelectionPolicyOptions", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryStorageArrayTypePolicyOptions(): Promise<HostStorageArrayTypePolicyOption[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostStorageArrayTypePolicyOption[] | undefined>(
      "QueryStorageArrayTypePolicyOptions", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryUnresolvedVmfsVolume(): Promise<HostUnresolvedVmfsVolume[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, HostUnresolvedVmfsVolume[] | undefined>(
      "QueryUnresolvedVmfsVolume", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async queryVmfsConfigOption(): Promise<VmfsConfigOption[] | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, VmfsConfigOption[] | undefined>(
      "QueryVmfsConfigOption", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async refresh(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshStorageSystem", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async removeInternetScsiSendTargets(args: {
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaSendTarget[];
    force?: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaSendTarget[];
    force?: boolean
} & { _this: ObjectReference }, void>(
      "RemoveInternetScsiSendTargets", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeInternetScsiStaticTargets(args: {
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaStaticTarget[]
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    targets: HostInternetScsiHbaStaticTarget[]
} & { _this: ObjectReference }, void>(
      "RemoveInternetScsiStaticTargets", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async removeNvmeOverRdmaAdapter(args: {
  hbaDeviceName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  hbaDeviceName: string
} & { _this: ObjectReference }, void>(
      "RemoveNvmeOverRdmaAdapter", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async rescanAllHba(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RescanAllHba", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async rescanHba(args: {
  hbaDevice: string
}): Promise<void> {
    const result = await this.connection.exec<{
  hbaDevice: string
} & { _this: ObjectReference }, void>(
      "RescanHba", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async rescanVffs(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RescanVffs", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async rescanVmfs(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RescanVmfs", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async resolveMultipleUnresolvedVmfsVolumes(args: {
  resolutionSpec: HostUnresolvedVmfsResolutionSpec[]
}): Promise<HostUnresolvedVmfsResolutionResult[] | undefined> {
    const result = await this.connection.exec<{
  resolutionSpec: HostUnresolvedVmfsResolutionSpec[]
} & { _this: ObjectReference }, HostUnresolvedVmfsResolutionResult[] | undefined>(
      "ResolveMultipleUnresolvedVmfsVolumes", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async resolveMultipleUnresolvedVmfsVolumesEx(args: {
  resolutionSpec: HostUnresolvedVmfsResolutionSpec[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  resolutionSpec: HostUnresolvedVmfsResolutionSpec[]
} & { _this: ObjectReference }, Task | undefined>(
      "ResolveMultipleUnresolvedVmfsVolumesEx_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async retrieveDiskPartitionInfo(args: {
  devicePath: string[]
}): Promise<HostDiskPartitionInfo[] | undefined> {
    const result = await this.connection.exec<{
  devicePath: string[]
} & { _this: ObjectReference }, HostDiskPartitionInfo[] | undefined>(
      "RetrieveDiskPartitionInfo", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setMultipathLunPolicy(args: {
  lunId: string;
    policy: HostMultipathInfoLogicalUnitPolicy
}): Promise<void> {
    const result = await this.connection.exec<{
  lunId: string;
    policy: HostMultipathInfoLogicalUnitPolicy
} & { _this: ObjectReference }, void>(
      "SetMultipathLunPolicy", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async setNFSUser(args: {
  user: string;
    password: string
}): Promise<void> {
    const result = await this.connection.exec<{
  user: string;
    password: string
} & { _this: ObjectReference }, void>(
      "SetNFSUser", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async turnDiskLocatorLedOff(args: {
  scsiDiskUuids: string[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  scsiDiskUuids: string[]
} & { _this: ObjectReference }, Task | undefined>(
      "TurnDiskLocatorLedOff_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async turnDiskLocatorLedOn(args: {
  scsiDiskUuids: string[]
}): Promise<Task | undefined> {
    const result = await this.connection.exec<{
  scsiDiskUuids: string[]
} & { _this: ObjectReference }, Task | undefined>(
      "TurnDiskLocatorLedOn_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async unmapVmfsVolumeEx(args: {
  vmfsUuid: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vmfsUuid: string[]
} & { _this: ObjectReference }, Task>(
      "UnmapVmfsVolumeEx_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async unmountForceMountedVmfsVolume(args: {
  vmfsUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsUuid: string
} & { _this: ObjectReference }, void>(
      "UnmountForceMountedVmfsVolume", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unmountVffsVolume(args: {
  vffsUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vffsUuid: string
} & { _this: ObjectReference }, void>(
      "UnmountVffsVolume", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unmountVmfsVolume(args: {
  vmfsUuid: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsUuid: string
} & { _this: ObjectReference }, void>(
      "UnmountVmfsVolume", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async unmountVmfsVolumeEx(args: {
  vmfsUuid: string[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  vmfsUuid: string[]
} & { _this: ObjectReference }, Task>(
      "UnmountVmfsVolumeEx_Task", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async updateDiskPartitions(args: {
  devicePath: string;
    spec: HostDiskPartitionSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  devicePath: string;
    spec: HostDiskPartitionSpec
} & { _this: ObjectReference }, void>(
      "UpdateDiskPartitions", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateHppMultipathLunPolicy(args: {
  lunId: string;
    policy: HostMultipathInfoHppLogicalUnitPolicy
}): Promise<void> {
    const result = await this.connection.exec<{
  lunId: string;
    policy: HostMultipathInfoHppLogicalUnitPolicy
} & { _this: ObjectReference }, void>(
      "UpdateHppMultipathLunPolicy", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateInternetScsiAdvancedOptions(args: {
  iScsiHbaDevice: string;
    targetSet?: HostInternetScsiHbaTargetSet;
    options: HostInternetScsiHbaParamValue[]
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    targetSet?: HostInternetScsiHbaTargetSet;
    options: HostInternetScsiHbaParamValue[]
} & { _this: ObjectReference }, void>(
      "UpdateInternetScsiAdvancedOptions", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateInternetScsiAlias(args: {
  iScsiHbaDevice: string;
    iScsiAlias: string
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    iScsiAlias: string
} & { _this: ObjectReference }, void>(
      "UpdateInternetScsiAlias", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateInternetScsiAuthenticationProperties(args: {
  iScsiHbaDevice: string;
    authenticationProperties: HostInternetScsiHbaAuthenticationProperties;
    targetSet?: HostInternetScsiHbaTargetSet
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    authenticationProperties: HostInternetScsiHbaAuthenticationProperties;
    targetSet?: HostInternetScsiHbaTargetSet
} & { _this: ObjectReference }, void>(
      "UpdateInternetScsiAuthenticationProperties", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateInternetScsiDigestProperties(args: {
  iScsiHbaDevice: string;
    targetSet?: HostInternetScsiHbaTargetSet;
    digestProperties: HostInternetScsiHbaDigestProperties
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    targetSet?: HostInternetScsiHbaTargetSet;
    digestProperties: HostInternetScsiHbaDigestProperties
} & { _this: ObjectReference }, void>(
      "UpdateInternetScsiDigestProperties", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateInternetScsiDiscoveryProperties(args: {
  iScsiHbaDevice: string;
    discoveryProperties: HostInternetScsiHbaDiscoveryProperties
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    discoveryProperties: HostInternetScsiHbaDiscoveryProperties
} & { _this: ObjectReference }, void>(
      "UpdateInternetScsiDiscoveryProperties", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateInternetScsiIPProperties(args: {
  iScsiHbaDevice: string;
    ipProperties: HostInternetScsiHbaIPProperties
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    ipProperties: HostInternetScsiHbaIPProperties
} & { _this: ObjectReference }, void>(
      "UpdateInternetScsiIPProperties", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateInternetScsiName(args: {
  iScsiHbaDevice: string;
    iScsiName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  iScsiHbaDevice: string;
    iScsiName: string
} & { _this: ObjectReference }, void>(
      "UpdateInternetScsiName", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateScsiLunDisplayName(args: {
  lunUuid: string;
    displayName: string
}): Promise<void> {
    const result = await this.connection.exec<{
  lunUuid: string;
    displayName: string
} & { _this: ObjectReference }, void>(
      "UpdateScsiLunDisplayName", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateSoftwareInternetScsiEnabled(args: {
  enabled: boolean
}): Promise<void> {
    const result = await this.connection.exec<{
  enabled: boolean
} & { _this: ObjectReference }, void>(
      "UpdateSoftwareInternetScsiEnabled", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVmfsUnmapBandwidth(args: {
  vmfsUuid: string;
    unmapBandwidthSpec: VmfsUnmapBandwidthSpec
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsUuid: string;
    unmapBandwidthSpec: VmfsUnmapBandwidthSpec
} & { _this: ObjectReference }, void>(
      "UpdateVmfsUnmapBandwidth", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async updateVmfsUnmapPriority(args: {
  vmfsUuid: string;
    unmapPriority: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsUuid: string;
    unmapPriority: string
} & { _this: ObjectReference }, void>(
      "UpdateVmfsUnmapPriority", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async upgradeVmLayout(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "UpgradeVmLayout", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async upgradeVmfs(args: {
  vmfsPath: string
}): Promise<void> {
    const result = await this.connection.exec<{
  vmfsPath: string
} & { _this: ObjectReference }, void>(
      "UpgradeVmfs", { _this: { attributes: { type: "HostStorageSystem" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ContainerView extends ManagedObjectView {
  container!: ManagedEntity;
  type?: string[];
  recursive!: boolean;
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ContainerView>
  ) {
    super(connection, init);
    if (init) {
      constructHelperObjects(connection, init, this, { container: ManagedEntity,
        type: undefined,
        recursive: undefined });
    }
  }
  
}
export class InventoryView extends ManagedObjectView {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<InventoryView>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async closeFolder(args: {
  entity: ManagedEntity[]
}): Promise<ManagedEntity[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity[]
} & { _this: ObjectReference }, ManagedEntity[] | undefined>(
      "CloseInventoryViewFolder", { _this: { attributes: { type: "InventoryView" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async openFolder(args: {
  entity: ManagedEntity[]
}): Promise<ManagedEntity[] | undefined> {
    const result = await this.connection.exec<{
  entity: ManagedEntity[]
} & { _this: ObjectReference }, ManagedEntity[] | undefined>(
      "OpenInventoryViewFolder", { _this: { attributes: { type: "InventoryView" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ListView extends ManagedObjectView {
  
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ListView>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async modify(args: {
  add?: ManagedObject[];
    remove?: ManagedObject[]
}): Promise<ManagedObject[] | undefined> {
    const result = await this.connection.exec<{
  add?: ManagedObject[];
    remove?: ManagedObject[]
} & { _this: ObjectReference }, ManagedObject[] | undefined>(
      "ModifyListView", { _this: { attributes: { type: "ListView" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async reset(args: {
  obj?: ManagedObject[]
}): Promise<ManagedObject[] | undefined> {
    const result = await this.connection.exec<{
  obj?: ManagedObject[]
} & { _this: ObjectReference }, ManagedObject[] | undefined>(
      "ResetListView", { _this: { attributes: { type: "ListView" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async resetFromView(args: {
  view: View
}): Promise<void> {
    const result = await this.connection.exec<{
  view: View
} & { _this: ObjectReference }, void>(
      "ResetListViewFromView", { _this: { attributes: { type: "ListView" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}
export class ClusterComputeResource extends ComputeResource {
  configuration!: ClusterConfigInfo;
  recommendation?: ClusterRecommendation[];
  drsRecommendation?: ClusterDrsRecommendation[];
  hciConfig?: ClusterComputeResourceHCIConfigInfo;
  migrationHistory?: ClusterDrsMigration[];
  actionHistory?: ClusterActionHistory[];
  drsFault?: ClusterDrsFaults[];
  constructor(
    protected readonly connection: Connection,
    init?: Partial<ClusterComputeResource>
  ) {
    super(connection, init);
    Object.assign(this, init);
  }
  async AbandonHciWorkflow(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "AbandonHciWorkflow", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async addHost(args: {
  spec: HostConnectSpec;
    asConnected: boolean;
    resourcePool?: ResourcePool;
    license?: string
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: HostConnectSpec;
    asConnected: boolean;
    resourcePool?: ResourcePool;
    license?: string
} & { _this: ObjectReference }, Task>(
      "AddHost_Task", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async applyRecommendation(args: {
  key: string
}): Promise<void> {
    const result = await this.connection.exec<{
  key: string
} & { _this: ObjectReference }, void>(
      "ApplyRecommendation", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async cancelRecommendation(args: {
  key: string
}): Promise<void> {
    const result = await this.connection.exec<{
  key: string
} & { _this: ObjectReference }, void>(
      "CancelRecommendation", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async enterMaintenanceMode(args: {
  host: HostSystem[];
    option?: OptionValue[]
}): Promise<ClusterEnterMaintenanceResult> {
    const result = await this.connection.exec<{
  host: HostSystem[];
    option?: OptionValue[]
} & { _this: ObjectReference }, ClusterEnterMaintenanceResult>(
      "ClusterEnterMaintenanceMode", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { recommendations: undefined,
        fault: undefined });
  }
  async configureHCI(args: {
  clusterSpec: ClusterComputeResourceHCIConfigSpec;
    hostInputs?: ClusterComputeResourceHostConfigurationInput[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  clusterSpec: ClusterComputeResourceHCIConfigSpec;
    hostInputs?: ClusterComputeResourceHostConfigurationInput[]
} & { _this: ObjectReference }, Task>(
      "ConfigureHCI_Task", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async evcManager(): Promise<ClusterEVCManager | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ClusterEVCManager | undefined>(
      "EvcManager", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value },  }
    ).then(r => r.result);
    return new ClusterEVCManager(this.connection, result);
  }
  async extendHCI(args: {
  hostInputs?: ClusterComputeResourceHostConfigurationInput[];
    vSanConfigSpec?: SDDCBase
}): Promise<Task> {
    const result = await this.connection.exec<{
  hostInputs?: ClusterComputeResourceHostConfigurationInput[];
    vSanConfigSpec?: SDDCBase
} & { _this: ObjectReference }, Task>(
      "ExtendHCI_Task", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async findRulesForVm(args: {
  vm: VirtualMachine
}): Promise<ClusterRuleInfo[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine
} & { _this: ObjectReference }, ClusterRuleInfo[] | undefined>(
      "FindRulesForVm", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async getResourceUsage(): Promise<ClusterResourceUsageSummary> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ClusterResourceUsageSummary>(
      "GetResourceUsage", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { cpuUsedMHz: undefined,
        cpuCapacityMHz: undefined,
        memUsedMB: undefined,
        memCapacityMB: undefined,
        pMemAvailableMB: undefined,
        pMemCapacityMB: undefined,
        storageUsedMB: undefined,
        storageCapacityMB: undefined });
  }
  async moveHostInto(args: {
  host: HostSystem;
    resourcePool?: ResourcePool
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem;
    resourcePool?: ResourcePool
} & { _this: ObjectReference }, Task>(
      "MoveHostInto_Task", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async moveInto(args: {
  host: HostSystem[]
}): Promise<Task> {
    const result = await this.connection.exec<{
  host: HostSystem[]
} & { _this: ObjectReference }, Task>(
      "MoveInto_Task", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async placeVm(args: {
  placementSpec: PlacementSpec
}): Promise<PlacementResult> {
    const result = await this.connection.exec<{
  placementSpec: PlacementSpec
} & { _this: ObjectReference }, PlacementResult>(
      "PlaceVm", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { recommendations: undefined,
        drsFault: undefined });
  }
  async recommendHostsForVm(args: {
  vm: VirtualMachine;
    pool?: ResourcePool
}): Promise<ClusterHostRecommendation[] | undefined> {
    const result = await this.connection.exec<{
  vm: VirtualMachine;
    pool?: ResourcePool
} & { _this: ObjectReference }, ClusterHostRecommendation[] | undefined>(
      "RecommendHostsForVm", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async reconfigure(args: {
  spec: ClusterConfigSpec;
    modify: boolean
}): Promise<Task> {
    const result = await this.connection.exec<{
  spec: ClusterConfigSpec;
    modify: boolean
} & { _this: ObjectReference }, Task>(
      "ReconfigureCluster_Task", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async refreshRecommendation(): Promise<void> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, void>(
      "RefreshRecommendation", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value },  }
    ).then(r => r.result);
    return result;
  }
  async retrieveDasAdvancedRuntimeInfo(): Promise<ClusterDasAdvancedRuntimeInfo | undefined> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, ClusterDasAdvancedRuntimeInfo | undefined>(
      "RetrieveDasAdvancedRuntimeInfo", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value },  }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, {}, { dasHostInfo: undefined,
        vmcpSupported: undefined,
        heartbeatDatastoreInfo: undefined });
  }
  async setCryptoMode(args: {
  cryptoMode: string
}): Promise<void> {
    const result = await this.connection.exec<{
  cryptoMode: string
} & { _this: ObjectReference }, void>(
      "SetCryptoMode", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  }
  async stampAllRulesWithUuid(): Promise<Task> {
    const result = await this.connection.exec<unknown & { _this: ObjectReference }, Task>(
      "StampAllRulesWithUuid_Task", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value },  }
    ).then(r => r.result);
    return new Task(this.connection, result);
  }
  async validateHCIConfiguration(args: {
  hciConfigSpec?: ClusterComputeResourceHCIConfigSpec;
    hosts?: HostSystem[]
}): Promise<ClusterComputeResourceValidationResultBase[] | undefined> {
    const result = await this.connection.exec<{
  hciConfigSpec?: ClusterComputeResourceHCIConfigSpec;
    hosts?: HostSystem[]
} & { _this: ObjectReference }, ClusterComputeResourceValidationResultBase[] | undefined>(
      "ValidateHCIConfiguration", { _this: { attributes: { type: "ClusterComputeResource" }, $value: this.$value }, ...args }
    ).then(r => r.result);
    return result;
  };
}

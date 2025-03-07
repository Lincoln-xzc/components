## 组件定义

明示任务流程和当前完成程度，引导用户按照步骤完成任务。

## 使用场景

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。  
任务不能低于两步。另外，也应尽量将步骤流程简化，建议不多于7步，过多的步骤或过于复杂的流程会降低用户使用的耐心。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 步骤指示 | 告诉用户总步骤数和当前步骤，以及步骤状态。 |
| 步骤标题 | 对步骤任务简明的摘要。 |
| 步骤描述（可选） | 由于一般步骤标题均可为用户提供足够的信息来完成他们的任务，所以通常不使用步骤描述。但是，如果需要额外的描述说明，则可使用步骤描述。例如对于一些审批页面，步骤描述中可补充审批人信息。 |

## 组件类型

### 按场景分

| 名称 | 说明  |
| --- | ---  |
| 普通分步操作类 | 普通分步操作类，用在完整表单页面中，按钮通常为“上一步”、“下一步”/“完成”和“取消”。 |
| 多角色流程流转类 | 多角色流程流转类的表单中，部分步骤由本人填写，部分步骤由其他人处理或审核。按钮通常为“申请”、“撤回申请”、“通过”、“驳回”等明确清晰的指示文案，以代表用户完成该步骤时所采取的操作。 |

### 按样式分类

| 名称 | 说明  |
| --- | ---  |
| 横向步骤条 | 默认使用横向步骤条。在页面中步骤标题放在步骤指示的右边，在弹窗中步骤标题放在步骤指示的下面。 |
| 纵向步骤条 | 仅当步骤个数较多，横向摆放不下，或步骤数目动态变化时使用。另外，页面中步骤条的信息层级应最高，“下一步”等按钮应在内容区正下方。 |

## 组件状态

### 步骤指示

步骤指示具有四种状态：已完成、正在进行、待完成和错误状态。

当一个步骤处于活动状态时，其标题部分将突出显示，其输入部分将可见以供用户交互。

当用户完成步骤时，这些步骤会在左侧用✓号标记。

错误状态一般在场景为【多角色流程流转类】的步骤条中，例如中间流程审批人审批不通过时；但【普通分步操作类】的步骤条，一般不使用错误状态，当

点击“下一步”时就对当前页进行校验，而非最终点击完成时进行校验。

### 步骤标题

对于可跳过/可选的步骤，请在步骤标题中标记『（选填）』（若空间摆放不下，也可标记在步骤描述中）。
